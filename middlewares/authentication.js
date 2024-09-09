import jwt from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ status: false, message: 'Login is required!' });
        }

        const tokenDetails = jwt.verify(token, process.env.JWT_PASSWORD);
        console.log('Token details', tokenDetails);

        req.user = tokenDetails;
        next();
    }
    catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ status: false, message: 'Unauthorized: Invalid or expired token' });
    }

}

export default isLoggedIn;

