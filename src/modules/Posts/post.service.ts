import httpStatus from "http-status";

import { TPost } from "./post.interface";
import { postModel } from "./post.model";
import AppError from "../../Errors/AppError";

const createPostIntoDB = async (payload: TPost) => {
    const newPost = new postModel(payload);
    try {
        const savedPost = await newPost.save();
        return savedPost;
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error occurred while creating post";
        throw new AppError(httpStatus.BAD_REQUEST, message);
    }
};

const getAllPostsFromDB = async () => {
    const posts = await postModel.find().populate("user");
    if (posts.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, "No posts found");
    }
    return posts;
};

const getPostFromDB = async (postId: string) => {
    const post = await postModel.findById(postId).populate("user");
    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }
    return post;
};

const updatePostInDB = async (postId: string, payload: Partial<TPost>) => {
    const updatedPost = await postModel.findByIdAndUpdate(postId, payload, { new: true, runValidators: true });
    // console.log("Updated Post:", updatedPost);
    if (!updatedPost) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }
    return updatedPost;
};

const deletePostFromDB = async (postId: string) => {
    const deletedPost = await postModel.findByIdAndDelete(postId);
    if (!deletedPost) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }
    return deletedPost;
};

export const PostServices = {
    createPostIntoDB,
    getAllPostsFromDB,
    getPostFromDB,
    updatePostInDB,
    deletePostFromDB,
};