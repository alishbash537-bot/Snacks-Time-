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

  // API Route for Gemini cravings advice
  app.post("/api/cravings", async (req, res) => {
    try {
      const { mood, intensity, profile, time } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured. Please add it to your secrets." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `I am looking for a custom culinary recommendation at ${time || 'late night'}.
My current emotional/spiritual state is: "${mood || 'restless'}"
My appetite level is: "${intensity || 'a light bite'}"
My desired flavor direction is: "${profile || 'Surprise Me'}"`,
        config: {
          systemInstruction: "You are the Resident Alchemist & Master Chef of Snacks Time, an ultra-exclusive, late-night culinary sanctuary. Your tone is mysterious, sophisticated, indulgent, poetic, and intimate. You analyze the diner's spiritual and physical state at this hour and generate a bespoke, highly creative culinary prescription. You MUST return your response in JSON format. Do not use markdown backticks in the response string, return raw JSON.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              dishName: {
                type: Type.STRING,
                description: "A highly creative, poetic, luxury late-night culinary dish name."
              },
              poeticStory: {
                type: Type.STRING,
                description: "An evocative, beautiful 2-3 sentence paragraph explaining why this dish perfectly matches their exact spiritual state."
              },
              pairingElixir: {
                type: Type.STRING,
                description: "A custom curated late-night cocktail or non-alcoholic elixir that elevates this experience."
              },
              musicPairing: {
                type: Type.STRING,
                description: "A very specific, atmospheric music recommendation (e.g., 'Chet Baker playing silently in a rain-slicked alleyway on vinyl')."
              },
              ritualNote: {
                type: Type.STRING,
                description: "A single, intimate dining ritual for enjoying this dish (e.g., 'Close your eyes for 5 seconds, let the fragrance of burnt rosemary wash over you before your first taste')."
              },
              metadataStats: {
                type: Type.OBJECT,
                properties: {
                  calorieEstimate: { type: Type.STRING },
                  sensoryKeywords: { type: Type.STRING, description: "3-4 comma separated sensory descriptors, e.g. 'Charred, Velvet, Sombre, Intimate'." }
                },
                required: ["calorieEstimate", "sensoryKeywords"]
              }
            },
            required: ["dishName", "poeticStory", "pairingElixir", "musicPairing", "ritualNote", "metadataStats"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Empty response received from Gemini.");
      }

      // Try to parse the JSON string
      const parsedData = JSON.parse(text);
      res.json(parsedData);
    } catch (error: any) {
      console.error("Gemini cravings error:", error);
      res.status(500).json({ 
        error: error.message || "An unexpected error occurred during your late-night pairing consultation." 
      });
    }
  });

  // Serve static files / Vite dev middleware
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
