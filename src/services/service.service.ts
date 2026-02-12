import { prisma } from "../prisma.js";

export const serviceService = {
  async createService(data: any) {
    const { name, price, duration, serviceCategoryId, features } = data;

    const service = await prisma.service.create({
      data: {
        name,
        price,
        duration,
        serviceCategoryId,
        featureMaps: {
          createMany: {
            data: features.map((featureId: number) => ({
              featureId,
            })),
          },
        },
      },
    });

    return service;
  },

  async updateService(id: number, data: any) {
    const { name, price, duration, serviceCategoryId, features } = data;

    // Use transaction to ensure atomicity
    const service = await prisma.$transaction(async (tx) => {
      // If features are provided, update feature maps
      if (features && Array.isArray(features)) {
        // Delete existing feature maps
        await tx.serviceFeatureMap.deleteMany({
          where: {
            serviceId: id,
          },
        });

        // Create new feature maps
        if (features.length > 0) {
          await tx.serviceFeatureMap.createMany({
            data: features.map((featureId: number) => ({
              serviceId: id,
              featureId,
            })),
          });
        }
      }

      // Update service basic info
      const updatedService = await tx.service.update({
        where: {
          id,
        },
        data: {
          name,
          price,
          duration,
          serviceCategoryId,
        },
        include: {
          featureMaps: {
            include: {
              feature: true,
            },
          },
        },
      });

      return updatedService;
    });

    return service;
  },

  async getDetailService(id: number) {
    const service = await prisma.service.findUnique({
      where: {
        id,
      },
      include: {
        dateSlots: {
          include: {
            timeSlot: true,
            _count: true,
          },
        },
      },
    });

    return service;
  },

  async getAllServices() {
    const services = await prisma.service.findMany({
      include: {
        featureMaps: {
          include: {
            feature: true,
          },
        },
      },
    });

    return services;
  },

  async deleteService(id: number) {
    const service = await prisma.service.delete({
      where: {
        id,
      },
    });

    return service;
  },
};
