import * as usersService from '../services/users.service.js'

export const getUsers = async (req, res) => {
    const data = await usersService.getAll();

    res.json({
        success: true,
        data
    });
}

export const getUserById = async (req, res, next) => {
    try {
        const data = await usersService.getUserById(parseInt(req.params.id));

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data
        });
    } catch (err) {
        return next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await usersService.deleteUser(parseInt(req.params.id));

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User deleted'
        });
    }catch (err) {
        return next(err)
    }
}

export const createUser = async (req, res) => {
    try {
    const { name, password } = req.body
    const user = await usersService.create(name, password);

    res.status(201).json({
        success: true,
        data: user
    });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, password } = req.body
        const id = parseInt(req.params.id);
        const user = await usersService.updateUser(id, name, password);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
    
}

export const loginUser = async (req, res, next) => {
    const { name, password } = req.body
    
    let token

    try {
        token = await usersService.login(name, password)
        // We will return a success message if the login was successful and the token
        res.json({
            success: true,
            message: 'Login successful',
            token: token
        })
    } catch (err) {
        return next(err)
    }

    
    
}