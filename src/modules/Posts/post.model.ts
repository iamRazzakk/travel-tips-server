import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const PostSchema = new Schema<TPost>({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    images: {
        type: [String],
        required: [true, 'At least one image is required'],
    },
    category: {
        type: String,
        enum: [
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
        ],
        required: [true, 'Category is required'],
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})
export const postModel = model<TPost>('posts', PostSchema);