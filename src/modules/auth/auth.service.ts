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

  console.log(user);

  if (!user) {
    throw Error("User not exist");
  }

  if (password !== user.password) {
    throw Error("Password didn't matched");
  }

  return user;
};

export const AuthServices = {
  login,
};
