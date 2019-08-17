const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const error = new Error('User Authentication Failed! please send valid token.');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'iamsecretcode') // verify decode and check for valid token
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken) {
        const error = new Error('User Authenticated failed!');
        error.statusCode = 401;
        throw error;
    }
    // at this place token is valid so extract user id from token and store in response , could be used at other place
    req.userId = decodedToken.userId;
    next()
};