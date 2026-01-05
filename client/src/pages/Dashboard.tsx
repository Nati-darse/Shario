import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface User {
    id: string;
    email: string;
    username: string;
    avatar?: string;
    bio?: string;
    skills: string[];
}

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

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchUserData(token);
        fetchResources();
    }, []);

    const fetchUserData = async (token: string) => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data.user);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const fetchResources = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/resources?limit=10`);
            setResources(response.data.resources);
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900">
                                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">{user.username}</span>! 👋
                            </h1>
                            <p className="text-gray-600 mt-2">Ready to share some knowledge?</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <button
                        onClick={() => navigate('/add-resource')}
                        className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        <div className="text-5xl mb-4">➕</div>
                        <div className="text-2xl font-black">Add Resource</div>
                        <p className="text-green-100 mt-2">Share something you learned</p>
                    </button>

                    <button
                        onClick={() => navigate('/resources')}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        <div className="text-5xl mb-4">🔍</div>
                        <div className="text-2xl font-black">Browse Resources</div>
                        <p className="text-green-100 mt-2">Discover new learning materials</p>
                    </button>

                    <button
                        onClick={() => navigate('/profile')}
                        className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        <div className="text-5xl mb-4">👤</div>
                        <div className="text-2xl font-black">My Profile</div>
                        <p className="text-yellow-100 mt-2">Manage your account</p>
                    </button>
                </div>

                {/* Recent Resources */}
                <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-6">Latest Resources</h2>
                    {resources.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                            <div className="text-6xl mb-4">📚</div>
                            <p className="text-xl text-gray-600">No resources yet. Be the first to share!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {resources.map((resource) => (
                                <div
                                    key={resource._id}
                                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                                    onClick={() => window.open(resource.url, '_blank')}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                            📖
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                                            <p className="text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {resource.skills.slice(0, 3).map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                    {resource.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
