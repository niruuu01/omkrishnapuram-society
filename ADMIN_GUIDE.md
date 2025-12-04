# Omkrishnapuram Co-op Housing Society Ltd. - Website Admin Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Uploading Documents](#uploading-documents)
3. [Updating Content](#updating-content)
4. [Adding Updates/Announcements](#adding-updatesannouncements)
5. [Customizing Images](#customizing-images)
6. [Managing Committee Members](#managing-committee-members)
7. [Technical Support](#technical-support)

---

## Introduction

Welcome to the admin guide for the Omkrishnapuram Co-op Housing Society website. This guide will help you manage and update the website content without requiring technical knowledge.

### Website Structure
- **Home Page** (`index.html`) - Society introduction, committee members, vision
- **Redevelopment Project Page** (`redevelopment.html`) - Project details, documents, updates

---

## Uploading Documents

### Document Categories
The website has four document categories:
1. **Notices & Circulars** - General body meeting notices, announcements
2. **Presentations & Reports** - Feasibility studies, project presentations
3. **Drawings & Plans** - Architectural drawings, floor plans
4. **Approvals & Permissions** - Municipal approvals, clearances

### How to Upload Documents

#### Step 1: Prepare Your Document
- Save your document as a PDF file
- Use a descriptive filename (e.g., `gbm-notice-jan-2025.pdf`)
- Keep file sizes reasonable (compress if necessary)

#### Step 2: Upload to Correct Folder
Place your PDF file in the appropriate folder:
- Notices → `documents/notices/`
- Reports → `documents/reports/`
- Drawings → `documents/drawings/`
- Approvals → `documents/approvals/`

#### Step 3: Update the HTML
Open `redevelopment.html` in a text editor and find the appropriate document category section.

**Example:** To add a new notice:

```html
<div class="document-item">
    <div class="doc-icon">📄</div>
    <div class="doc-info">
        <h4>Your Document Title</h4>
        <p class="doc-meta">Date: DD MMM YYYY • Size: XXX KB</p>
    </div>
    <a href="documents/notices/your-file-name.pdf" class="doc-download" download>
        <span>⬇</span>
    </a>
</div>
```

Replace:
- `Your Document Title` - with the actual document name
- `DD MMM YYYY` - with the document date
- `XXX KB` - with the file size
- `your-file-name.pdf` - with your actual filename

---

## Updating Content

### Changing Society Information

#### Update Address
1. Open `index.html` in a text editor
2. Find the "Our Location" section
3. Update the address text:

```html
<p>Near Patel Low Price Shop<br>Shahad (W), 421103</p>
```

#### Update Contact Information
1. Open `index.html`
2. Find the "Get In Touch" section
3. Update email, phone, or address as needed

### Updating Committee Message
1. Open `redevelopment.html`
2. Find the "Message from the Committee" section
3. Edit the paragraph text between `<p>` and `</p>` tags
4. Update signatures at the bottom if needed

---

## Adding Updates/Announcements

### Adding a New Update

1. Open `redevelopment.html`
2. Find the "Latest Updates" section
3. Add a new update item at the **top** of the list:

```html
<div class="update-item">
    <div class="update-date">
        <span class="date-day">27</span>
        <span class="date-month">Nov 2025</span>
    </div>
    <div class="update-content">
        <h3>Update Title</h3>
        <p>Description of the update goes here.</p>
    </div>
</div>
```

Replace:
- `27` - with the day
- `Nov 2025` - with the month and year
- `Update Title` - with your update headline
- Description text - with your announcement details

---

## Customizing Images

### Adding Society Building Image

#### Option 1: Replace Placeholder
1. Save your building image as `building.jpg` or `building.png`
2. Place it in the main website folder
3. Open `index.html`
4. Find the `.image-placeholder` div
5. Replace it with:

```html
<div class="intro-image">
    <img src="building.jpg" alt="Omkrishnapuram Society Building" 
         style="width: 100%; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
</div>
```

#### Option 2: Update Hero Background
1. Save your image as `hero-bg.jpg`
2. Place it in the main folder
3. Open `styles.css`
4. Find `.hero` section and add:

```css
.hero {
    background-image: url('hero-bg.jpg');
    background-size: cover;
    background-position: center;
}
```

---

## Managing Committee Members

### Updating Committee Member Information

1. Open `index.html`
2. Find the "Our Committee Members" section
3. Each member card looks like this:

```html
<div class="member-card">
    <div class="member-avatar">
        <div class="avatar-circle">RS</div>
    </div>
    <div class="member-info">
        <h3 class="member-name">Mrs. Ragini Singh</h3>
        <p class="member-designation">Chairperson</p>
        <div class="member-badge">Leadership</div>
    </div>
</div>
```

To update:
- Change `RS` to the member's initials
- Update the name in `member-name`
- Update the designation (Chairperson, Secretary, Treasurer)
- Update the badge text if needed

### Adding a New Committee Member

Copy an existing member card and paste it in the committee grid, then update all the details.

---

## Technical Support

### Common Tasks Quick Reference

| Task | File to Edit | Section to Find |
|------|-------------|-----------------|
| Add document | `redevelopment.html` | Document Repository |
| Add update | `redevelopment.html` | Latest Updates |
| Change address | `index.html` | Our Location |
| Update committee | `index.html` | Our Committee Members |
| Change contact info | `index.html` | Get In Touch |
| Update message | `redevelopment.html` | Message from Committee |

### File Locations
```
omkrishnapuram-society/
├── index.html              (Home page)
├── redevelopment.html      (Redevelopment page)
├── styles.css              (Design styles)
├── script.js               (Interactive features)
└── documents/
    ├── notices/            (Upload notices here)
    ├── reports/            (Upload reports here)
    ├── drawings/           (Upload drawings here)
    └── approvals/          (Upload approvals here)
```

### Tips for Success
1. **Always make a backup** before editing files
2. **Test changes** by opening the HTML file in a browser
3. **Keep filenames simple** - use lowercase, no spaces (use hyphens instead)
4. **Maintain consistency** - follow the existing format when adding content
5. **Check file sizes** - compress large PDFs before uploading

### Getting Help
If you encounter issues:
1. Check that file paths are correct
2. Ensure all opening tags have closing tags
3. Verify that quotes are properly closed
4. Make sure filenames match exactly (case-sensitive)

---

## Best Practices

### Content Updates
- Update the "Latest Updates" section regularly
- Remove outdated documents periodically
- Keep document names descriptive and dated
- Maintain a consistent date format

### Document Management
- Organize documents by category
- Use clear, descriptive filenames
- Include dates in document titles
- Keep file sizes under 5MB when possible

### Maintenance Schedule
- **Weekly**: Check for new updates to post
- **Monthly**: Review and update documents
- **Quarterly**: Review committee information
- **Annually**: Update copyright year in footer

---

## Contact for Technical Assistance

For technical issues or questions about updating the website, please contact your web administrator or the IT committee member.

**Remember**: Always preview changes in a browser before publishing to ensure everything looks correct!
