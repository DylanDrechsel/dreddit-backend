import express from 'express';
import db from '../utils/generatePrisma.js';
const router = express.Router();

// GET ALL PUBLISHED POST
router.get('/', async (req, res) => {
    const posts = await db.post.findMany({
        where: {
            published: true
        },
        include: {
            author: true,
            comments: {
                include: {
                    author: true
                }
            },
            likes: true
        }
    })
    res.json({ posts })
})

// GET ALL UNPUBLISHED POST
router.use('/unpublished', async (req, res) => {
    const posts = await db.post.findMany({
        where: {
            auther: req.username
        }
    })
    res.json({ posts })
})

// GET ALL USERS POSTS (FOR PROFILE SHOW POST PAGE)
router.get("/:authorId", async (req, res) => {
    const posts = await db.post.findMany({
        select: {
            title: true,
            categories: true,
            author: true,
            comments: true
        },
        where: {
            authorId: Number(req.params.authorId)
        }
    })
    res.json({ posts })
})

// CREATE POST
router.post('/create', async (req, res) => {
    const createdPost = await db.post.create({
        data: {...req.body, authorId: req.currentUser}
    })
    res.json({ message: 'Created Post', post: createdPost });
})

// UPDATE POST
// ADD AUTH FOR THIS
router.put('/:id', async (req, res) => {
    const updatedPost = await db.post.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.json({ message: "the post has been updated", post: updatedPost });
})

// DELETE POST
// ADD AUTH FOR THIS
router.delete('/:id', async (req, res) => {
    const deletedPost = await db.post.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.json({ message: "the post has been deleted", post: deletedPost })
})

export default router;