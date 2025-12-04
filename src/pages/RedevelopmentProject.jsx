import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentCard from '../components/DocumentCard';
import { Search, Filter } from 'lucide-react';

const RedevelopmentProject = () => {
    const [documents, setDocuments] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // Map backend categories to display labels
    const categoryMap = {
        notices: 'notice',
        reports: 'report',
        drawings: 'drawing',
        approvals: 'approval'
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('/api/documents');
            // Extract documents array from response
            const docs = response.data.documents || response.data || [];
            setDocuments(Array.isArray(docs) ? docs : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching documents:', error);
            setDocuments([]); // Set empty array on error
            setLoading(false);
        }
    };

    const filteredDocs = Array.isArray(documents) ? documents.filter(doc => {
        const displayCategory = categoryMap[doc.category] || doc.category;
        const matchesFilter = filter === 'all' || displayCategory === filter;
        const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase()) ||
            (doc.description && doc.description.toLowerCase().includes(search.toLowerCase()));
        return matchesFilter && matchesSearch;
    }) : [];

    return (
        <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Redevelopment Project
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Stay updated with the latest progress, notices, and reports regarding our society's redevelopment.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                            {['all', 'notice', 'report', 'drawing', 'approval'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-6 py-2.5 rounded-xl capitalize whitespace-nowrap transition-all font-medium ${filter === type
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {type === 'all' ? 'All Documents' : type}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search documents..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Document Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-slate-500 text-lg">Loading documents...</p>
                    </div>
                ) : filteredDocs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDocs.map(doc => (
                            <DocumentCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                        <Filter className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 text-lg">No documents found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RedevelopmentProject;
