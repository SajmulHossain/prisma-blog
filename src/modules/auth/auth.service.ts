import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw Error("User not exist");
  }

  if (password !== user.password) {
    throw Error("Password didn't matched");
  }

  return user;
};

const loginWithGoogle = async (data: Prisma.UserCreateInput) => {
  let user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data,
    });
  }

  return user;
};

export const AuthServices = {
  login,
  loginWithGoogle
};
