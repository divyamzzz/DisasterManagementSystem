import React, { use, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Base_URL from '../url';
import axios from 'axios';
export default function UserPosts() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const{user}=useAuth();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload={
            userId:user?.id,
            postTitle:title,
            postContent:content
        };
        const res=await axios.post(`${Base_URL}/Posts`,payload);
        if(res.status===201){
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Create a Post</h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        placeholder="Post Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                        Submit Post
                    </button>
                </form>
            </div>
        </div>
    );
}
