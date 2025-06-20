import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // In a real application, you might want to:
      // - Send an email notification
      // - Add to a CRM system
      // - Send an auto-reply email
      
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

  // Get all contact submissions (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contacts" 
      });
    }
  });

  // Newsletter subscription endpoint (placeholder for future Mailchimp integration)
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: "Valid email address is required" 
        });
      }

      // TODO: Integrate with Mailchimp API
      // const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
      // const listId = process.env.MAILCHIMP_LIST_ID;
      
      // For now, just store in our system
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

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    });
  });

  // Blog posts endpoint (serving static data for now)
  app.get("/api/blog", (req, res) => {
    // In a real application, this would fetch from a database
    // For now, the blog data is served from the frontend
    res.json({ 
      success: true, 
      message: "Blog data is served from frontend" 
    });
  });

  // Quantum security check endpoint
  app.post("/api/quantum-check", async (req, res) => {
    try {
      const { userAgent } = req.body;
      
      // Detect browser capabilities based on user agent
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

      const isQuantumSecure = supportedMethods.some(m => m.supported);

      res.json({
        supportedMethods,
        isQuantumSecure,
        browserInfo,
        detectedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Quantum check error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to check quantum security capabilities" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function analyzeBrowserCapabilities(userAgent: string) {
  const ua = userAgent.toLowerCase();
  const isChrome = ua.includes('chrome') && !ua.includes('edg');
  const isFirefox = ua.includes('firefox');
  const isSafari = ua.includes('safari') && !ua.includes('chrome');
  const isEdge = ua.includes('edg');
  
  // Extract version numbers
  const chromeVersion = isChrome ? parseInt(ua.match(/chrome\/(\d+)/)?.[1] || '0') : 0;
  const firefoxVersion = isFirefox ? parseInt(ua.match(/firefox\/(\d+)/)?.[1] || '0') : 0;
  const safariVersion = isSafari ? parseInt(ua.match(/version\/(\d+)/)?.[1] || '0') : 0;
  const edgeVersion = isEdge ? parseInt(ua.match(/edg\/(\d+)/)?.[1] || '0') : 0;
  
  return {
    browser: isChrome ? 'Chrome' : isFirefox ? 'Firefox' : isSafari ? 'Safari' : isEdge ? 'Edge' : 'Unknown',
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

function checkMethodSupport(method: string, browserInfo: any): boolean {
  const { chromeVersion, firefoxVersion, safariVersion, edgeVersion } = browserInfo;
  
  // Based on real-world browser support for post-quantum cryptography
  switch (method) {
    case 'X25519MLKEM768':
      return chromeVersion >= 116 || firefoxVersion >= 118 || safariVersion >= 17 || edgeVersion >= 116;
    case 'secp256r1MLKEM768':
      return chromeVersion >= 118 || firefoxVersion >= 119 || edgeVersion >= 118;
    case 'MLKEM512':
      return chromeVersion >= 120 || firefoxVersion >= 121 || edgeVersion >= 120;
    case 'MLKEM768':
      return chromeVersion >= 119 || firefoxVersion >= 120 || edgeVersion >= 119;
    case 'MLKEM1024':
      return chromeVersion >= 121 || firefoxVersion >= 122 || edgeVersion >= 121;
    default:
      return false;
  }
}
