import express from 'express';
import db from '../utils/generatePrisma.js';
const router = express.Router();


// CREATE COMMENT
router.post('/create/:postId', async (req, res) => {
    console.log(req.body.content)
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

export default router