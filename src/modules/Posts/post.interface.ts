import { Types } from "mongoose";

type Categorys =
    | 'Adventure'
    | 'Business Travel'
    | 'Exploration'
    | 'Cultural Experiences'
    | 'Food & Culinary Travel'
    | 'Nature & Wildlife'
    | 'Road Trips'
    | 'Family Travel'
    | 'Solo Travel'
    | 'Luxury Travel'
    | 'Travel Tips & Hacks'
    | 'Backpacking'
    | 'City Guides'
    | 'Eco-Tourism'
    | 'Historical Sites'
    | 'Photography'
    | 'Festivals & Events'
    | 'Adventure Sports'
    | 'Wellness Retreats'
    | 'Honeymoon Destinations'
    | 'Volunteer Travel'
    | 'Travel Gear & Reviews'
    | 'Budget Travel';

export interface TPost {
    title: string;
    content: string;
    markdownContent?: string;
    images: string[];
    category: Categorys;
    isPremium: boolean;
    user: Types.ObjectId;
    tags?: string[];
    status?: 'published' | 'draft' | 'deleted';
}
