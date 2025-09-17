import { Post } from "@prisma/client";
import { prisma } from "../../config/db";
import { totalmem } from "os";

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
  const result = await prisma.$transaction(async (tx) => {
    const data = await tx.post.findUnique({
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

    await tx.post.update({
      where: {
        id: Number(id),
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return data;
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

const getState = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregates = await tx.post.aggregate({
      _count: true,
      _sum: { views: true },
      _avg: { views: true },
      _min: { views: true },
      _max: { views: true },
    });

    const featuredCount = await tx.post.count({
      where: {
        isFeatured: true,
      },
    });

    const topFeatured = await tx.post.findFirst({
      where: { isFeatured: true },
      orderBy: { views: "desc" },
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastWeekPostCount = await prisma.post.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    });

    return {
      states: {
        totalPosts: aggregates._count,
        totalViews: aggregates._sum.views,
        avgViews: aggregates._avg.views,
        minViews: aggregates._min.views,
        maxViews: aggregates._max.views,
        lastWeekPostCount,
        featuredPost: {
          featuredCount,
          topFeatured,
        },
      },
    };
  });
};

export const PostServices = {
  createPost,
  getPosts,
  getSinglePost,
  deletePost,
  updatePost,
  getState,
};
