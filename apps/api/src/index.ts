import cors from "cors";
import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ ok: true, service: "portfolio-api" });
});

app.listen(port, () => {
  console.log(`Portfolio API listening on http://localhost:${port}`);
});
