import { Booking } from "../../prisma/client/client.js";
import { BookingUncheckedUpdateInput } from "../../prisma/client/models.js";
import { prisma } from "../prisma.js";

type BookingCreateInput = {
  dateSlotId: number;
  userId: string;
  customerName: string;
  phone: string;
  vehicleNumber: string;
  paymentMethod: "ON_SITE";
};

export const bookingService = {
  async createBooking(data: BookingCreateInput) {
    const {
      dateSlotId,
      userId,
      customerName,
      phone,
      vehicleNumber,
      paymentMethod,
    } = data;

    // Use transaction to ensure capacity check and creation are atomic
    const booking = await prisma.$transaction(async (tx) => {
      // 1. Fetch DateSlot with current bookings count (FOR UPDATE to lock row if needed,
      // but Prisma doesn't support SELECT FOR UPDATE directly easily without raw query.
      // For now, transaction isolation is usually enough for moderate concurrency,
      // or we can rely on application-level check within transaction)

      const dateSlot = await tx.dateSlot.findUnique({
        where: { id: dateSlotId },
        include: {
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
      });

      if (!dateSlot) {
        throw new Error("Date slot not found");
      }

      // 2. Check Capacity
      const currentBookings = dateSlot._count.bookings;
      if (currentBookings >= dateSlot.maxCapacity) {
        throw new Error("Slot is full");
      }

      // 3. Check if user already has an active booking for this dateSlot
      const existingBooking = await tx.booking.findFirst({
        where: {
          userId,
          dateSlotId,
          status: {
            in: ["PENDING"],
          },
        },
      });

      if (existingBooking) {
        throw new Error("Anda sudah memiliki booking aktif di slot ini");
      }

      // 4. Generate Booking Code (simple timestamp + random based)
      const dateStr = dateSlot.date
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");
      const randomStr = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
      const bookingCode = `BOOK-${dateStr}-${randomStr}`;

      // 5. Create Booking
      const newBooking = await tx.booking.create({
        data: {
          bookingCode,
          userId,
          dateSlotId,
          customerName,
          phone,
          vehicleNumber,
          paymentMethod,
          status: "PENDING", // Default status
        },
        include: {
          dateSlot: {
            include: {
              service: true,
              timeSlot: true,
            },
          },
        },
      });

      return newBooking;
    });

    return booking;
  },

  async getAllBookings() {
    return prisma.booking.findMany({
      include: {
        dateSlot: {
          include: {
            service: true,
            timeSlot: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getBookingsByUser(userId: string) {
    return prisma.booking.findMany({
      where: { userId },
      include: {
        dateSlot: {
          include: {
            service: true,
            timeSlot: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getBookingByCode(bookingCode: string) {
    const booking = await prisma.booking.findUnique({
      where: { bookingCode },
      include: {
        dateSlot: {
          include: {
            service: true,
            timeSlot: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!booking) throw new Error("Booking not found");
    return booking;
  },

  async updateBooking(id: number, data: Partial<BookingUncheckedUpdateInput>) {
    const booking = await prisma.booking.update({
      where: { id },
      data,
    });
    return booking;
  },

  async deleteBooking(id: number) {
    const booking = await prisma.booking.delete({
      where: { id },
    });
    return booking;
  },
};
