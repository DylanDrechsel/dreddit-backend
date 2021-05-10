import prisma from '@prisma/client';
import express from 'express'
import cors from 'cors'
import userRoutes from './controllers/users.js';
import authRequired from './middleware/authRequired.js';
import { register, login, logout } from './controllers/auth.js';

const db = new prisma.PrismaClient({
	log: ['info', 'warn'],
	errorFormat: 'pretty',
});

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Controller(s)
app.use('/users', authRequired, userRoutes);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);

app.get('/', (req, res) => {
	res.send('Welcome to SQL');
});

app.listen(port, () => {
	console.log(`listening on ${port}`);
});
