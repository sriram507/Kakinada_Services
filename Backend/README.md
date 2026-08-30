# Kakinada Services Platform — Backend (Phase 2)

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in:
   - `MONGODB_URI` — get this free from MongoDB Atlas (M0 free tier)
   - `JWT_SECRET` — any long random string
3. `node server.js`

## What's built so far
- **Models**: User, Professional, Lead, Payment (matches the schema we designed)
- **Auth**: signup/login with JWT (bcrypt-hashed passwords)
- **Professionals API**: list/browse (public), create listing (professional role only)
- **Leads API**: create a lead (customer), view own leads, admin queue to view/update all leads

## API endpoints
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/professionals?category=tailor
GET    /api/professionals/:id
POST   /api/professionals          (auth: professional)
POST   /api/leads                  (auth: customer)
GET    /api/leads/my               (auth: customer)
GET    /api/leads                  (auth: admin)
PATCH  /api/leads/:id              (auth: admin)

## Next steps (Phase 2 continued)
- Test every endpoint with Postman before touching the frontend
- Then move to Phase 3: React frontend for the Tailor category
