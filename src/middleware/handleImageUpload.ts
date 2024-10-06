// import { NextFunction, Request, Response } from "express";

// export const handleImageUpload = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         if (req.file) {
//             const imageUrl = await uploadToCloudinary(req.file); // Replace with actual upload logic
//             req.body.images = [imageUrl];  // Store the image URL in req.body.images array
//         } else {
//             req.body.images = [];  // Default to an empty array if no file is uploaded
//         }
//         next();  // Proceed to validation and controller
//     } catch (error) {
//         return res.status(500).json({ error: "Image upload failed" });
//     }
// };
