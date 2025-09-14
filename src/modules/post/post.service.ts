import { Post } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Post) => {
  return prisma.post.create({
    data: payload,
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  });
};

const getPosts = async () => {
  const result = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  });

  return result;
};

export const PostServices = {
  createPost,
  getPosts,
};
