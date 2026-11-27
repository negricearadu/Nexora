import cors from "cors";
import express from "express";
import endpointsRouter from "./routes/endpoints.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
}));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/endpoints", endpointsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta nu există" });
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) {
    next(error);
    return;
  }

  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 600
    ? error.status
    : 500;
  const message = error.type === "entity.parse.failed"
    ? "Corpul cererii trebuie să conțină JSON valid"
    : status === 500
      ? "Eroare internă"
      : error.message;

  res.status(status).json({ error: message });
});

export default app;
