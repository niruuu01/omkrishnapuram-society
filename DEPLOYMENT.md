# Deployment Guide - Omkrishnapuram Housing Society Website

This guide provides step-by-step instructions for deploying the website to various hosting platforms.

## Option 1: GitHub Pages (Recommended - Free)

### Prerequisites
- GitHub account
- Git installed on your computer

### Steps

1. **Create a GitHub Repository**
   - Go to github.com and sign in
   - Click "New Repository"
   - Name it: `omkrishnapuram-society`
   - Make it Public
   - Don't initialize with README (we already have one)

2. **Upload Files to GitHub**
   
   Open terminal/command prompt in the project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Omkrishnapuram website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/omkrishnapuram-society.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Select "main" branch
   - Folder: Select "/ (root)"
   - Click Save

4. **Access Your Website**
   - Your site will be live at: `https://YOUR-USERNAME.github.io/omkrishnapuram-society/`
   - It may take 2-5 minutes to deploy

### Custom Domain (Optional)
- Purchase a domain (e.g., omkrishnapuram.org)
- In GitHub Pages settings, add your custom domain
- Update DNS settings with your domain provider

---

## Option 2: Netlify (Easy Drag & Drop)

### Steps

1. **Sign Up**
   - Go to netlify.com
   - Sign up with email or GitHub

2. **Deploy**
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the entire `omkrishnapuram-society` folder
   - Wait for deployment (usually 30 seconds)

3. **Access Your Website**
   - Netlify provides a random URL like: `random-name-123.netlify.app`
   - You can change this in Site Settings → Domain Management

### Custom Domain
- Site Settings → Domain Management → Add custom domain
- Follow DNS configuration instructions

---

## Option 3: Vercel

### Steps

1. **Sign Up**
   - Go to vercel.com
   - Sign up with GitHub, GitLab, or email

2. **Deploy**
   - Click "Add New Project"
   - Import from Git (if using GitHub) or upload folder
   - Click "Deploy"

3. **Access Your Website**
   - Vercel provides URL: `omkrishnapuram-society.vercel.app`

---

## Option 4: Traditional Web Hosting

### For Shared Hosting (cPanel, etc.)

1. **Get Hosting**
   - Purchase hosting from providers like:
     - Hostinger
     - Bluehost
     - SiteGround
     - Local Indian providers (BigRock, HostGator India)

2. **Upload Files via FTP**
   - Get FTP credentials from hosting provider
   - Use FileZilla or similar FTP client
   - Connect to your server
   - Upload all files to `public_html` or `www` folder

3. **Access Your Website**
   - Use your hosting provider's domain or custom domain

---

## Post-Deployment Checklist

### Essential Steps After Deployment

- [ ] Test all pages (Home, Redevelopment)
- [ ] Check navigation links
- [ ] Test mobile responsiveness
- [ ] Verify document download links
- [ ] Test on different browsers
- [ ] Check loading speed
- [ ] Verify contact information is correct
- [ ] Test smooth scrolling and animations

### SEO Setup

1. **Google Search Console**
   - Add your website
   - Submit sitemap (create one if needed)
   - Monitor indexing

2. **Google Analytics** (Optional)
   - Create account at analytics.google.com
   - Add tracking code to HTML files (before `</head>`)

### Security

- [ ] Enable HTTPS (most platforms do this automatically)
- [ ] Set up automatic backups
- [ ] Keep local copy of all files

---

## Updating the Live Website

### For GitHub Pages
```bash
# Make changes to files
git add .
git commit -m "Description of changes"
git push
# Changes will be live in 1-2 minutes
```

### For Netlify/Vercel
- If connected to Git: Push changes to repository
- If manual: Drag and drop updated files again

### For Traditional Hosting
- Use FTP to upload changed files
- Overwrite existing files

---

## Troubleshooting

### Website Not Loading
- Check if deployment is complete
- Verify all files were uploaded
- Check browser console for errors

### Images Not Showing
- Verify image paths are correct
- Ensure images were uploaded
- Check file names match HTML references

### Documents Not Downloading
- Verify PDF files are in correct folders
- Check file paths in HTML
- Ensure documents folder was uploaded

### Mobile View Issues
- Clear browser cache
- Test in incognito/private mode
- Check responsive design on actual devices

---

## Maintenance Tips

### Regular Updates
- Update "Latest Updates" section monthly
- Add new documents as they become available
- Keep committee information current

### Performance Monitoring
- Check loading speed quarterly
- Optimize images if needed
- Monitor for broken links

### Backup Strategy
- Keep local copy of all files
- Export from hosting platform monthly
- Version control with Git (recommended)

---

## Cost Estimates

### Free Options
- **GitHub Pages**: Free forever
- **Netlify**: Free tier (100GB bandwidth/month)
- **Vercel**: Free tier (100GB bandwidth/month)

### Paid Options
- **Custom Domain**: ₹500-1500/year
- **Shared Hosting**: ₹1500-5000/year
- **Premium Hosting**: ₹5000+/year

---

## Support Resources

### Documentation
- GitHub Pages: https://pages.github.com/
- Netlify: https://docs.netlify.com/
- Vercel: https://vercel.com/docs

### Video Tutorials
- Search YouTube for: "How to deploy website to [platform name]"

---

## Recommended Setup for Society

**Best Option**: GitHub Pages + Custom Domain

**Why?**
- Free hosting
- Reliable (99.9% uptime)
- Easy updates via Git
- Professional custom domain
- Automatic HTTPS

**Total Cost**: Only domain registration (₹500-1500/year)

---

For assistance with deployment, contact your web administrator or IT committee member.
