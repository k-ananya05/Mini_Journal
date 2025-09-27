// server.js
import 'dotenv/config';  // automatically loads .env

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ensure pdfs folder exists
const pdfDir = path.join(process.cwd(), "pdfs");
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

// Simple in-memory store
const STORE = new Map();

// Serve PDFs as static files
app.use("/pdfs", express.static(pdfDir));

// Create entry -> returns id and pdfUrl
app.post("/entries", (req, res) => {
  const { title = "", notes = "" } = req.body;
  const id = uuidv4();
  const createdAt = new Date().toISOString();
  const entry = { id, title, notes, createdAt };
  STORE.set(id, entry);

  // Create PDF
  const pdfName = `entry-${id}.pdf`;
  const pdfPath = path.join(pdfDir, pdfName);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));

  doc.fontSize(20).text("Entry Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`ID: ${id}`);
  doc.text(`Created: ${createdAt}`);
  doc.moveDown();
  doc.fontSize(16).text(`Title: ${title}`);
  doc.moveDown();
  doc.fontSize(12).text(notes);
  doc.end();

  // Return PDF URL
  const base = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  const port = process.env.PORT || 3000;

  const pdfUrl = `${base}/pdfs/${pdfName}`;
  res.json({ id, pdfUrl });
});

// Optionally: get entry data
app.get("/entries/:id", (req, res) => {
  const entry = STORE.get(req.params.id);
  if (!entry) return res.status(404).send("Entry not found");
  res.json(entry);
});

app.listen(3000, () => console.log("Server listening on http://localhost:3000"));
