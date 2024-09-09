import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import connectToDatabase from './config/dbConfig.js';
import UserRoutes from './routes/user.routes.js';




dotenv.config();

const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/user', UserRoutes);



app.use("*", (req, res) => {
    res.status(400).send('Page not found!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Server running on port ${PORT}`);
});

export default app;