import express from 'express';
import db from '../utils/generatePrisma.js';
const router = express.Router();

// SHOW CURRENT LOGGED IN  ROUTE 
router.get('/verify', async (req, res) => {
    const user = await db.user.findUnique({
        where: {
            id: Number(req.currentUser)
        },
    });
    // json response for testing
    res.json({
        user
    })
})

// GET ALL USERS
router.get('/', async (req, res) => {
    const users = await db.user.findMany({
        include: {
            posts: {
                select: {
                    title: true
                }
            },
            comments: {
                select: {
                    content: true
                }
            }
        }
    });
    res.json({
        users
    });
});

// GET USER BY ID
router.get('/:id', async (req, res) => {
    const user = await db.user.findUnique({
        where: {
            id: Number(req.params.id)
        },
        include: {
            posts: {
                select: {
                    title: true
                }
            },
            comments: {
                select: {
                    content: true
                }
            }
        }
    })
    res.json({
        user
    });
})

// CREATE USER ROUTES
router.post('/create', async (req, res) => {
    const createdUser = await db.user.create({
        data: request.body
    })
    res.json({
        message: 'The User was created',
        user: createdUser
    });
})

// UPDATE USER
router.put('/edit', async (req, res) => {
    const updatedUser = await db.user.update({
        where: {
            id: Number(req.currentUser)
        },
        data: req.body,
    });
    res.json({
        message: "the User has been updated",
        user: updatedUser
    })
})

// DELETE USER AND ALL THEIR CONTENT
router.delete('/delete', async (req, res) => {
    const deleteUserComments = await db.comment.deleteMany({
        where: {
            authorId: Number(req.currentUser)
        }
    });

    const deleteUserPosts = await db.post.deleteMany({
        where: {
            authorId: Number(req.currentUser)
        }
    });

    const deletedUser = await db.user.delete({
        where: {
            id: Number(req.currentUser)
        }
    })

    res.json({
        message: 'the user and their posts have been deleted',
        user: deletedUser,
        posts: deleteUserPosts,
        comments: deleteUserComments,
    });
})


export default router;