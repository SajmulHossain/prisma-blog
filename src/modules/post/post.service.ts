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

const deletePost = async (id: string) => {
  return await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
};

const updatePost = async (id: string, data: Post) => {
  const result = await prisma.post.updateManyAndReturn({
    where: {
      id: Number(id),
    },
    data,
  });
};

export const PostServices = {
  createPost,
  getPosts,
  deletePost,
  updatePost
};
