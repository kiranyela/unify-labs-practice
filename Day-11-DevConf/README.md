# DevConf 2026 - Tech Conference Website

**Project Status**: Completed (Day 5)

This repository contains the full source code for the DevConf 2026 conference website. It demonstrates a progression from basic HTML to a professional, responsive, and animated web application.

## 🚀 Features

### 1. Structure & Semantics
- Semantic HTML5 (`header`, `nav`, `main`, `article`)
- Proper document outline and consistent file organization

### 2. Advanced Layouts
- **CSS Grid**: Responsive "Keynote Speakers" section using `minmax()` and `auto-fit`.
- **Flexbox**: Navigation bar that adapts from row (desktop) to column (mobile).
- **Sticky Header**: Stays fixed with a modern `backdrop-filter` glass effect.

### 3. Visual Polish
- **Animations**: `fadeInUp` entrance animations for hero content.
- **Interactions**: Smooth hover effects on cards (`scale`), buttons (`translateY`), and links.
- **Design System**: Consistent typography (Inter/Roboto) and color palette (Slate/Sky Blue) using CSS variables.

### 4. Forms & Data
- Complex registration form with validation.
- Responsive data tables for schedules.

## 📱 Responsive Design
The site is fully responsive across devices:
- **Desktop**: Multi-column layouts, horizontal nav.
- **Tablet**: Adjusted padding and grid gaps.
- **Mobile**: Stacked layouts, centered text, scrollable tables.

## 🛠️ Tech Stack
- HTML5
- CSS3 (Variables, Grid, Flexbox, Animations)
- Zero JavaScript dependencies (Pure CSS focus)

## 📂 Directory Structure
- `index.html`: Home page
- `pages/`: Sub-pages (About, Speakers, Schedule, etc.)
- `css/`: `styles.css` (250+ lines of polished CSS)
- `assets/`: Images and multimedia
