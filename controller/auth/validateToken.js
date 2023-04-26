const { firebase } = require('../../utils');
const { auth, db } = firebase;

async function validateToken(req, res) {
    try {
        const accessToken = req.body.token;
        const decodedToken = await auth.verifyIdToken(accessToken);

        const docRef = db.collection('frontend-db').doc("admin");
        const query = await docRef.get();
        if (!query.exists) {
            throw new Error(`List of allowed emails does not exist.`);
        }
        const validAdmin = query.data().admin;
        const validEmails = query.data().email;
        if (validEmails.includes(decodedToken.email) || validAdmin === decodedToken.email) {
            return res.status(200).json({ msg: 'Token is valid.', email: decodedToken.email, name: decodedToken.name });
        } else {
            throw new Error(`Email is not allowed.`);
        }
    } catch (err) {
        console.error(err);
        res.status(401).json({ msg: 'Unauthorized. Token is invalid.', error: err.message });
    }
}

module.exports = validateToken;