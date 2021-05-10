import express from 'express';
import db from '../utils/generatePrisma.js';
const router = express.Router();

// GET ALL LIKES
router.get('/', async (req, res) => {
    const likes = await db.like.findMany({
        include: {
            posts: true
        }
    })
    res.json({ likes })
})

// GET ALL "LIKED" LIKES
router.get('/liked', async (req, res) => {
    const likes = await db.like.findMany({
        include: {
            posts: true
        }
    })

    let likedLikes = []

    for (let i = 0; i < likes.length; i++) {
        if (likes[i].value === 1) {
            likedLikes.push(likes[i])
        }
	}

    res.json({ likedLikes })
})

// CREATE LIKE
router.post("/create/:postId", async (req, res) => {
    const createdLike = await db.like.create({
        data: {
            value: 1,
            posts: {
                connect: {
                    id: Number(req.params.postId)
                }
            }
        }
    })
    res.json({ message: 'Like was registered', like: createdLike })
})

// UNLIKE POST
router.put('/:id', async (req, res) => {
    const updatedLiked = await db.like.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            value: 0
        }
    })
    res.json({ message: "the user's like was updated", like: updatedLiked })
})

export default router