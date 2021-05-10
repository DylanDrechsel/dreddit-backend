import express from 'express';
import db from '../utils/generatePrisma.js';
const router = express.Router();

// GET ALL COMMENTS
router.get('/', async (req, res) => {
    const comments = await db.comment.findMany({
        include: {
            author: true
        }
    })
    res.json({ comments })
})

// CREATE COMMENT
router.post('/create/:postId', async (req, res) => {
    const createdComment = await db.comment.create({
        data: {
            content: req.body.content,
            author: {
                connect: {
                    id: req.currentUser
                }
            },
            posts: {
                connect: {
                    id: Number(req.params.postId)
                }
            }
        }
    })
    res.json({ message: 'Created Comment', comment: createdComment })
})

// UPDATE COMMENT
router.put('/:id', async (req, res) => {
    const updatedComment = await db.comment.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.json({ message: 'the comment was updated', comment: updatedComment });
})

// DELETE COMMENT
router.delete('/:id', async (req, res) => {
    const deletedComment = await db.comment.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.json({ message: "the comment has been deleted", comment: deletedComment })
})

export default router