export type ResourceType = 
  | 'video' 
  | 'article' 
  | 'book' 
  | 'course' 
  | 'podcast' 
  | 'tool' 
  | 'other';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Resource {
  _id: string;
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  category: string[];
  skills: string[];
  difficulty: Difficulty;
  duration?: number;
  userId: string;
  likes: string[];
  rating: number;
  reviewCount: number;
  aiProcessed: boolean;
  metadata: {
    thumbnail?: string;
    author?: string;
    source?: string;
    publishedDate?: Date;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateResourceDto {
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  category?: string[];
  skills?: string[];
}