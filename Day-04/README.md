# DevConf 2026 - Tech Conference Website (Day 4: Advanced Layout)

This project enhances the DevConf website with professional, responsive layouts using CSS Flexbox and Grid. It focuses on sophisticated visual hierarchy and interaction design.

## Key Updates
- **Responsive Navigation**: Sticky header with Flexbox alignment (`justify-content: space-between`).
- **Speaker Grid**: Uses `display: grid` with `repeat(auto-fit, minmax(280px, 1fr))` to create a responsive card layout that adapts to any screen size without media queries.
- **Visual Depth**: Implemented a comprehensive shadow system (`--shadow-sm`, `--shadow-md`, `--shadow-lg`) to create elevation and lift-on-hover effects.
- **CSS Variables**: Consolidated colors, spacing, and shadows into `:root` for consistent theming.
- **Hero Section**: Enhanced with a gradient overlay on the background image for better text contrast.

## Verification
1.  **Resize Browser**: Watch the speaker grid columns adjust automatically from 4 to 3 to 2 to 1.
2.  **Scroll**: Observe the navigation bar sticking to the top with a blur effect.
3.  **Hover**: Hover over speaker cards and buttons to see the smooth elevation animation.

## Project Structure
- `css/styles.css`: Contains all advanced layout rules.
- `index.html` and `pages/*`: Updated to utilize the new classes.
