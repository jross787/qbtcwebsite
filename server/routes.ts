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

  const httpServer = createServer(app);
  return httpServer;
}
