const { firebase } = require('../../utils');
const { auth } = firebase;

async function verifyTokenMiddleware(req, res, next) {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = await auth.verifyIdToken(accessToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Unauthorized. Token is invalid.', error: err.message });
    }
}

module.exports = verifyTokenMiddleware;