const { firebase } = require('../../utils');
const { auth, db } = firebase;

async function verifyTokenMiddleware(req, res, next) {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = await auth.verifyIdToken(accessToken);
        
        const docRef = db.collection('frontend-db').doc("admin");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`List of allowed emails does not exist.`);
        }
        const validAdmin = query.data().admin;
        const validEmails = query.data().email;
        if (!(validEmails.includes(decodedToken.email) || validAdmin === decodedToken.email)) {
            throw new Error(`Email is not allowed.`);
        }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Unauthorized. Token is invalid.', error: err.message });
    }
}

module.exports = verifyTokenMiddleware;