import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PostServices } from "./post.service";
import { TPost } from "./post.interface";

// Controller to create a single post
const createSinglePost = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.body);
    const { title, content, category, isPremium, tags, user } = req.body;
    const userData = req.user
    console.log(userData);
    const images = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];

    // console.log(req.body, "Body: ");
    // console.log(req.files, "Files: ");

    const newPostPayload: TPost = {
        title,
        content,
        images,
        category,
        isPremium: typeof isPremium === 'string' ? isPremium === 'true' : isPremium,
        user: user,
        tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : undefined,
        status: 'draft',
    };

    // Call the service to create the post
    const newPost = await PostServices.createPostIntoDB(newPostPayload);

    // Send the success response
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
