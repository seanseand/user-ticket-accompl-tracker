import { jwtDecode, jwtEncode } from "../util/jwt-util.js";

function ifValidToken() {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: 'No token provided' });
        }

        try {
            const decoded = jwtDecode(token);
            req.user = decoded; // Attach user info to request
            next();
        } catch (error) {
            return res.status(401).send({ error: 'Invalid token' });
        }
    }

}

function allowedRoles(...roles){
    return (req, res, next) => {
        const role = req.user.role || "employee"; // Default to employee if no role is set
        if (!roles.includes(role)) {
            return res.status(403).send({ error: 'Access denied' });
        }
        next();
    }
}

export {
    ifValidToken,
    allowedRoles
}
