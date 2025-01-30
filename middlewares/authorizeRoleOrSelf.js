export const authorizeRoleOrSelf = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: 'Access denied: No user data available' });
        }

        const userRole = req.user.role;
        const userId = req.user.id; // Extract user ID from the token
        const resourceId = parseInt(req.params.id, 10); // Extract ID from route parameters

        // Check if the user has the allowed role or is modifying their own record
        if (allowedRoles.includes(userRole) || userId === resourceId) {
            return next();
        }

        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    };
};
