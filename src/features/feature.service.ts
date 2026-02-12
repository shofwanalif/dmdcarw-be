import { ServiceFeatureCreateInput } from "../../prisma/client/models.js";
import { prisma } from "../prisma.js";

export const featureService = {
  async createFeature(data: ServiceFeatureCreateInput) {
    const { name } = data;
    const feature = await prisma.serviceFeature.create({
      data: {
        name,
      },
    });

    return feature;
  },

  async createFeatureBulk(names: string[]) {
    // Validate that names is an array and not empty
    if (!Array.isArray(names) || names.length === 0) {
      throw new Error("Names must be a non-empty array");
    }

    // Filter out empty strings and trim whitespace
    const validNames = names
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (validNames.length === 0) {
      throw new Error("No valid feature names provided");
    }

    // Create multiple features in a single transaction
    const features = await prisma.$transaction(
      validNames.map((name) =>
        prisma.serviceFeature.create({
          data: { name },
        }),
      ),
    );

    return features;
  },

  async getAll() {
    const features = await prisma.serviceFeature.findMany({
      orderBy: { createdAt: "desc" },
    });

    return features;
  },

  async getById(id: number) {
    const feature = await prisma.serviceFeature.findUnique({
      where: { id },
    });

    if (!feature) {
      throw new Error("Feature not found");
    }

    return feature;
  },

  async updateFeature(id: number, data: ServiceFeatureCreateInput) {
    const feature = await prisma.serviceFeature.update({
      where: { id },
      data,
    });

    return feature;
  },

  async deleteFeature(id: number) {
    const feature = await prisma.serviceFeature.delete({
      where: { id },
    });

    return feature;
  },
};
