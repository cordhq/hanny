# Hanni Beauty Palace - Offline Editable Website

This is a fully offline-editable version. No build step, no npm.

## How to run
Just double-click `index.html` or open it in any browser. Works offline except Google Fonts and Google Maps iframe (maps need internet).

## How to edit
- **Text / Prices:** Open `index.html` in VS Code, Notepad, etc. Search for product names.
- **Products:** Edit `script.js` → `PRODUCTS` array. Each product has `image` field pointing to `images/...`
- **Images:** Replace files in `/images/` folder. Keep same filenames or update `script.js` PRODUCT_IMAGES.
- **Colors:** Open `style.css` → `:root` variables --aubergine, --fuchsia, etc.
- **Bank accounts:** Edit in `index.html` section #policy.
- **Map location:** Edit iframe src in #visit section and the Google Maps links.

## Structure
- index.html — all sections: hero, services, shop, promo, policy, visit with map, FAQ, showcase, newsletter, footer
- style.css — all styling
- script.js — cart, wishlist, search, filters, FAQ accordion, map, WhatsApp checkout
- images/ — all product photos, salon, flyer

## Make it live
Upload entire folder to any static host: Netlify, Vercel, GitHub Pages, cPanel file manager.

## WhatsApp
Orders and bookings go to 07038563822 via wa.me link. Change WHATSAPP_NUMBER in script.js.

Enjoy!
