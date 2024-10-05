import { Router } from "express";
import { ValidationRequest } from "../../middleware/ValidationRequest";
import { PostValidationSchema } from "./post.validation";
import { PostController } from "./post.controller";
import auth from "../../middleware/auth";

const router = Router();

// Create a single post (User only)
router.post(
    "/",
    auth("USER"),
    ValidationRequest(PostValidationSchema.createPostValidationSchema),
    PostController.createSinglePost
);

// Get all posts
router.get("/", PostController.getAllPosts);

// Get a single post by ID
router.get("/:id", PostController.getSinglePostById);

// Update a post (Admin only)
router.put(
    "/:id",
    auth("ADMIN"),
    ValidationRequest(PostValidationSchema.updatePostValidationSchema),
    PostController.updatePost
);

// Delete a post (Admin only)
router.delete(
    "/:id",
    auth("ADMIN"),
    PostController.deletePost
);

export const postRouter = router;