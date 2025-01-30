import prisma from '../db.js';

export const verifyOwnershipOrAdmin = async (req, res, next) => {
    const userId = req.user.id; // Authenticated user ID from the token
    const userRole = req.user.role; // Authenticated user's role
    const characterId = parseInt(req.params.id, 10); // Character ID from route params

    try {
        // Fetch the character from the database to check ownership
        const character = await prisma.character.findUnique({
            where: { id: characterId },
            select: { userId: true } // Only fetch the userId field
        });

        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        // Check if the user is an admin (role 1) or owns the character
        if (userRole === 1 || character.userId === userId) {
            return next(); // User is authorized
        }

        return res.status(403).json({ message: 'Access denied: You do not own this character' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
