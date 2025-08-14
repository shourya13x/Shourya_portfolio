# Portfolio Deployment Guide

This guide covers multiple hosting options for your React + TypeScript + Vite portfolio.

## Option 1: Netlify (Recommended - Already Configured)

### Prerequisites
- Netlify account (free)
- Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Push your code to Git repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Connect your repository
   - Select your repository
   - Build settings are already configured in `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Configure Environment Variables**
   - In your Netlify dashboard, go to Site settings > Environment variables
   - Add these variables:
     - `EMAIL_USER`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail app password (not regular password)

4. **Custom Domain (Optional)**
   - In Site settings > Domain management
   - Add your custom domain
   - Configure DNS records as instructed

### Netlify Advantages
- ✅ Already configured with functions
- ✅ Automatic deployments from Git
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Serverless functions for contact form
- ✅ Easy environment variable management

---

## Option 2: Vercel

### Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Environment Variables**
   - In Vercel dashboard, add your email credentials

### Vercel Advantages
- ✅ Excellent React support
- ✅ Automatic deployments
- ✅ Edge functions
- ✅ Great performance

---

## Option 3: GitHub Pages

### Steps

1. **Add GitHub Pages dependency**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**
   - Go to repository settings > Pages
   - Select gh-pages branch as source

### Note: Contact form won't work on GitHub Pages (no serverless functions)

---

## Option 4: Firebase Hosting

### Steps

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

---

## Environment Variables Setup

### For Email Functionality
You'll need to set up Gmail app password:

1. Go to Google Account settings
2. Security > 2-Step Verification (enable if not)
3. Security > App passwords
4. Generate app password for "Mail"
5. Use this password in your environment variables

### Required Variables
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password

---

## Pre-deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Build works locally (`npm run build`)
- [ ] Contact form environment variables configured
- [ ] All images and assets are in the correct paths
- [ ] No hardcoded localhost URLs
- [ ] Meta tags and SEO optimized
- [ ] Favicon and manifest files present

---

## Post-deployment

1. **Test all functionality**
   - Navigation
   - Contact form
   - All interactive elements
   - Mobile responsiveness

2. **Performance optimization**
   - Check Lighthouse scores
   - Optimize images if needed
   - Monitor Core Web Vitals

3. **Analytics (Optional)**
   - Add Google Analytics
   - Add Plausible Analytics
   - Monitor user behavior

---

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (use 18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Contact form not working**
   - Verify environment variables
   - Check Netlify function logs
   - Test email credentials

3. **Images not loading**
   - Check file paths
   - Ensure images are in public folder
   - Verify build output

4. **Routing issues**
   - Ensure SPA redirects are configured
   - Check for 404 errors

---

## Recommended: Netlify Deployment

Since you already have Netlify functions configured, I recommend going with Netlify. It's the most seamless option and will give you:

- ✅ Contact form functionality
- ✅ Automatic deployments
- ✅ Great performance
- ✅ Easy management
- ✅ Free tier is generous

Your portfolio is already well-configured for Netlify deployment! 