import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PostServices } from "./post.service";

// Controller to create a single post
const createSinglePost = catchAsync(async (req: Request, res: Response) => {
    const result = req.body;
    const newPost = await PostServices.createPostIntoDB(result);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Post created successfully",
        data: newPost,
    });
});

// Controller to get all posts
const getAllPosts = catchAsync(async (req: Request, res: Response) => {
    const result = await PostServices.getAllPostsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Posts retrieved successfully",
        data: result,
    });
});

// Controller to get a single post by ID
const getSinglePostById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostServices.getPostFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post retrieved successfully",
        data: post,
    });
});

// Controller to update a post
const updatePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPost = await PostServices.updatePostInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
    });
});

// Controller to delete a post
const deletePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await PostServices.deletePostFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post deleted successfully",
        data: null
    });
});

export const PostController = {
    createSinglePost,
    getAllPosts,
    getSinglePostById,
    updatePost,
    deletePost,
};
