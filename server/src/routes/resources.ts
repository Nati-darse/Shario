import { Router, Request, Response } from 'express';
import { Resource } from '../models/Resource';
import { authMiddleware } from '../middleware/auth';
import { categorizeResource } from '../utils/aiCategorization';

const router = Router();

// Get all resources (public)
router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      skill,
      type,
      difficulty,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    // Build query
    const query: any = { status: 'published' };

    if (skill) query.skills = skill;
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$text = { $search: search as string };
    }

    const resources = await Resource.find(query)
      .populate('userId', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Resource.countDocuments(query);

    res.json({
      resources,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single resource
router.get('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('userId', 'username avatar bio');

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json({ resource });
  } catch (error) {
    console.error('Get resource error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create resource (protected)
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      title,
      description,
      url,
      type,
      skills,
      difficulty,
      duration,
      tags,
    } = req.body;

    if (!title || !description || !url || !type || !skills || skills.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // AI Categorization if tags or skills are sparse (or just always for enrichment)
    let aiTags: string[] = [];
    let aiCategory: string[] = [];

    try {
      const aiResult = await categorizeResource(title, description);
      aiTags = aiResult.tags;
      aiCategory = [aiResult.category];
    } catch (aiError) {
      console.error('AI Categorization failed:', aiError);
    }

    const resource = new Resource({
      title,
      description,
      url,
      type,
      skills: Array.from(new Set([...skills, ...aiCategory])),
      difficulty: difficulty || 'beginner',
      duration,
      tags: Array.from(new Set([...(tags || []), ...aiTags])),
      userId: (req as any).user.userId,
      status: 'published',
      aiGenerated: true
    });

    await resource.save();

    res.status(201).json({
      message: 'Resource created successfully',
      resource,
    });
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update resource (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Check ownership
    if (resource.userId.toString() !== (req as any).user.userId) {
      return res.status(403).json({ error: 'Not authorized to update this resource' });
    }

    const updates = req.body;
    Object.assign(resource, updates);
    await resource.save();

    res.json({
      message: 'Resource updated successfully',
      resource,
    });
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete resource (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Check ownership
    if (resource.userId.toString() !== (req as any).user.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this resource' });
    }

    await resource.deleteOne();

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Like/Unlike resource (protected)
router.post('/:id/like', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    const userId = (req as any).user.userId;
    const likeIndex = resource.likes.findIndex((id) => id.toString() === userId);

    if (likeIndex > -1) {
      // Unlike
      resource.likes.splice(likeIndex, 1);
    } else {
      // Like
      resource.likes.push(userId as any);
    }

    await resource.save();

    res.json({
      message: likeIndex > -1 ? 'Resource unliked' : 'Resource liked',
      likes: resource.likes.length,
    });
  } catch (error) {
    console.error('Like resource error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
