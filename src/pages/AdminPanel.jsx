import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Upload, LogOut, FileText } from 'lucide-react';

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [documents, setDocuments] = useState([]);
    const [uploadLoading, setUploadLoading] = useState(false);

    // Upload Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('notices');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    // Check session on mount
    useEffect(() => {
        verifySession();
    }, []);

    const verifySession = async () => {
        try {
            await axios.get('/api/auth/verify', { withCredentials: true });
            setIsAuthenticated(true);
            fetchDocuments();
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchDocuments();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/login', { username, password }, { withCredentials: true });
            setUsername('');
            setPassword('');
            setIsAuthenticated(true);
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
        setIsAuthenticated(false);
        setDocuments([]);
    };

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('/api/documents', { withCredentials: true });
            const docs = response.data.documents || response.data;
            setDocuments(Array.isArray(docs) ? docs : []);
        } catch (error) {
            console.error('Error fetching documents:', error);
            setDocuments([]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert('Please select a file');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('file', file);

        setUploadLoading(true);
        try {
            await axios.post('/api/documents', formData, {
                withCredentials: true
            });
            alert('Document uploaded successfully');
            setTitle('');
            setDescription('');
            setFile(null);
            fetchDocuments();
        } catch (error) {
            alert('Upload failed');
        } finally {
            setUploadLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document?')) return;
        try {
            await axios.delete(`/api/documents/${id}`, { withCredentials: true });
            fetchDocuments();
        } catch (error) {
            alert('Delete failed');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                <p className="text-white text-xl">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LogOut size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
                        <p className="text-slate-300">Access the administrative dashboard</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-200 mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Enter password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-800">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-semibold transition-all duration-300"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Upload Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Upload size={24} className="text-blue-600" /> Upload Document
                            </h2>
                            <form onSubmit={handleUpload} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="notices">Notice</option>
                                        <option value="reports">Report</option>
                                        <option value="drawings">Drawing</option>
                                        <option value="approvals">Approval</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-24 resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">File</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        required
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={uploadLoading}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {uploadLoading ? 'Uploading...' : 'Upload Document'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Document List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                            <h2 className="text-2xl font-bold mb-6">Manage Documents</h2>
                            <div className="space-y-4">
                                {documents.map(doc => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-800">{doc.title}</h4>
                                                <p className="text-sm text-slate-500 capitalize">{doc.category} • {new Date(doc.uploaded_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(doc.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Document"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                                {documents.length === 0 && (
                                    <p className="text-center text-slate-500 py-12">No documents uploaded yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
