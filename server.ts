import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client safely and lazily
  let aiClient: GoogleGenAI | null = null;
  function getAi() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is missing.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // Health API endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // AI Generator API endpoint
  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt is required." });
      }

      const ai = getAi();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Please generate a single, high-fidelity, beautiful self-contained React component matching this user request: "${prompt}".
        
Requirements:
1. Complete self-contained React component code.
2. Beautiful professional modern design. Use high-contrast color themes (e.g. dark cosmic, sleek slate, warm amber, vibrant violet). Use generous padding, smooth transitions, custom borders, and glassmorphism where appropriate.
3. Use SVG icons inline and styled with Tailwind CSS (e.g. <svg className="w-5 h-5 text-indigo-400" ...>) or standard icons to avoid package dependency errors.
4. The component must be fully interactive! Add local state logic so list items can be added/removed, toggle switches change states, audio players animate speaker/waves, speech triggers visual indicators, etc.
5. All imports MUST be valid standard packages (e.g. React hooks as 'useState, useEffect, List' or similar). Do NOT use any external uninstalled packages.
6. Absolute ban: Do NOT include any code or explanations relating to VMs, backend databases, servers, containers, sandboxes, routing nodes, or admin interfaces. It must contain only the user-facing functional app or visual dashboard requested.
7. Return a valid JSON response containing 'appName' (a short name under 24 chars), 'explanation' (a 2-sentence non-technical highlight), and 'code' (the exact TSX/JSX of the component).`,
        config: {
          systemInstruction: `You are an automated premium React builder engine. You specialize in outputting pristine, gorgeous, fully interactive UI components in JSON format. Do not write markdown blocks before or after the JSON response. Do not include any backend or database setups.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              appName: { type: Type.STRING },
              explanation: { type: Type.STRING },
              code: { type: Type.STRING }
            },
            required: ["appName", "explanation", "code"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("No response received from the AI engine.");
      }

      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (error: any) {
      console.error("AI Generation Error:", error);
      res.status(500).json({ 
        error: error?.message || "Internal server error occurred during compilation." 
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
