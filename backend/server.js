import express from "express";
import cors from "cors"; 
import 'dotenv/config.js'
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = 3000;
//const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/food", foodRouter)
app.use('/uploads', express.static('./uploads'));
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
//app.use("/uploads", express.static("uploads"));
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
//mongodb+srv://parveetkaur02:heCus1NA1cIGogcU@cluster0.mh0wd24.mongodb.net/?