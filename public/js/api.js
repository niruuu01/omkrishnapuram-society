// API Client for Omkrishnapuram Society Management System

class API {
    constructor() {
        this.baseURL = '/api';
        this.csrfToken = null;
    }

    // Get CSRF token
    async getCSRFToken() {
        try {
            const response = await fetch(`${this.baseURL}/csrf-token`, {
                credentials: 'include'
            });
            const data = await response.json();
            this.csrfToken = data.csrfToken;
            return this.csrfToken;
        } catch (error) {
            console.error('Failed to get CSRF token:', error);
            throw error;
        }
    }

    // Generic request method
    async request(endpoint, options = {}) {
        // Get CSRF token for non-GET requests
        if (!this.csrfToken && options.method && options.method !== 'GET') {
            await this.getCSRFToken();
        }

        const headers = {
            ...options.headers
        };

        // Add CSRF token for state-changing requests
        if (this.csrfToken && options.method && options.method !== 'GET') {
            headers['CSRF-Token'] = this.csrfToken;
        }

        // Don't set Content-Type for FormData (browser will set it with boundary)
        if (!(options.body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }

        const config = {
            ...options,
            headers,
            credentials: 'include'
        };

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, config);

            // Handle different response types
            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                throw new Error(data.error || data || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    // Authentication
    async login(username, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
    }

    async logout() {
        return this.request('/auth/logout', {
            method: 'POST'
        });
    }

    async verifyAuth() {
        return this.request('/auth/verify');
    }

    async changePassword(currentPassword, newPassword) {
        return this.request('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword })
        });
    }

    // Content Management
    async getContent() {
        return this.request('/content');
    }

    async updateContent(key, value) {
        return this.request(`/content/${key}`, {
            method: 'PUT',
            body: JSON.stringify({ value })
        });
    }

    async deleteContent(key) {
        return this.request(`/content/${key}`, {
            method: 'DELETE'
        });
    }

    // Committee Management
    async getCommitteeMembers() {
        return this.request('/committee');
    }

    async getMemberById(id) {
        return this.request(`/committee/${id}`);
    }

    async createMember(memberData) {
        const formData = new FormData();

        Object.keys(memberData).forEach(key => {
            if (memberData[key] !== null && memberData[key] !== undefined) {
                formData.append(key, memberData[key]);
            }
        });

        return this.request('/committee', {
            method: 'POST',
            body: formData
        });
    }

    async updateMember(id, memberData) {
        const formData = new FormData();

        Object.keys(memberData).forEach(key => {
            if (memberData[key] !== null && memberData[key] !== undefined) {
                formData.append(key, memberData[key]);
            }
        });

        return this.request(`/committee/${id}`, {
            method: 'PUT',
            body: formData
        });
    }

    async deleteMember(id) {
        return this.request(`/committee/${id}`, {
            method: 'DELETE'
        });
    }

    // Document Management
    async getDocuments(category = null) {
        const query = category ? `?category=${category}` : '';
        return this.request(`/documents${query}`);
    }

    async uploadDocument(file, title, description, category) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('category', category);
        if (description) {
            formData.append('description', description);
        }

        return this.request('/documents', {
            method: 'POST',
            body: formData
        });
    }

    async deleteDocument(id) {
        return this.request(`/documents/${id}`, {
            method: 'DELETE'
        });
    }

    getDocumentDownloadURL(id) {
        return `${this.baseURL}/documents/${id}/download`;
    }
}

// Create global API instance
const api = new API();
