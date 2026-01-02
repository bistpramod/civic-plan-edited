import { prisma } from "../../core/lib/prisma";

export const getAllUsers = () => 
    prisma.user.findMany()
