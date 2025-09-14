import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  return createdUser;
};

const getUsers = async () => {
  const result = await prisma.user.findMany({
    // select: {
    //     id: true,
    //     name: true,
    //     phone: true,
    //     picture: true
    // }
    omit: {
      password: true,
    },
    include: { posts: true },
  });
  return result;
};

const getSingleUser = async (id: string) => {
  const user = await prisma.user.findFirstOrThrow({
    omit: {
      password: true,
    },
    where: {
      id: Number(id),
    },
  });
  return user;
};

export const UserServices = {
  createUser,
  getUsers,
  getSingleUser,
};
