import mongoose, { Document, Schema } from 'mongoose';

export type ResourceType = 'video' | 'article' | 'book' | 'course' | 'podcast' | 'tool' | 'documentation' | 'other';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface IResource extends Document {
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  category: string[];
  skills: string[];
  difficulty: DifficultyLevel;
  duration?: number; // in minutes
  userId: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  rating: number;
  reviewCount: number;
  aiGenerated: boolean;
  tags: string[];
  thumbnail?: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['video', 'article', 'book', 'course', 'podcast', 'tool', 'documentation', 'other'],
      required: true,
    },
    category: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    duration: {
      type: Number,
      min: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ResourceSchema.index({ title: 'text', description: 'text' }); // Full-text search
ResourceSchema.index({ skills: 1 });
ResourceSchema.index({ category: 1 });
ResourceSchema.index({ type: 1 });
ResourceSchema.index({ difficulty: 1 });
ResourceSchema.index({ rating: -1 });
ResourceSchema.index({ createdAt: -1 });
ResourceSchema.index({ userId: 1 });

export const Resource = mongoose.model<IResource>('Resource', ResourceSchema);
