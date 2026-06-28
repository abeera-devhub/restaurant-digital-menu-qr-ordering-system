// config/sessionConfig.js
// Configures express-session with MongoDB as the session store.
// Centralizes session settings — imported by server.js.

const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "default_secret_change_in_production",
  resave: false,               // Don't re-save session if not modified
  saveUninitialized: false,    // Don't create session for unauthenticated users
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions",
    ttl: 24 * 60 * 60,         // Sessions expire after 24 hours
    autoRemove: "native",       // Let MongoDB handle expired session cleanup
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
    httpOnly: true,              // Prevent client-side JS access to cookie
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "lax",
  },
  name: "bistro.sid",           // Custom cookie name (hides default express.sid)
};

module.exports = sessionConfig;