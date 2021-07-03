import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authRequired = (req, res, next) => {
	const token = req.cookies.token
	console.log(token)
	// console.log(bearerHeader);

	if (typeof token !== 'undefined') {
		// const token = bearerHeader.split(' ')[1];
		jwt.verify(token, process.env.JWT_SECRET, function (err, payload) {
			console.log('this is jwt payload', payload);

			if (err) res.sendStatus(500);

			req.currentUser = payload.id;
			next();
		});
	} else {
		res.sendStatus(403);
	}
};

export default authRequired;