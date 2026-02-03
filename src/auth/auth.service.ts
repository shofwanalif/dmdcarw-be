import { fromNodeHeaders } from "better-auth/node";
import { prisma } from "../prisma.js";
import { auth } from "./auth.js";

export const authService = {
  async signUp(data: any) {
    const { name, email, password, role } = data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    if (role === "admin") {
      await prisma.user.update({
        where: { id: result.user.id },
        data: {
          role: "admin",
        },
      });
    }

    return result;
  },

  //   async signIn(email: string, password: string) {
  //     const result = await auth.api.signInEmail({
  //       body: {
  //         email,
  //         password,
  //       },
  //     });

  //     return result;
  //   },

  //   async signOut(headers: any) {
  //     await auth.api.signOut({
  //       headers,
  //     });
  //   },

  //   async getCurrentUser(headers: any) {
  //     const session = await auth.api.getSession({
  //       headers: fromNodeHeaders(headers),
  //     });

  //     if (!session) throw new Error("Unauthorized");

  //     return session.user;
  //   },

  async updateRole(userId: string, role: string, requestingUserId: string) {
    const requestingUser = await prisma.user.findUnique({
      where: { id: requestingUserId },
    });

    if (requestingUser?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return updatedUser;
  },

  async getAllUsers(requestingUserId: string) {
    const requestingUser = await prisma.user.findUnique({
      where: { id: requestingUserId },
    });

    if (requestingUser?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return users;
  },
};
