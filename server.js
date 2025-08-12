import express from "express";
import cors from "cors";
import routeHandler from "./routes/router.js";
let port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_LINK, // Vite dev server
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.post("/send-email", routeHandler);
app.get("/", () => {
  console.log("Hi");
  //   console.log(req);
});
app.listen(port, () => {
  console.log("Backend is running");
});
