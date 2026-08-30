# Kakinada Services Platform — Frontend (Phase 3)

## Setup
1. `npm install`
2. Make sure your backend is running at http://localhost:5000 (from Phase 2)
3. `npm run dev`
4. Open the URL shown (usually http://localhost:5173)

## What's built so far
- Home page with all 6 service category tiles (only Tailor is clickable — others show "Coming soon")
- Signup page (customer or professional)
- Login page
- Tailor category page — browses live tailor listings from your backend
- Book a Tailor Slot form — creates a real lead in your database (requires login)

## How it connects to your backend
`src/api/client.js` talks to `http://localhost:5000/api`. Every logged-in request 
automatically includes your auth token.

## Try it end-to-end
1. Sign up as a professional, category "tailor" — then use Postman (Phase 2) 
   to POST a professional listing for that account (frontend for professionals 
   to self-list isn't built yet — that's a good next step!)
2. Sign up as a customer on the website
3. Go to Tailor Services → see the listing → Book a Tailor Slot
4. Check Postman (GET /api/leads, as admin) or MongoDB Compass to see the booking saved

## Next steps (Phase 4)
- Add Razorpay payment step before the booking is confirmed
- Then Phase 5: repeat this pattern for the other categories
