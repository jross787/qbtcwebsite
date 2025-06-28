// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  contacts;
  currentUserId;
  currentContactId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createContact(insertContact) {
    const id = this.currentContactId++;
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      isRead: false
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async getAllContacts() {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isRead: boolean("is_read").default(false).notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({
        success: true,
        message: "Contact form submitted successfully",
        id: contact.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({
        success: false,
        message: "Invalid form data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getAllContacts();
      res.json(contacts2);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch contacts"
      });
    }
  });
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Valid email address is required"
        });
      }
      await storage.createContact({
        name: "Newsletter Subscriber",
        email,
        subject: "Newsletter Subscription",
        message: "Newsletter subscription request"
      });
      res.json({
        success: true,
        message: "Successfully subscribed to newsletter"
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to subscribe to newsletter"
      });
    }
  });
  app2.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: "1.0.0"
    });
  });
  app2.get("/api/blog", (req, res) => {
    res.json({
      success: true,
      message: "Blog data is served from frontend"
    });
  });
  app2.post("/api/quantum-check", async (req, res) => {
    try {
      const { userAgent } = req.body;
      const browserInfo = analyzeBrowserCapabilities(userAgent);
      const quantumMethods = [
        { method: "X25519MLKEM768", description: "Hybrid X25519 with ML-KEM 768-bit" },
        { method: "secp256r1MLKEM768", description: "Hybrid secp256r1 with ML-KEM 768-bit" },
        { method: "MLKEM512", description: "ML-KEM 512-bit post-quantum" },
        { method: "MLKEM768", description: "ML-KEM 768-bit post-quantum" },
        { method: "MLKEM1024", description: "ML-KEM 1024-bit post-quantum" }
      ];
      const supportedMethods = quantumMethods.map(({ method, description }) => {
        const supported = checkMethodSupport(method, browserInfo);
        return { method, supported, description };
      });
      const isQuantumSecure = supportedMethods.some((m) => m.supported);
      res.json({
        supportedMethods,
        isQuantumSecure,
        browserInfo,
        detectedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Quantum check error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to check quantum security capabilities"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
function analyzeBrowserCapabilities(userAgent) {
  const ua = userAgent.toLowerCase();
  const isChrome = ua.includes("chrome") && !ua.includes("edg");
  const isFirefox = ua.includes("firefox");
  const isSafari = ua.includes("safari") && !ua.includes("chrome");
  const isEdge = ua.includes("edg");
  const chromeVersion = isChrome ? parseInt(ua.match(/chrome\/(\d+)/)?.[1] || "0") : 0;
  const firefoxVersion = isFirefox ? parseInt(ua.match(/firefox\/(\d+)/)?.[1] || "0") : 0;
  const safariVersion = isSafari ? parseInt(ua.match(/version\/(\d+)/)?.[1] || "0") : 0;
  const edgeVersion = isEdge ? parseInt(ua.match(/edg\/(\d+)/)?.[1] || "0") : 0;
  return {
    browser: isChrome ? "Chrome" : isFirefox ? "Firefox" : isSafari ? "Safari" : isEdge ? "Edge" : "Unknown",
    version: chromeVersion || firefoxVersion || safariVersion || edgeVersion || 0,
    isChrome,
    isFirefox,
    isSafari,
    isEdge,
    chromeVersion,
    firefoxVersion,
    safariVersion,
    edgeVersion
  };
}
function checkMethodSupport(method, browserInfo) {
  const { chromeVersion, firefoxVersion, safariVersion, edgeVersion } = browserInfo;
  switch (method) {
    case "X25519MLKEM768":
      return chromeVersion >= 116 || firefoxVersion >= 118 || safariVersion >= 17 || edgeVersion >= 116;
    case "secp256r1MLKEM768":
      return chromeVersion >= 118 || firefoxVersion >= 119 || edgeVersion >= 118;
    case "MLKEM512":
      return chromeVersion >= 120 || firefoxVersion >= 121 || edgeVersion >= 120;
    case "MLKEM768":
      return chromeVersion >= 119 || firefoxVersion >= 120 || edgeVersion >= 119;
    case "MLKEM1024":
      return chromeVersion >= 121 || firefoxVersion >= 122 || edgeVersion >= 121;
    default:
      return false;
  }
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = process.env.PORT ? parseInt(process.env.PORT) : 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
