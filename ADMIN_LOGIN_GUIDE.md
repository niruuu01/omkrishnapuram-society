# Admin Login Guide

## 🔐 Admin Access Information

### Login Credentials

**Default Admin Login:**
- **Username:** `admin`
- **Password:** `admin123`

> ⚠️ **IMPORTANT:** These are default credentials for demonstration purposes. In a production environment, you should:
> 1. Change these credentials immediately
> 2. Implement server-side authentication
> 3. Use encrypted password storage
> 4. Add two-factor authentication

---

## 📋 How to Access Admin Panel

### Step 1: Navigate to Admin Login
Open your web browser and go to:
```
admin-login.html
```

Or click the "Admin" link in the footer of any page (if added).

### Step 2: Enter Credentials
1. Enter username: `admin`
2. Enter password: `admin123`
3. (Optional) Check "Remember me" to save username
4. Click "Login" button

### Step 3: Access Dashboard
After successful login, you'll be redirected to the admin dashboard where you can:
- View website statistics
- Manage content
- Update committee members
- Upload documents
- Post announcements
- Update redevelopment project details

---

## 🎯 Admin Dashboard Features

### Statistics Overview
- **Committee Members Count** - Total number of committee members
- **Documents Count** - Number of uploaded documents
- **Announcements Count** - Active announcements
- **Page Views** - Website traffic statistics

### Quick Actions
1. **Update Content** - Edit homepage and about section
2. **Manage Committee** - Add/edit/remove committee members
3. **Upload Documents** - Add new documents and files
4. **Post Announcement** - Create announcements for residents
5. **Redevelopment Updates** - Update project timeline
6. **Settings** - Configure website preferences

### Recent Activity
View the latest changes and updates made to the website.

---

## 🔒 Security Features

### Current Implementation
- ✅ Session-based authentication
- ✅ Password visibility toggle
- ✅ Remember me functionality
- ✅ Auto-logout after 30 minutes of inactivity
- ✅ Error handling for invalid credentials
- ✅ Secure login form with validation

### Recommended for Production
- 🔸 Server-side authentication (PHP, Node.js, etc.)
- 🔸 Database for user credentials
- 🔸 Password hashing (bcrypt, argon2)
- 🔸 HTTPS/SSL certificate
- 🔸 CSRF protection
- 🔸 Rate limiting for login attempts
- 🔸 Two-factor authentication (2FA)
- 🔸 IP whitelisting for admin access
- 🔸 Audit logs for admin actions

---

## 🚪 Logout

To logout from the admin panel:
1. Click the "🚪 Logout" button in the top-right corner
2. Confirm the logout action
3. You'll be redirected to the login page

---

## 🛠️ Troubleshooting

### Can't Login?
- Verify you're using correct credentials: `admin` / `admin123`
- Check if JavaScript is enabled in your browser
- Clear browser cache and cookies
- Try a different browser

### Forgot Password?
- Click "Forgot password?" link on login page
- Contact society secretary for password reset
- Default contact: info@omkrishnapuram.org

### Auto-Logout Issues?
- The system logs out after 30 minutes of inactivity
- Move your mouse or click to reset the timer
- This is a security feature to protect your session

---

## 📝 Notes for Developers

### File Structure
```
omkrishnapuram-society/
├── admin-login.html       # Admin login page
├── admin-dashboard.html   # Admin dashboard
├── admin-auth.js          # Authentication logic
├── styles.css            # Includes admin styles
└── script.js             # General scripts
```

### Customization
To change admin credentials, edit `admin-auth.js`:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'your-username',
    password: 'your-password'
};
```

### Session Storage
The system uses `sessionStorage` to maintain login state:
- `adminLoggedIn` - Login status
- `adminUsername` - Current admin username

---

## 🎨 Design Features

- **Modern Glassmorphism Design** - Translucent cards with blur effects
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Floating icons, hover effects, transitions
- **Dark Theme** - Professional dark color scheme
- **Interactive Elements** - Password toggle, form validation
- **Loading States** - Visual feedback during login

---

## 📞 Support

For technical support or questions:
- **Email:** info@omkrishnapuram.org
- **Phone:** +91 XXXX XXXXXX

---

*Last Updated: November 2025*
