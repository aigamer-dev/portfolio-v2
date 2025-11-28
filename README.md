# Portfolio V2 - Main Site

This repository contains the V2 version of Hariharan S's portfolio website.

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions.

### Live URL
- **Custom Domain**: https://aigamer.dev (main domain)
- **GitHub Pages**: https://aigamer-dev.github.io/portfolio-v2/

## Setup Instructions

### 1. Repository Setup
1. Create a private repository: `aigamer-dev/portfolio-v2`
2. Push this code to the repository

### 2. GitHub Pages Configuration
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`
4. Save

### 3. Custom Domain Setup
1. In your DNS provider, add these records:
   - **A Records** (for apex domain):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME Record** (for www):
     - Name: `www`
     - Value: `aigamer-dev.github.io`
2. In repository Settings → Pages → Custom domain
   - Enter: `aigamer.dev`
   - Check "Enforce HTTPS"

### 4. Deploy
Push to the `main` branch and GitHub Actions will automatically deploy.

## Local Development

Since this is a static HTML site with assets, you can use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

Then visit: http://localhost:8000

## Structure

```
.
├── index.html          # Main HTML file
├── css/               # Stylesheets
├── fonts/             # Font files
├── img/               # Images
├── js/                # JavaScript files
├── CNAME              # Custom domain configuration
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions deployment workflow
```

## Assets

This version includes local static assets in the following directories:
- `css/` - Stylesheets including Font Awesome and Ionicons
- `fonts/` - Web fonts
- `img/` - Images and graphics
- `js/` - JavaScript libraries and custom scripts
