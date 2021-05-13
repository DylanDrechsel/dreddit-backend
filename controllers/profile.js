import express from 'express';
import db from '../utils/generatePrisma.js';
const router = express.Router();

// GET ALL PROFILES
router.get('/', async (req, res) => {
    const profiles = await db.profile.findMany({
        select: {
            id: true,
            bio: true,
            user: true
        }
    })
    res.json({ profiles })
})

// CREATE PROFILE
router.post('/create', async (req, res) => {
    const createdProfile = await db.profile.create({
        data: {
            ...req.body,
            user: {
                connect: {
                    id: req.currentUser
                }
            }
        }
    })
    res.json({ message: "Created profile", post: createdProfile })
})

// UPDATE PROFILE
router.put('/:id', async (req, res) => {
    const updatedProfile = await db.profile.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.json({ message: "Updated profile", post: updatedProfile })
})

// DELETE PROFILE
router.delete('/:id', async (req, res) => {
    const deletedProfile = await db.profile.delete({
        where: {
           id: Number(req.params.id)
        }
    })
    res.json({ message: 'Delete Profile', post: deletedProfile });
})

export default router