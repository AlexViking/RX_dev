# RX Renovation

A modern renovation company website hosted on GitHub Pages.

## Structure

```
RX/
├── index.html          — Home page
├── about.html          — About page
├── services.html       — Services page
├── projects.html       — Portfolio/Projects page
├── contact.html        — Contact page
├── assets/
│   ├── css/
│   │   ├── global.css          — Design tokens, reset, utilities
│   │   ├── components.css      — Header, footer, cards, UI components
│   │   └── pages/
│   │       ├── home.css
│   │       ├── about.css
│   │       ├── services.css
│   │       ├── projects.css
│   │       └── contact.css
│   ├── js/
│   │   ├── main.js             — Header/footer injection, scroll reveal
│   │   ├── components/
│   │   │   ├── header.js
│   │   │   └── footer.js
│   │   └── pages/
│   │       ├── home.js
│   │       ├── projects.js
│   │       └── contact.js
│   └── images/
│       ├── hero/               — Hero and feature images
│       ├── projects/           — Project portfolio photos
│       └── services/           — Service section photos
```

## Customization

- **Logo / Brand**: Update `assets/js/components/header.js` and `footer.js`
- **Colors**: Edit CSS variables in `assets/css/global.css` under `:root`
- **Projects**: Edit `projects.html` to add/remove project cards
- **Contact info**: Update phone/email in `header.js`, `footer.js`, and `contact.html`
- **Images**: Replace placeholder images in `assets/images/` with real photos

## GitHub Pages

Set source to `/ (root)` branch `main` in repository Settings → Pages.
