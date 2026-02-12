import { TimeSlotCreateInput } from "../../prisma/client/models.js";
import { prisma } from "../prisma.js";

export const slotService = {
  async createSlot(data: TimeSlotCreateInput) {
    const { time } = data;

    const slot = await prisma.timeSlot.create({
      data: {
        time,
      },
    });

    return slot;
  },

  async createManySlots(times: string[]) {
    // Transform array of strings into array of objects with time property
    const data = times.map((time) => ({ time }));

    const slots = await prisma.timeSlot.createMany({
      data,
    });

    return slots;
  },

  async getAllSlots() {
    const slots = await prisma.timeSlot.findMany({
      orderBy: { createdAt: "asc" },
    });

    return slots;
  },

  async getSlotById(id: number) {
    const slot = await prisma.timeSlot.findUnique({
      where: { id },
    });

    if (!slot) {
      throw new Error("Slot not found");
    }

    return slot;
  },

  async updateSlot(id: number, data: TimeSlotCreateInput) {
    const slot = await prisma.timeSlot.update({
      where: { id },
      data,
    });

    return slot;
  },

  async deleteSlot(id: number) {
    const slot = await prisma.timeSlot.delete({
      where: { id },
    });

    return slot;
  },
};
