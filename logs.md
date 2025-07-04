=== Week 1 Summary: Project Initialization & Backend Foundation (Completed ahead of schedule) ===

✅ Project folder structure created (client/server)
✅ Git initialized and connected to remote repository
✅ React app scaffolded via Vite
✅ Express server configured with port/environment setup
✅ MongoDB cluster and database configured (Cartner)
✅ Mongoose connected using clean config/db.js
✅ MVC architecture established:
   - /routes
   - /controllers
   - /models
   - /middleware
   - /config
✅ Base health-check route added and migrated to system.js
✅ General cleanup of server.js (only handles mounting and startup)
✅ All project folders validated for modular scalability
✅ Verified connection to MongoDB after network change (IP whitelisting updated)
✅ .env configured with PORT, MONGO_URI, JWT_SECRET placeholders

//All fully Tested by self and operational -- Cleared for phase 2 on the 14th of May 2025


=== Week 2 Summary: Authentication System & Token Lifecycle Management (Completed as planned) ===

✅ Auth routes and controllers created (auth.js, authController.js)
✅ registerUser() and loginUser() implemented with validation and hashing (bcryptjs)
✅ JWT token issued on login and attached to user object response
✅ Authentication middleware (authMiddleware.js) created using Bearer token format
✅ Protected routes tested using Postman with and without valid tokens
✅ Password hashing and token verification confirmed functional
✅ User model updated with timestamps and MongoDB connection verified
✅ Logout logic implemented on frontend using handleLogout() in utils/auth.js
✅ Token expiry strategy added (2-day lifespan) with auto-logout on expiration
✅ /validate-token endpoint added to support real-time session checks
✅ React App.jsx updated to auto-check token validity using useEffect()
✅ Server cleanup and route modularization completed
✅ Centralized error handler (errorHandler.js) added for consistency
✅ Controllers reviewed for try/catch and inline error responses
✅ All API endpoints tested manually via Postman (200, 400, 401 scenarios covered)
✅ Initial backend documentation started in API_DOC.md

//All fully Tested by self and operational – Cleared for phase 3 on the 15th of May 2025


=== Week 3 Summary: Backend Feature Completion & Core Business Logic (Completed) ===

✅ Product schema and controller created (createProduct, getAllProducts, getProductById, updateProduct, deleteProduct)
✅ Product routes mounted and protected using JWT auth middleware
✅ Cart schema updated to support session-linked users and roles (creator, participant)
✅ Cart controller logic completed:
	•	createCart with automatic totalPrice calculation based on product data
	•	getCartByUserId automated with token decoding (no manual userId required)
	•	updateCart and deleteCart implemented and tested using cartId
✅ Session schema redesigned to include:
	•	type, name, createdBy, sessionCode, passcode, invitedUsers
✅ Session controller fully implemented:
	•	createSession: Auto-generates cart and stores creator as session/cart owner
	•	inviteUser: Invites by email, syncs cart & session roles automatically
	•	joinSessionByCode: Handles join requests with optional passcode
	•	approveJoinRequest, rejectJoinRequest: Creator handles requests with role assignment
✅ All routes and logic now use decoded userId from JWT — fully automated
✅ Manual sessionId and cartId entry deprecated in favor of automation
✅ Fully tested: products, carts, session creation, joining, and request management
✅ Clean and modern backend logic; ready for frontend phase

//All fully Tested by self and operational – Cleared for Frontend Phase on the 21st of May 2025



===WEEK 4: Frontend Week 1 Summary: Frontend UI Architecture & Core Pages (Completed) ===

✅ Project scaffolded and environment initialized with modular folder structure (Vite + CSS)
✅ Reusable NavBar and Footer components built and styled for consistent sitewide use
✅ Landing UI designed and implemented:
 • Hero, Features, Testimonials, Call-to-Action sections
✅ Sign In & Register UIs fully designed and connected to backend authentication
✅ Explore Marketplace (Products Page) created with styled product cards (currently static)
✅ Sessions Page UI implemented for collaborative shopping structure (static)
✅ Cart Page UI fully developed:
 • CartTable component with responsive layout, image, name, quantity, price
 • Quantity adjusters styled with proper alignment
 • OrderSummary component showing subtotal, 13% tax, and total
✅ Placeholder Home Page added to simulate post-login landing flow
✅ Connected to server-side authentication:
 • Sign In and Register forms functional via backend API
 • JWT token storage and access confirmed
✅ Responsiveness applied across all components using media queries:
 • Tablet (≤1024px), Mobile (≤768px), Extra Small (≤480px)
✅ All UI pages and elements visually validated on multiple screen sizes
✅ Currently using static product/session data pending dynamic integration in Week 2

// All components tested and responsive – Cleared for Frontend Week 2 (Session Flows, Product Detail, and Dynamic Data) on the 27th of June 2025