import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

const DocumentCard = ({ doc }) => {
    const handleView = () => {
        // Use the file_path directly (Vite will proxy /uploads to backend)
        window.open(doc.file_path, '_blank');
    };

    const handleDownload = () => {
        // Use the file_path directly (Vite will proxy /uploads to backend)
        const link = document.createElement('a');
        link.href = doc.file_path;
        link.download = doc.file_name || 'document';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 flex-shrink-0">
                        <FileText size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-slate-800 truncate">{doc.title}</h3>
                        <p className="text-sm text-slate-500">{new Date(doc.uploaded_at).toLocaleDateString()}</p>
                        {doc.description && (
                            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{doc.description}</p>
                        )}
                        <p className="text-xs text-slate-400 mt-2">File: {doc.file_name}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 justify-end">
                <button
                    onClick={handleView}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium"
                >
                    <Eye size={16} /> View
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                >
                    <Download size={16} /> Download
                </button>
            </div>
        </div>
    );
};

export default DocumentCard;
