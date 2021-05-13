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

// GET ALL LIKES AND UNLIKES FROM A POST (PASS THROUGH BOOLEAN VARIBLE "wantLikes")
router.get('/:postId', async (req, res) => {
    const likes = await db.like.findMany({
        where: {
            postId: Number(req.params.postId)
        }
    })

    const typeOfLikes = []

    for (let i = 0; i < likes.length; i++) {
        if (req.body.wantLikes === true) {
            if (likes[i].value === 1) {
                typeOfLikes.push(likes[i])
            }
        }
        else if (likes[i].value === 0) {
            typeOfLikes.push(likes[i])
        }     
    }
    
    res.json({ typeOfLikes })
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
            },
            author: {
                connect: {
                    id: req.currentUser
                }
            },
        }
    })

    res.json({ message: 'Like was registered', like: createdLike })
})

// LIKE/UNLIKE POST (PASS THROUGH BOOLEAN VARIBLE "liked")
router.put('/:id', async (req, res) => {
    if (req.body.liked === true) {
        const updatedLiked = await db.like.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                value: 1
            }
        })
        res.json({ message: "the user's like was updated", like: updatedLiked })
    } else if (req.body.liked === false) {
        const updatedLiked = await db.like.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                value: -1
            }
        })
        res.json({ message: "the user's like was updated", like: updatedLiked })
    } else {
        const updatedLiked = await db.like.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                value: 0
            }
        })
        res.json({ message: "the user's like was updated", like: updatedLiked })
    }
})

export default router