import mongoose, { Document, Schema } from 'mongoose';

export interface ICollection extends Document {
    title: string;
    description: string;
    userId: mongoose.Types.ObjectId;
    resources: mongoose.Types.ObjectId[];
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CollectionSchema = new Schema<ICollection>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            maxlength: 500,
            default: '',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        resources: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
            default: [],
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
CollectionSchema.index({ userId: 1 });
CollectionSchema.index({ isPublic: 1 });

export const Collection = mongoose.model<ICollection>('Collection', CollectionSchema);
