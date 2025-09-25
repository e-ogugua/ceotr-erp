# CEOTR Ltd ERP Suite - Deployment Guide

## 🚀 Deployment Overview

The CEOTR Ltd ERP Suite is designed for seamless deployment across multiple platforms with automatic deployment capabilities through Vercel and GitHub integration.

## 📋 Deployment Options

### 1. 🚀 Vercel (Recommended)
**Best for:** Production deployment with automatic updates
**URL:** `https://ceotr-ltd-erp-suite.vercel.app`

### 2. 🖥️ Local Development
**Best for:** Development and testing
**URL:** `http://localhost:3001`

### 3. 🐳 Docker
**Best for:** Self-hosted deployments
**Setup:** Custom Docker configuration

### 4. 📦 Static Hosting
**Best for:** Simple hosting solutions
**Files:** Upload `dist/` folder contents

## 🔧 Vercel Deployment (Recommended)

### Prerequisites
- **GitHub Account** with repository access
- **Vercel Account** (free tier available)
- **Project repository** connected to GitHub

### Automatic Deployment Setup

#### Step 1: Connect to Vercel
1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Select **"Import Git Repository"**
4. Connect your **GitHub account**
5. Choose **"ceotrLtdErpSuite"** repository

#### Step 2: Configure Build Settings
```json
// vercel.json (already configured)
{
  "outputDirectory": "dist",
  "framework": "vite",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

#### Step 3: Enable Automatic Deployment
1. Go to **Project Settings** → **Git**
2. Connect to **GitHub repository**
3. Enable **"Automatic deployments on push"**
4. Select branch: **"master"**

#### Step 4: Deploy
```bash
# Push to master branch
git add .
git commit -m "Deploy to production"
git push origin master

# Vercel automatically detects changes and deploys
```

### Vercel Features
- ✅ **Automatic deployments** on every push
- ✅ **Global CDN** distribution
- ✅ **SSL certificate** automatic
- ✅ **Preview deployments** for branches
- ✅ **Environment variables** management
- ✅ **Custom domains** support
- ✅ **Analytics** and monitoring

## 🖥️ Local Development Deployment

### Development Server
```bash
# Start development server
npm run dev

# Access at:
http://localhost:3001
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Files generated in: dist/
```

### Mock API Server
```bash
# Start API server separately
npm run server

# Or run both together
npm run dev:full
```

## 🐳 Docker Deployment

### Dockerfile Setup
```dockerfile
# Multi-stage build for optimization
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Commands
```bash
# Build Docker image
docker build -t ceotr-erp-suite .

# Run container
docker run -p 3001:80 ceotr-erp-suite

# Access at: http://localhost:3001
```

## 📦 Static Hosting Deployment

### Build Files
```bash
npm run build
# Output: dist/ folder
```

### Upload to Static Host
Upload all files from `dist/` folder to your static hosting provider:

- **Netlify:** Drag and drop `dist/` folder
- **GitHub Pages:** Enable Pages in repository settings
- **AWS S3:** Upload files to S3 bucket with static hosting
- **Firebase Hosting:** `firebase deploy`

### Required Files
```
dist/
├── index.html          # Main HTML file
├── assets/             # Static assets
│   ├── images/         # All images
│   ├── icons/          # Icon files
│   └── fonts/          # Font files
├── src/                # Source code (if needed)
└── package.json        # Dependencies
```

## 🔧 Environment Configuration

### Development Environment
```bash
# .env.local
VITE_API_URL=http://localhost:3001/api
VITE_APP_ENV=development
```

### Production Environment
```bash
# Production variables set in Vercel dashboard
API_SECRET_KEY=your-secret-key
NODE_ENV=production
VERCEL_URL=https://ceotr-ltd-erp-suite.vercel.app
```

### Environment Variables Setup
1. **Vercel Dashboard:** Project Settings → Environment Variables
2. **Local Development:** Create `.env.local` file
3. **Production:** Set in deployment platform

## 📊 Deployment Monitoring

### Vercel Analytics
- **Real-time metrics** dashboard
- **Performance monitoring**
- **Error tracking** and alerts
- **Usage statistics**

### Health Checks
```bash
# API health check
curl https://ceotr-ltd-erp-suite.vercel.app/api/health

# Response should be:
{"status":"healthy","timestamp":"2025-01-15T10:30:00Z"}
```

### Performance Monitoring
- **Lighthouse scores** tracking
- **Core Web Vitals** monitoring
- **Load time** optimization
- **Bundle size** analysis

## 🚨 Troubleshooting

### Common Deployment Issues

#### 1. Build Failures
```bash
# Check build logs
vercel logs

# Common fixes:
npm install  # Reinstall dependencies
npm run build  # Test build locally
```

#### 2. Missing Environment Variables
```bash
# Check if variables are set
vercel env ls

# Add missing variables
vercel env add API_SECRET_KEY
```

#### 3. Routing Issues
```bash
# Check if all routes work
curl https://ceotr-ltd-erp-suite.vercel.app/
curl https://ceotr-ltd-erp-suite.vercel.app/services
curl https://ceotr-ltd-erp-suite.vercel.app/portfolio
```

#### 4. Image Loading Issues
```bash
# Check image paths
curl https://ceotr-ltd-erp-suite.vercel.app/images/logo/ceotr-logo-white.png

# Verify image optimization
# Images should load with proper fallbacks
```

### Debug Commands
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Check environment variables
vercel env ls

# Redeploy latest commit
vercel --prod
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [master]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

### Automatic Deployment Flow
```
Git Push → GitHub → Vercel Detection → Build → Deploy → Live
```

## 📈 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Optimize images
# Images are automatically optimized by Vercel

# Enable compression
# Gzip compression enabled by default
```

### CDN Configuration
- **Global CDN** enabled automatically
- **Edge caching** for static assets
- **Image optimization** with format conversion
- **Automatic SSL** certificate management

## 🔒 Security Considerations

### Production Security
- ✅ **HTTPS only** (automatic SSL)
- ✅ **Environment variables** encrypted
- ✅ **API keys** secured
- ✅ **CORS** properly configured
- ✅ **CSP headers** for XSS protection

### Access Control
- **Public pages:** Portfolio, Services, About
- **Protected routes:** Admin dashboard (future)
- **API endpoints:** Rate limiting and authentication

## 🚀 Production Checklist

### Pre-Deployment
- [ ] **Test build locally** (`npm run build`)
- [ ] **Check all links** work correctly
- [ ] **Verify images** load properly
- [ ] **Test forms** submit correctly
- [ ] **Validate responsive** design

### Deployment
- [ ] **Push to master** branch
- [ ] **Monitor Vercel** deployment
- [ ] **Check live URL** functionality
- [ ] **Test all features** on production
- [ ] **Verify analytics** tracking

### Post-Deployment
- [ ] **Monitor performance** metrics
- [ ] **Check error logs** if any
- [ ] **Validate SEO** and meta tags
- [ ] **Test mobile** responsiveness
- [ ] **Verify SSL** certificate

## 📞 Support & Monitoring

### Monitoring Tools
- **Vercel Dashboard** - Deployment monitoring
- **GitHub Issues** - Bug reports and features
- **Email Support** - Technical assistance
- **Performance Monitoring** - Lighthouse and analytics

### Emergency Contacts
- **Development Team:** ceotrltd@gmail.com
- **Phone:** +234 806 450 8595
- **Business Hours:** Mon–Fri, 9:00 AM – 6:00 PM WAT

---

**Deployment Guide Version:** 2.0.0 | Last Updated: January 2025
