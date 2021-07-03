import prisma from '@prisma/client';
import express from 'express';
import cors from 'cors';
import userRoutes from './controllers/users.js';
import postRoutes from './controllers/posts.js';
import commentRoutes from './controllers/comments.js';
import likeRoutes from './controllers/likes.js';
import profileRoutes from './controllers/profile.js';
import authRequired from './middleware/authRequired.js';
import { register, login, logout } from './controllers/auth.js';
import multer from 'multer';
import cookieParser from 'cookie-parser'
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const db = new prisma.PrismaClient({
	log: ['info', 'warn'],
	errorFormat: 'pretty',
});

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser())

// Controller(s)
app.use('/users', authRequired, userRoutes);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/posts', authRequired, postRoutes);
app.use('/comments', authRequired, commentRoutes);
app.use('/likes', authRequired, likeRoutes);
app.use('/profile', authRequired, profileRoutes);

// Remove auth required so "img src" would return the image
app.get('/image/:filename', /* authRequired, */ async (req, res) => {
	const { filename } = req.params;
	const dirname = path.resolve();
	const fullfilepath = path.join(dirname, 'image/' + filename);
	return res.sendFile(fullfilepath);
});

app.get('/', (req, res) => {
	res.send('Welcome to SQL');
});

app.listen(process.env.PORT || port, () => {
	console.log(`listening on ${port}`);
});
