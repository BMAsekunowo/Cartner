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
• createCart with automatic totalPrice calculation based on product data
• getCartByUserId automated with token decoding (no manual userId required)
• updateCart and deleteCart implemented and tested using cartId
✅ Session schema redesigned to include:
• type, name, createdBy, sessionCode, passcode, invitedUsers
✅ Session controller fully implemented:
• createSession: Auto-generates cart and stores creator as session/cart owner
• inviteUser: Invites by email, syncs cart & session roles automatically
• joinSessionByCode: Handles join requests with optional passcode
• approveJoinRequest, rejectJoinRequest: Creator handles requests with role assignment
✅ All routes and logic now use decoded userId from JWT — fully automated
✅ Manual sessionId and cartId entry deprecated in favor of automation
✅ Fully tested: products, carts, session creation, joining, and request management
✅ Clean and modern backend logic; ready for frontend phase

//All fully Tested by self and operational – Cleared for Frontend Phase on the 21st of May 2025

===WEEK 4: Frontend Week 1 Summary: Frontend UI Architecture & Core Pages (Completed) ===

✅ Project scaffolded and environment initialized with modular folder structure (Vite + CSS)
✅ Reusable NavBar and Footer components built and styled for consistent sitewide use
✅ Landing UI designed and implemented:
✅ Hero, Features, Testimonials, Call-to-Action sections
✅ Sign In & Register UIs fully designed and connected to backend authentication
✅ Explore Marketplace (Products Page) created with styled product cards (currently static)
✅ Sessions Page UI implemented for collaborative shopping structure (static)
✅ Cart Page UI fully developed:
✅ CartTable component with responsive layout, image, name, quantity, price
✅ Quantity adjusters styled with proper alignment
✅ OrderSummary component showing subtotal, 13% tax, and total
✅ Placeholder Home Page added to simulate post-login landing flow
✅ Connected to server-side authentication:
✅ Sign In and Register forms functional via backend API
✅ JWT token storage and access confirmed
✅ Responsiveness applied across all components using media queries:
✅ Tablet (≤1024px), Mobile (≤768px), Extra Small (≤480px)
✅ All UI pages and elements visually validated on multiple screen sizes
✅ Currently using static product/session data pending dynamic integration in Week 2

// All components tested and responsive – Cleared for Frontend Week 2 (Session Flows, Product Detail, and Dynamic Data) on the 27th of June 2025

=== WEEK 5: Frontend Week 2 Summary: Session Flows, Profile Pages & Cart Logic (Completed) ===

✅ Profile Page UI completed:
 • Displays user avatar, name, email, location, language, and occupation
 • Components styled with consistent layout and mobile responsiveness
 • Editable field placeholders prepared for backend integration

✅ Product Details Page (/product/:id) built:
 • Renders image, title, price, description, and static reviews
 • Includes “Add to Cart” button with logic wired to backend
 • Responsive layout for all screen sizes

✅ Session View Page (/session/:id) implemented:
 • Shows session name, participant avatars, and joined cart summary
 • Join and Leave logic stubbed (mocked for now)
 • Designed for real-time upgrade in Week 3

✅ Cart Page logic completed:
 • Dynamically displays user cart items
 • Supports quantity increase/decrease and item removal
 • Recalculates total and tax automatically
 • Responsive CartTable UI and order summary integrated
 • Delete column with styled trash icon added and functional

✅ Cart Badge added to Navbar:
 • Updates item count in real time on add/remove
 • Linked directly to cart page

✅ Create Session Page (/create-session) developed:
 • Form captures session name, type, and optional passcode
 • On submit, triggers session creation API and navigates to lobby

✅ Session Lobby Page (/session-lobby/:sessionId) built:
 • Displays session overview with participants and cart
 • Prepares ground for real-time updates in Week 3

✅ Backend Integration completed:
 • Fetch products and individual product details
 • Add/remove/update items in cart
 • Create new sessions
 • (Optional) Profile fetch logic prepared for live data

✅ Testing and Mobile Polish:
 • All routes verified and UI validated
 • Thorough cart testing completed
 • Mobile responsiveness applied across components
 • Ready for real-time flows and interactive upgrades

// All session, profile, and cart flows are complete – Cleared for Frontend Week 3 (Real-Time Interactions, Session Invites, and Live Syncing) starting 20th July 2025.


=== WEEK 6: Frontend Week 3 Summary: Real-Time Sessions, Sync Logic & Session Join Flow (Completed) ===

✅ Join Session by Code UI implemented:
 • New form added to SessionActions for joining a session
 • Fields: Session Code & Passcode with basic validation
 • On submit, triggers backend joinSession API and redirects to /session/:id
 • Integrated into existing session UI cleanly

✅ Invited Sessions Display Built:
 • Displays all sessions user was invited to, along with inviter details
 • Included as third block in SessionActions under the join form
 • Styled consistently with scroll-safe responsive layout

✅ Session Sync Context Created:
 • New independent context file added to manage live session data
 • Set up groundwork for polling, socket, or interval sync
 • Clean separation from existing SessionContext (which tracks current session only)
 • Ready for real-time updates, cart sync, and live participant view

✅ Cart Page Enhancements:
 • Each cart now shows:
  - Who added each product
  - When it was added (timestamp)
 • Added .product-meta line under product name in CartTable
 • CartTable updated to display delete icon and maintain mobile responsiveness

✅ Expanded Cart Interactions:
 • Delete Cart button added to cart header
 • Clear Cart button added inside each expanded cart
 • Both trigger backend endpoints and refresh the UI accordingly
 • Deletion safeguarded with confirmation logic (stubbed for now)

✅ Session Code + Passcode validation tested:
 • Proper backend connection verified
 • Handles invalid codes and error messages
 • Smooth transition to session view on successful join

✅ Mobile Responsiveness and UI Polish:
 • All new components (join form, invite list, cart enhancements) made responsive
 • Cross-device testing done (Tablet, Mobile, Extra Small)
 • Maintained visual consistency with Cartner’s design system

✅ Preparations for Live Data in Sessions:
 • Sync context isolated for flexibility (polling or WebSocket ready)
 • /session/:id now structured to receive and display dynamic participant/cart updates
 • Set the stage for full real-time shopping experience in Week 4

// Real-time foundations are solid – Cleared for Frontend Week 4 (Profile Upgrades, Session History, Order Confirmation, Notifications, and Endpoint Integration) starting 23rd July 2025.
