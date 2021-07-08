import express from 'express';
import db from '../utils/generatePrisma.js';
const router = express.Router();

// GET ALL COMMENTS
router.get('/', async (req, res) => {
    const comments = await db.comment.findMany({
        include: {
            author: true,
            childComments: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    postId: true,
                    author: true,
                }
            }
        }
    })
    res.json({ comments })
})

// GET ALL COMMENTS BY POST ID
router.get('/:id', async (req, res) => {
    const comments = await db.comment.findMany({
        where: {
           postId: Number(req.params.id)
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: true,
            childComments: true
        }
    })
    res.json({ comments })
})

// CREATE COMMENT ON POST
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

// CREATE COMMENT ON COMMENT
router.post('/create/child/:commentId', async (req, res) => {
    const createdComment = await db.comment.create({
        data: {
            content: req.body.content,
            author: {
                connect: {
                    id: req.currentUser
                }
            },
            /* posts: {
                connect: {
                    id: Number(req.params.postId)
                }
            }, */
            parentComment: {
                connect: {
                    id: Number(req.params.commentId)
                }
            }
        }
    })
    res.json({ message: 'Created Comment', comment: createdComment });
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