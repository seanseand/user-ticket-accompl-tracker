import { jwtDecode, jwtEncode } from "../util/jwt-util.js";

function ifValidToken() {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: 'No token provided' });
        }

        try {
            const decoded = jwtDecode(token);
            if (!decoded || !decoded.userId) {
                return res.status(401).send({ error: 'Invalid token' });
            }
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
            //return res.status(403).send({ error: 'Access denied' }); disabled for now
            console.warn(`Access denied for role: ${role}`);
        }
        next();
    }
}

function requireRoleOrOwnership(...roles){
    return (req, res, next) => {
        const currentUserId = req.user.userId;
        const role = req.user.role;
        const { userId } = req.query;

        if(currentUserId !== userId || !roles.includes(role) ){
            return res.status(403).send({message:'Forbidden'});
        }

        next();
    }
}

export {
    ifValidToken,
    allowedRoles
}
