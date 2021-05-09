import express from 'express';
import db from '../utils/generatePrisma.js';
const router = express.Router();

/* SHOW CURRENT LOGGED IN  ROUTE */
router.get("/verify", async function(request, response){
    const user = await db.user.findUnique({
        where: {
            id: Number(request.currentUser)
        },
    });
    // json response for testing
    response.json({user})
})

// GET ALL USERS
router.get('/', async (req, res) => {
		const users = await db.user.findMany({});
		res.json({ users });
	});

// GET USER BY ID
router.get('/:id', async (req, res) => {
    const user = await db.user.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    res.json({ user });
})

// CREATE USER ROUTES
router.post('/create', async (req, res) => {
    const user = await db.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.json({ user })
})



export default router;