import { z } from 'zod';

const createPostValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
            invalid_type_error: 'Title must be a string',
        }),
        content: z.string({
            required_error: 'Content is required',
            invalid_type_error: 'Content must be a string',
        }),
        markdownContent: z.string().optional(),
        images: z.array(
            z.string().url({ message: 'Each image must be a valid URL' }).nonempty({ message: 'Image URL cannot be empty' })
        ).min(1, 'At least one image is required'),
        category: z.enum([
            'Adventure',
            'Business Travel',
            'Exploration',
            'Cultural Experiences',
            'Food & Culinary Travel',
            'Nature & Wildlife',
            'Road Trips',
            'Family Travel',
            'Solo Travel',
            'Luxury Travel',
            'Travel Tips & Hacks',
            'Backpacking',
            'City Guides',
            'Eco-Tourism',
            'Historical Sites',
            'Photography',
            'Festivals & Events',
            'Adventure Sports',
            'Wellness Retreats',
            'Honeymoon Destinations',
            'Volunteer Travel',
            'Travel Gear & Reviews',
            'Budget Travel',
        ], {
            required_error: 'Category is required',
            invalid_type_error: 'Category must be one of the predefined options',
        }),
        isPremium: z.boolean().optional().default(false),
        user: z.string().nonempty({ message: 'User ID is required' }),
    }),
});

// Update Post Validation Schema
const updatePostValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        images: z.array(z.string()).optional(),
        category: z.enum([
            'Adventure',
            'Business Travel',
            'Exploration',
            'Cultural Experiences',
            'Food & Culinary Travel',
            'Nature & Wildlife',
            'Road Trips',
            'Family Travel',
            'Solo Travel',
            'Luxury Travel',
            'Travel Tips & Hacks',
            'Backpacking',
            'City Guides',
            'Eco-Tourism',
            'Historical Sites',
            'Photography',
            'Festivals & Events',
            'Adventure Sports',
            'Wellness Retreats',
            'Honeymoon Destinations',
            'Volunteer Travel',
            'Travel Gear & Reviews',
            'Budget Travel',
        ]).optional(),
        isPremium: z.union([
            z.boolean(),
            z.string().transform(val => val === 'true')
        ]).optional().default(false),
        user: z.string().nonempty({ message: 'User ID is required' }).optional(),
    }).refine(data => {
        // Ensure at least one field is provided for the update
        return Object.keys(data).length > 0;
    }, {
        message: 'At least one field must be updated',
    }),
});
export const PostValidationSchema = {
    createPostValidationSchema,
    updatePostValidationSchema
}