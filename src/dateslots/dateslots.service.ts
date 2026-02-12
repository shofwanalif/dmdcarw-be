import { DateSlotUncheckedUpdateInput } from "../../prisma/client/models.js";
import { prisma } from "../prisma.js";

const MAX_CAPACITY = 2; // Fixed capacity for all date slots

export const dateSlotsService = {
  /**
   * Generate date slots for a single day
   * @param date - Date in YYYY-MM-DD format
   * @param serviceIds - Array of service IDs to generate slots for
   * @returns Object with count and created slots
   */
  async generateSingleDay(date: string, serviceIds: number[]) {
    // Validate inputs
    if (!date) {
      throw new Error("Date is required");
    }

    if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length === 0) {
      throw new Error("Service IDs must be a non-empty array");
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }

    // Parse and validate date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date value");
    }

    // Fetch all time slots
    const timeSlots = await prisma.timeSlot.findMany({
      orderBy: { time: "asc" },
    });

    if (timeSlots.length === 0) {
      throw new Error("No time slots found. Please create time slots first");
    }

    // Verify that all services exist
    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true },
    });

    if (services.length !== serviceIds.length) {
      const foundIds = services.map((s) => s.id);
      const missingIds = serviceIds.filter((id) => !foundIds.includes(id));
      throw new Error(`Services not found: ${missingIds.join(", ")}`);
    }

    // Generate date slots data
    const dateSlotsData = [];
    for (const timeSlot of timeSlots) {
      for (const serviceId of serviceIds) {
        dateSlotsData.push({
          date: parsedDate,
          timeSlotId: timeSlot.id,
          serviceId: serviceId,
          maxCapacity: MAX_CAPACITY,
        });
      }
    }

    // Create date slots with skipDuplicates
    const result = await prisma.dateSlot.createMany({
      data: dateSlotsData,
      skipDuplicates: true,
    });

    return {
      date,
      count: result.count,
      totalAttempted: dateSlotsData.length,
      skipped: dateSlotsData.length - result.count,
      timeSlotsCount: timeSlots.length,
      servicesCount: serviceIds.length,
    };
  },

  /**
   * Generate date slots for a date range
   * @param startDate - Start date in YYYY-MM-DD format
   * @param endDate - End date in YYYY-MM-DD format
   * @param serviceIds - Array of service IDs to generate slots for
   * @returns Object with aggregated results
   */
  async generateDateRange(
    startDate: string,
    endDate: string,
    serviceIds: number[],
  ) {
    // Validate inputs
    if (!startDate || !endDate) {
      throw new Error("Start date and end date are required");
    }

    if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length === 0) {
      throw new Error("Service IDs must be a non-empty array");
    }

    // Validate date formats
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }

    // Parse dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date value");
    }

    // Validate date range
    if (start > end) {
      throw new Error("Start date must be before or equal to end date");
    }

    // Generate array of dates
    const dates: string[] = [];
    const current = new Date(start);
    while (current <= end) {
      dates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    // Generate slots for each date
    const results = [];
    let totalCreated = 0;
    let totalSkipped = 0;
    let totalAttempted = 0;

    for (const date of dates) {
      try {
        const result = await this.generateSingleDay(date, serviceIds);
        results.push({
          success: true,
          ...result,
        });
        totalCreated += result.count;
        totalSkipped += result.skipped;
        totalAttempted += result.totalAttempted;
      } catch (error) {
        const err = error as Error;
        results.push({
          date,
          success: false,
          error: err.message,
        });
      }
    }

    return {
      startDate,
      endDate,
      daysCount: dates.length,
      totalCreated,
      totalSkipped,
      totalAttempted,
      results,
    };
  },

  async getAllDateSlots() {
    const dateSlots = await prisma.dateSlot.findMany({
      include: {
        timeSlot: true,
        service: true,
        _count: {
          select: {
            bookings: {
              where: {
                status: {
                  in: ["PENDING", "CONFIRMED"],
                },
              },
            },
          },
        },
      },
      orderBy: [
        { date: "asc" },
        { timeSlot: { time: "asc" } },
        { service: { name: "asc" } },
      ],
    });

    return dateSlots;
  },

  /**
   * Get date slots for a specific date
   * @param date - Date in YYYY-MM-DD format
   * @returns Array of date slots with relations
   */
  async getDateSlotsByDate(date: string) {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date value");
    }

    const dateSlots = await prisma.dateSlot.findMany({
      where: {
        date: parsedDate,
      },
      include: {
        timeSlot: true,
        service: {
          include: {
            serviceCategory: true,
          },
        },
        _count: {
          select: {
            bookings: {
              where: {
                status: {
                  in: ["PENDING", "CONFIRMED"],
                },
              },
            },
          },
        },
      },
      orderBy: [{ timeSlot: { time: "asc" } }, { service: { name: "asc" } }],
    });

    return dateSlots;
  },

  /**
   * Get date slots for a date range
   * @param startDate - Start date in YYYY-MM-DD format
   * @param endDate - End date in YYYY-MM-DD format
   * @returns Array of date slots with relations
   */
  async getDateSlotsByDateRange(startDate: string, endDate: string) {
    // Validate date formats
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date value");
    }

    if (start > end) {
      throw new Error("Start date must be before or equal to end date");
    }

    const dateSlots = await prisma.dateSlot.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
      include: {
        timeSlot: true,
        service: true,
        _count: {
          select: {
            bookings: {
              where: {
                status: {
                  in: ["PENDING", "CONFIRMED"],
                },
              },
            },
          },
        },
      },
      orderBy: [
        { date: "asc" },
        { timeSlot: { time: "asc" } },
        { service: { name: "asc" } },
      ],
    });

    return dateSlots;
  },

  async updateDateSlot(
    id: number,
    data: Partial<DateSlotUncheckedUpdateInput>,
  ) {
    const dateSlot = await prisma.dateSlot.update({
      where: {
        id,
      },
      data,
    });

    return dateSlot;
  },

  async deleteDateSlot(id: number) {
    const dateSlot = await prisma.dateSlot.delete({
      where: {
        id,
      },
    });

    return dateSlot;
  },
};
