# CEOTR Ltd ERP Suite - Asset Management

This document outlines the image assets required for the CEOTR Ltd ERP Suite and provides guidance for customization.

## Directory Structure

### Required Assets
```
public/
├── images/
│   ├── logo/
│   │   ├── ceotr-logo-white.png    # Main logo (white version)
│   │   ├── ceotr-logo.svg          # SVG version for scalability
│   │   └── ceotr-logo-icon.png     # Small icon version
│   ├── hero/
│   │   └── hero-background.png    # Hero section background
│   ├── services/
│   │   ├── construction.jpg       # Construction service image
│   │   ├── it-solutions.jpg       # IT services image
│   │   ├── consulting.jpg         # Business consulting image
│   │   └── software.jpg           # Software development image
│   ├── portfolio/
│   │   └── [project-images]       # Project galleries
│   ├── team/
│   │   └── [team-photos]          # Team member photos
│   └── testimonials/
│       └── [client-photos]        # Client testimonial photos
└── favicon.ico                    # Site favicon
```

## Image Specifications

### Logo Requirements
- **Format:** PNG (with transparency) or SVG
- **Dimensions:** 200x80px minimum for main logo
- **Colors:** Blue (#2563eb) primary color scheme
- **Background:** Transparent or white

### Hero Background
- **Dimensions:** 1920x1080px recommended
- **Format:** JPG or WebP for compression
- **Content:** Professional business imagery
- **Optimization:** Compressed for web delivery

### Service Images
- **Dimensions:** 800x600px minimum
- **Format:** JPG or WebP
- **Aspect Ratio:** 4:3 or 16:9
- **Quality:** High resolution, optimized for web

### Portfolio Images
- **Main Images:** 1200x800px minimum
- **Gallery Images:** 800x600px minimum
- **Format:** JPG with WebP fallbacks
- **Consistency:** Similar lighting and style

### Team Photos
- **Dimensions:** 400x400px (square crop)
- **Format:** JPG or PNG
- **Style:** Professional headshots
- **Background:** Consistent styling

## Fallback System

### Image Loading Hierarchy
1. **WebP format** (if supported)
2. **Original format** (JPG/PNG)
3. **Placeholder** (generated automatically)
4. **Error handling** (graceful degradation)

### Implementation
```jsx
// Automatic fallback system in components
<img
  src="/images/services/construction.jpg"
  alt="Construction Services"
  loading="lazy"
  onError={(e) => {
    // Fallback to placeholder
    e.target.style.display = 'none';
  }}
/>
```

## Performance Optimization

### Image Formats
- **WebP** for modern browsers (smaller file sizes)
- **JPG** for photographs (good compression)
- **PNG** for graphics with transparency
- **SVG** for logos and icons (scalable)

### Loading Strategy
- **Eager loading** for above-the-fold images (logos, hero)
- **Lazy loading** for below-the-fold images (portfolio, team)
- **Progressive loading** for large images
- **Preloading** for critical assets

## Customization Process

### Adding New Images
1. **Place images** in appropriate directories
2. **Update data files** (`src/data/demoServices.js`)
3. **Test loading** and fallbacks
4. **Optimize sizes** for web delivery

### Updating Existing Images
1. **Replace image files** in public/images/
2. **Maintain dimensions** for consistency
3. **Update alt text** if content changes
4. **Test responsive behavior**

## Asset Management

### File Naming Convention
- **Lowercase** with hyphens: `hero-background.jpg`
- **Descriptive names**: `team-ceo-photo.jpg`
- **Consistent format**: JPG for photos, PNG for graphics
- **Version control**: Avoid renaming existing assets

### Compression Guidelines
- **Hero images:** 70-80% quality
- **Service images:** 75-85% quality
- **Team photos:** 80-90% quality
- **Logo files:** 90-100% quality

## Testing Checklist

### Image Loading
- [ ] All images load correctly
- [ ] Fallbacks work for missing images
- [ ] Responsive sizing functions properly
- [ ] Loading performance is acceptable

### Accessibility
- [ ] Alt text is descriptive and meaningful
- [ ] Images don't rely solely on color
- [ ] Proper contrast in image content
- [ ] Screen reader compatibility

## Troubleshooting

### Common Issues
**Missing Images:** Check file paths in components
**Loading Errors:** Verify file formats and permissions
**Performance Issues:** Optimize image sizes and formats
**Responsive Problems:** Check CSS media queries

### Support
- **File locations:** Check public/images/ directory
- **Component usage:** Review image imports in JSX files
- **Build process:** Verify asset copying in build configuration

---

**CEOTR Ltd ERP Suite — Developed by CEO – Chukwuka Emmanuel Ogugua.**

### 1. Company Information
```javascript
// Replace the demo data with real information:
- Company legal name: "CEO Transnational Resources Limited"
- Brand name: "CEOTR Ltd"
- Tagline: "Discover Excellence"
- Founded year: "2020"
- Headquarters: "Lagos, Nigeria"
- Phone: "+234-XXX-XXX-XXXX"
- Email: "info@ceotr.com"
- Website: "https://ceotr.com"
- About text: "Your company story and mission..."
```

### 2. Real Services & Pricing
```javascript
// For each service, provide:
- Service name
- Description (100-150 words)
- Features list (4-6 bullet points)
- Real pricing ranges for ₦, $, £
- Service images
```

### 3. Portfolio/Projects
```javascript
// For each project showcase:
- Project name
- Description
- Main image + gallery images
- Technologies used
- Completion date
- Project type (Construction/IT/Software/Contracting)
```

### 4. Team Members
```javascript
// Team information:
- Name and position
- Bio/description
- Photo
- LinkedIn/social media (optional)
```

### 5. Testimonials
```javascript
// Client testimonials:
- Client name
- Company name
- Testimonial text
- Client photo
- Rating (1-5 stars)
```

### 6. Contact Information
```javascript
// Contact details:
- Office address
- Phone numbers
- Email addresses
- Business hours
- Social media links
```

## Branding & Design

### Colors
```javascript
// Provide your brand colors:
- Primary color: "#2563eb" (current blue)
- Secondary color: "#your-color"
- Accent colors: ["#color1", "#color2"]
- Neutral colors: ["#f8fafc", "#64748b"]
```

### Typography
```javascript
// Font preferences:
- Primary font: "Inter" (current)
- Alternative: "Your preferred font"
- Font weights: [300, 400, 500, 600, 700]
```

## To Get Started:

1. Create the folder structure above
2. Add your images with the exact names specified
3. Provide the information listed above
4. I'll customize everything to match your brand

## What I'll Do With Your Assets:

Replace placeholder content with your real information
Add your images to the appropriate components
Update branding colors and fonts
Create responsive image galleries
Add SEO optimization with proper alt tags
Implement lazy loading for better performance
Add animations and transitions
Create additional sections (About, Portfolio, Contact)
Improve mobile experience

Ready to customize? Just provide the information above and I'll transform this into your professional CEOTR Ltd website.

---

CEOTR Ltd ERP Suite — Developed by Chukwuka Emmanuel Ogugua.
