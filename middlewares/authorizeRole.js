export const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: 'Access denied: No user data available' });
        }

        const userRole = req.user.role; // Assuming the role is stored in the token's payload
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }

        next(); // User is authorized, proceed to the next middleware/controller
    };
};
