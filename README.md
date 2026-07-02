# SCT_WD_1 — Orbiton AI Landing Page

Web Development Internship (Task 01) — a fully responsive AI startup landing page built with vanilla HTML, CSS &amp; JavaScript

A premium, modern, fully responsive landing page for a fictional AI SaaS startup, **Orbiton AI**. Built from scratch with HTML5, CSS3, and Vanilla JavaScript — no frameworks, no libraries.

> **Project:** Web Development Internship — Task 01
> **Live Preview:** open `index.html` in any modern browser

---

## 🚀 Features

- **Dark, glassmorphism SaaS design** — deep navy background, purple/blue gradients, frosted-glass surfaces
- **Fixed navbar** — transparent on load, morphs into a blurred glass panel on scroll, with scroll-spy active-link highlighting
- **Fully responsive** — breakpoints for desktop, tablet, and mobile, with a slide-in mobile menu
- **Scroll-reveal animations** — sections fade up into view via `IntersectionObserver`
- **Animated statistics counters** — numbers count up when scrolled into view
- **Interactive pricing toggle** — switch between monthly / yearly pricing
- **FAQ accordion** — single-open accordion with smooth expand/collapse
- **Button ripple effect** — Material-style click ripple on all CTA buttons
- **Floating hero illustration** — animated AI orb with orbiting rings and floating info cards
- **Working contact form** — validated client-side and connected to Formspree, so messages are emailed directly
- **Back-to-top button**, animated preloader, and a footer newsletter field

---

## 📁 Folder Structure

```
SCT_WD_1/
├── index.html      # All markup, semantic HTML5
├── style.css       # All styling — variables, layout, animations, responsive rules
└── script.js       # All interactivity — navbar, animations, forms, counters, etc.
```

Three files, no build tools, no dependencies.

---

## 🧩 Sections Included

1. Hero (heading, subtitle, dual CTA, AI illustration)
2. Trusted Companies
3. Features (6 cards)
4. Services (3 alternating rows)
5. Why Choose Us
6. Statistics Counter
7. Pricing (monthly/yearly toggle)
8. Testimonials
9. FAQ (accordion)
10. Contact Form
11. Footer (with newsletter signup)

---

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Background | `#0F172A` |
| Card Background | `#1E293B` |
| Primary Blue | `#3B82F6` |
| Purple | `#8B5CF6` |
| Text (Primary) | `#FFFFFF` |
| Text (Secondary) | `#CBD5E1` |
| Font | [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts) |
| Icons | [Font Awesome 6](https://fontawesome.com/) |

All colors and spacing values are defined as CSS custom properties (`:root` variables) at the top of `style.css`, making the entire theme easy to re-skin.

---

## 🛠️ Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, Grid & Flexbox, no framework (no Bootstrap/Tailwind)
- **Vanilla JavaScript (ES6+)** — no libraries, no React
- **Font Awesome** — icon library (via CDN)
- **Google Fonts** — Poppins typeface (via CDN)

---

## ▶️ How to Run

No build tools or dependencies required.

1. Download or clone this repo
2. Keep `index.html`, `style.css`, and `script.js` in the same folder
3. Open `index.html` directly in your browser

> Note: Font Awesome icons, Google Fonts, and the contact form (Formspree) all load via network requests, so an internet connection is needed for the page to look and work correctly.

---

## 📌 Notes

- Testimonial and avatar images currently use `pravatar.cc` placeholder URLs.
- The contact form is connected to [Formspree](https://formspree.io) — submissions are emailed directly, no custom backend required.
- Accessibility basics included: visible focus states, `aria-label`s on icon-only buttons, and `prefers-reduced-motion` support.

---

## 👤 Author

Built as part of a Web Development Internship — Task 01.
