import { Router } from "express";
import { ValidationRequest } from "../../middleware/ValidationRequest";
import { PostValidationSchema } from "./post.validation";
import { PostController } from "./post.controller";
import auth from "../../middleware/auth";
import { multipleMulterUpload } from "../../config/multer.config.multiple";

const router = Router();

// Create a single post (User only)
router.post(
    "/",
    auth("USER"),
    multipleMulterUpload,
    // ValidationRequest(PostValidationSchema.createPostValidationSchema),
    PostController.createSinglePost
);

// Get all posts
router.get("/", PostController.getAllPosts);

// Get a single post by ID
router.get("/:id", PostController.getSinglePostById);

// Update a post (user only)
router.put(
    "/:id",
    auth("USER"),
    ValidationRequest(PostValidationSchema.updatePostValidationSchema),
    PostController.updatePost
);

// Delete a post (user only)
router.delete(
    "/:id",
    auth("USER"),
    PostController.deletePost
);

export const postRouter = router;