const { firebase } = require('../../utils');
const { auth } = firebase;

async function validateToken(req, res) {
    try {
        const accessToken = req.body.token;

        const decodedToken = await auth.verifyIdToken(accessToken);
        res.status(200).json({ msg: 'Token is valid.', email: decodedToken.email, name: decodedToken.name });
        } catch (error) {
        console.error(error);
        res.status(401).json({ msg: 'Unauthorized. Token is invalid.' });
        }
}

module.exports = validateToken;