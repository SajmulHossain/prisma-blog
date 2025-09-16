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

const getPosts = async ({
  page,
  limit,
  search,
  isFeatured,
  tags,
}: {
  page: number;
  limit: number;
  search: string;
  isFeatured?: boolean;
  tags?: string[];
}) => {
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      tags?.length && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };

  const result = await prisma.post.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where,
    orderBy: {
      createdAt: "asc",
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  });

  const total = await prisma.post.count({ where });

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};

const getSinglePost = async (id: string) => {
  const result = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
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

  return result;
};

export const PostServices = {
  createPost,
  getPosts,
  getSinglePost,
  deletePost,
  updatePost,
};
