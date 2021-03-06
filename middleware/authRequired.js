import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// WORKING TOKEN AUTH
// HEROKU DOESNT ALLOW COOKIES TO BE SET
const tokenAuthRequired = (req, res, next) => {
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

const authRequired = (req, res, next) => {
	const bearerHeader = req.headers['authorization'];
	// console.log(bearerHeader);

	if (typeof bearerHeader !== 'undefined') {
		const token = bearerHeader.split(' ')[1];
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

export default /* tokenAuthRequired; */ authRequired;