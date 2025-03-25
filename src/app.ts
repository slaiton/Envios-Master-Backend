import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import loadDataRoute from "./routes/loadDataRoute";
import cityRoutes from "./routes/cityRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import driverRoutes from "./routes/driverRoutes";
import authMiddleware from "./middlewares/authMiddleware"; 


dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());


setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/order", authMiddleware ,orderRoutes);
app.use('/api', authMiddleware,loadDataRoute);
app.use('/api/cities', authMiddleware, cityRoutes);
app.use('/api/vehicles', authMiddleware, vehicleRoutes);
app.use('/api/drivers', authMiddleware, driverRoutes);

export default app;