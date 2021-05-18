import express from 'express';
import db from '../utils/generatePrisma.js';
import multer from 'multer';
const router = express.Router();

const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'image/');
		},
		filename: function (req, file, cb) {
			cb(null, new Date().valueOf() + '_' + file.originalname);
		},
	}),
});

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
            likes: true,
            image: true
        }
    })
    res.json({ posts })
})

// GET ALL UNPUBLISHED POST
router.use('/allunpublished', async (req, res) => {
    const posts = await db.post.findMany({
        where: {
            published: false
        },
        include: {
            author: true,
            comments: {
                include: {
                    author: true,
                    childComments: true
                }
            },
            likes: true,
            image: true
        }
    })
    res.json({ posts })
})

// GET USER UNPUBLISHED POST
router.use('/unpublished', async (req, res) => {
    const posts = await db.post.findMany({
        where: {
            authorId: Number(req.currentUser),
            published: false
        },
        include: {
            author: true,
            comments: {
                include: {
                    author: true,
                    childComments: true
                }
            },
            likes: true
        }
    })
    res.json({ posts })
})

// GET ALL USERS POSTS (FOR PROFILE SHOW POST PAGE)
router.get("/published", async (req, res) => {
    const posts = await db.post.findMany({
			select: {
				title: true,
				categories: true,
				author: true,
				comments: true,
                likes: true,
                image: true,
			},
			where: {
				authorId: Number(req.currentUser),
                published: true
			},
		});
    res.json({ posts })
})

// CREATE POST
router.post('/create', async (req, res) => {
    const createdPost = await db.post.create({
        data: {...req.body, authorId: req.currentUser}
    })
    res.json({ message: 'Created Post', post: createdPost });
})

// CREATE POST WITH IMAGE
router.post(
	'/create/image',
	upload.single('image'),
	async (req, res) => {
		const createdPost = await db.post.create({
			data: { ...req.body, authorId: req.currentUser},
		});

        const createdImage = await db.image.create({
            data: { ...req.file,
                posts: {
                    connect: {
                        id: createdPost.id
                    }
                },
                author: {
                    connect: {
                        id: req.currentUser
                    }
                }
            }
        })

		res.json({ message: 'Created Post', post: createdPost, image: createdImage });
	}
);

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