import { Post } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async(payload: Post) => {
    return prisma.post.create({
        data: payload
    })
}

export const PostServices = {
    createPost
}