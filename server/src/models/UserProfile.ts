import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile extends Document {
  userId: string; // References Better Auth's user id
  bio?: string;
  skillsToLearn: string[];
  skillsToShare: string[];
  followers: string[]; // User IDs of followers
  following: string[]; // User IDs being followed
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    bio: {
      type: String,
      maxlength: 500,
      default: '',
    },
    skillsToLearn: {
      type: [String],
      default: [],
      validate: [
        (val: string[]) => val.length <= 10,
        '{PATH} exceeds the limit of 10'
      ]
    },
    skillsToShare: {
      type: [String],
      default: [],
      validate: [
        (val: string[]) => val.length <= 10,
        '{PATH} exceeds the limit of 10'
      ]
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
UserProfileSchema.index({ skillsToLearn: 1 });
UserProfileSchema.index({ skillsToShare: 1 });

export const UserProfile = mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
