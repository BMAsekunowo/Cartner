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