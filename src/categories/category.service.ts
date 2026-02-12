import { ServiceCategoryCreateInput } from "../../prisma/client/models.js";
import { prisma } from "../prisma.js";

export const categoryService = {
  async createCategory(data: ServiceCategoryCreateInput) {
    const { name } = data;

    const result = await prisma.serviceCategory.create({
      data: {
        name,
      },
    });

    return result;
  },

  async getAll() {
    const result = await prisma.serviceCategory.findMany({
      orderBy: { createdAt: "desc" },
    });

    return result;
  },

  async getById(id: number) {
    const result = await prisma.serviceCategory.findUnique({
      where: { id },
    });

    if (!result) {
      throw new Error("Category not found");
    }

    return result;
  },

  async updateCategory(id: number, data: ServiceCategoryCreateInput) {
    const result = await prisma.serviceCategory.update({
      where: { id },
      data,
    });

    return result;
  },

  async deleteCategory(id: number) {
    const result = await prisma.serviceCategory.delete({
      where: { id },
    });

    return result;
  },
};
