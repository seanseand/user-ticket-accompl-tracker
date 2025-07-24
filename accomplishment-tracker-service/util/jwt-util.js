import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;
const ALGORITHM = process.env.ENCRYPTION_ALGORITHM || 'HS256';

function jwtDecode(token) {
    try {
        return jwt.verify(token, SECRET_KEY, { algorithms: [ALGORITHM] });
    } catch (error) {
        console.error('JWT decode error:', error);
        throw new Error('Invalid token');
    }
}

function jwtEncode(payload) {
    return jwt.sign(payload, SECRET_KEY, { algorithm: ALGORITHM }); 
}

export {
    jwtDecode,
    jwtEncode
}