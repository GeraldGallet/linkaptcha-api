import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { router } from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({ 
  origin: 'http://localhost:9000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true // Allow credentials
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

router(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
