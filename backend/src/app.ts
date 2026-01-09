import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

export default app;
