# RX Renovation

**Modern, bilingual renovation company website for Tbilisi, Georgia**

A premium architectural renovation studio website featuring clean editorial design, bilingual support (English/Georgian), and optimized for GitHub Pages deployment.

🌐 **Live Site**: [rx.com.ge](https://rx.com.ge)
🏢 **Company**: RX Renovation — Transforming homes in Tbilisi, Georgia
🎨 **Design**: Editorial-inspired, minimalist aesthetic with warm earth tones

---

## About RX Renovation

RX Renovation is a full-service renovation studio based in Tbilisi, Georgia, specializing in high-end residential transformations. We combine architectural precision with craftsmanship to create spaces that are both functional and beautiful.

**Services:**
- Kitchen & Bathroom Remodeling
- Full Home Renovations
- Outdoor & Patio Design
- 3D Visualization
- Custom Additions
- Technical Documentation & Supervision

---

## Features

✅ **Bilingual Support** — Full English/Georgian language switching
✅ **Modern Typography** — FiraGO font family for excellent Georgian script support
✅ **Dark/Light Mode** — User preference with localStorage persistence
✅ **Responsive Design** — Mobile-first approach, optimized for all devices
✅ **Component-Based** — Modular JavaScript architecture
✅ **i18n System** — JSON-based translation management
✅ **Accessibility** — ARIA labels, semantic HTML, keyboard navigation
✅ **Performance** — Optimized assets, font-display swap, lazy loading

---

## Project Structure

```
RX_dev/
├── index.html              — Home page
├── about.html              — About page
├── services.html           — Services page
├── projects.html           — Portfolio/Projects page
├── contact.html            — Contact page
│
├── assets/
│   ├── css/
│   │   ├── fonts.css               — @font-face declarations for FiraGO
│   │   ├── global.css              — Design tokens, reset, utilities
│   │   ├── components.css          — Header, footer, cards, UI components
│   │   └── pages/
│   │       ├── home.css            — Home page specific styles
│   │       ├── about.css           — About page styles
│   │       ├── services.css        — Services page styles
│   │       ├── projects.css        — Projects page styles
│   │       └── contact.css         — Contact page styles
│   │
│   ├── fonts/
│   │   └── FiraGO_OTF_1001/        — FiraGO font family (Latin + Georgian)
│   │       ├── Roman/              — Regular, Medium, SemiBold, Bold, ExtraBold
│   │       └── Italic/             — Italic variants
│   │
│   ├── js/
│   │   ├── main.js                 — App initialization, theme, loading
│   │   │
│   │   ├── components/
│   │   │   ├── header.js           — Header component with navigation
│   │   │   └── footer.js           — Footer component
│   │   │
│   │   ├── i18n/
│   │   │   ├── i18n.js             — Internationalization engine
│   │   │   ├── en.json             — English translations
│   │   │   └── ge.json             — Georgian (ქართული) translations
│   │   │
│   │   └── pages/
│   │       ├── home.js             — Home page interactions
│   │       ├── projects.js         — Projects filtering
│   │       └── contact.js          — Contact form handling
│   │
│   └── images/
│       ├── hero/                   — Hero section images
│       ├── projects/               — Project portfolio photos
│       ├── services/               — Service section images
│       └── favicon.svg             — Site favicon
│
└── README.md                       — This file
```

---

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Typography**: FiraGO (Georgian + Latin support)
- **Icons**: Inline SVG
- **Internationalization**: Custom JSON-based i18n system
- **Hosting**: GitHub Pages
- **Domain**: rx.com.ge (DNS configured)

---

## Installation & Local Development

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/RX_dev.git
cd RX_dev
```

### 2. Run locally
Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

### 3. No build process required
This is a static site with no dependencies or build tools needed.

---

## Customization Guide

### Change Branding
- **Logo**: Edit `assets/js/components/header.js` (lines 34-36)
- **Company Name**: Update `assets/js/i18n/en.json` and `ge.json` → `common.companyName`

### Update Colors
Edit CSS variables in `assets/css/global.css`:
```css
:root {
  --color-accent: #c8a96e;  /* Warm gold accent */
  --color-bg: #f5f0e8;      /* Cream background */
  --color-text: #1a1814;    /* Charcoal text */
}
```

### Add Projects
Edit `projects.html` and add project cards to the grid.

### Update Contact Info
- **Phone/Email**: Edit `assets/js/i18n/en.json` and `ge.json` → `common` section
- **Contact Form**: Configure form handling in `assets/js/pages/contact.js`

### Translate Content
Add Georgian translations to `assets/js/i18n/ge.json` following the same structure as `en.json`.

---

## Language Support

### Supported Languages
- **EN** — English (default)
- **GE** — Georgian (ქართული)

### Adding Translations
1. Open `assets/js/i18n/ge.json`
2. Add translations following the same JSON structure as `en.json`
3. Use Georgian text for all values
4. The FiraGO font automatically renders Georgian characters beautifully

### Language Switching
Users can switch languages using the toggle in the header (desktop) or mobile menu.

---

## Deployment to GitHub Pages

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Set **Source** to `main` branch, `/ (root)` folder
3. Click **Save**
4. Your site will be live at `https://yourusername.github.io/RX_dev/`

### 3. Custom Domain (rx.com.ge)

#### GitHub Configuration:
1. Go to **Settings** → **Pages** → **Custom domain**
2. Enter: `rx.com.ge`
3. Check **Enforce HTTPS**
4. Save

#### DNS Configuration at your domain registrar:
Add these DNS records for `rx.com.ge`:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     yourusername.github.io
```

**Note**: Replace `yourusername` with your actual GitHub username.

#### Verify DNS:
```bash
dig rx.com.ge +noall +answer
```

Allow 24-48 hours for DNS propagation.

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

---

## Performance Optimizations

- **Font Loading**: `font-display: swap` prevents blocking
- **Image Optimization**: Lazy loading on images
- **CSS**: Minimal, scoped styles
- **JavaScript**: Vanilla JS, no heavy frameworks
- **Caching**: Static assets cached by browser

---

## File Sizes

| Asset Type | Approx Size |
|------------|-------------|
| HTML (each page) | 5-15 KB |
| CSS (total) | ~40 KB |
| JavaScript (total) | ~15 KB |
| FiraGO Fonts | ~300 KB (6 weights) |
| Images | Varies (optimize before upload) |

**Total Page Weight**: ~400-600 KB (first load with fonts)

---

## License

© 2025 RX Renovation. All rights reserved.

---

## Contact

**RX Renovation**
📍 Tbilisi, Georgia
📞 +995 (555) 555 555
✉️ hello@rx.com.ge
🌐 [rx.com.ge](https://rx.com.ge)

---

## Development Notes

- Built with modern web standards (ES6+, CSS Grid, Flexbox)
- No dependencies or build tools required
- Component-based architecture for easy maintenance
- Fully responsive and accessible
- Optimized for GitHub Pages static hosting

**Last Updated**: February 2026
