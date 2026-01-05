import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface Resource {
    _id: string;
    title: string;
    description: string;
    url: string;
    type: string;
    skills: string[];
    difficulty: string;
    userId: { username: string; avatar?: string };
    likes: string[];
    createdAt: string;
}

const Resources: React.FC = () => {
    const navigate = useNavigate();
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        skill: '',
        type: '',
        difficulty: '',
        search: '',
    });

    useEffect(() => {
        fetchResources();
    }, [filters]);

    const fetchResources = async () => {
        try {
            const params = new URLSearchParams();
            if (filters.skill) params.append('skill', filters.skill);
            if (filters.type) params.append('type', filters.type);
            if (filters.difficulty) params.append('difficulty', filters.difficulty);
            if (filters.search) params.append('search', filters.search);

            const response = await axios.get(`${API_URL}/api/resources?${params.toString()}`);
            setResources(response.data.resources);
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-yellow-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-black mb-4">Explore Resources 🔍</h1>
                    <p className="text-xl text-blue-100">Discover learning materials shared by our community</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="🔍 Search resources..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        />
                        <select
                            value={filters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">All Types</option>
                            <option value="video">Videos</option>
                            <option value="article">Articles</option>
                            <option value="book">Books</option>
                            <option value="course">Courses</option>
                            <option value="podcast">Podcasts</option>
                            <option value="tool">Tools</option>
                            <option value="documentation">Documentation</option>
                        </select>
                        <select
                            value={filters.difficulty}
                            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">All Levels</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        <button
                            onClick={() => setFilters({ skill: '', type: '', difficulty: '', search: '' })}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Resources Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">⏳</div>
                        <p className="text-xl text-gray-600">Loading resources...</p>
                    </div>
                ) : resources.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                        <div className="text-6xl mb-4">📚</div>
                        <p className="text-xl text-gray-600 mb-4">No resources found</p>
                        <button
                            onClick={() => navigate('/add-resource')}
                            className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            ➕ Add First Resource
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((resource) => (
                            <div
                                key={resource._id}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                        📖
                                        {resource.type === 'video' && '🎥'}
                                        {resource.type === 'article' && '📰'}
                                        {resource.type === 'book' && '📚'}
                                        {resource.type === 'course' && '🎓'}
                                        {resource.type === 'podcast' && '🎙️'}
                                        {resource.type === 'tool' && '🔧'}
                                        {resource.type === 'documentation' && '📖'}
                                        {resource.type === 'other' && '📄'}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                            {resource.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4 line-clamp-3">{resource.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {resource.skills.slice(0, 3).map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        {resource.difficulty}
                                    </span>
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-colors"
                                    >
                                        View Resource →
                                    </a>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                                    <span>By {resource.userId.username}</span>
                                    <span>❤️ {resource.likes.length}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Resources;
