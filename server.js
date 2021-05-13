import prisma from '@prisma/client';
import express from 'express'
import cors from 'cors'
import userRoutes from './controllers/users.js';
import postRoutes from './controllers/posts.js';
import commentRoutes from './controllers/comments.js'
import likeRoutes from './controllers/likes.js'
import profileRoutes from './controllers/profile.js'
import authRequired from './middleware/authRequired.js';
import { register, login, logout } from './controllers/auth.js';
// import fileUpload from 'express-fileupload'

const db = new prisma.PrismaClient({
	log: ['info', 'warn'],
	errorFormat: 'pretty',
});

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(fileUpload());

// Controller(s)
app.use('/users', authRequired, userRoutes);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/posts', authRequired, postRoutes);
app.use('/comments', authRequired, commentRoutes)
app.use('/likes', authRequired, likeRoutes);
app.use('/profile', authRequired, profileRoutes);

app.get('/', (req, res) => {
	res.send('Welcome to SQL');
});

app.listen(port, () => {
	console.log(`listening on ${port}`);
});
