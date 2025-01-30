import prisma from "../db.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            name: true
        }
    };
    if (sortBy) {
        if (!sortDirection) sortDirection = 'asc'
        options.orderBy = {
            [sortBy]: sortDirection
        }
    }

    return await prisma.user.findMany(options)
}

export const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            role: true
        }
    });
}


export const deleteUser = async (id) => {                                                       
    if (await getUserById(id)) {
        await prisma.user.delete({
            where: {
                id
            }
        })
        return true
    }
    return false
}


export const create = async (name, password) => {

    const count = await prisma.user.count({
        where: {
            name
        }
    })
    if (count > 0) throw new Error('Username already exists')

    const encryptedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
    const user = await prisma.user.create({
        data: {
            name,
            password: encryptedPassword,
            role: 2
        },
        select: {
            id: true,
            name: true
        }
    })
    return user
}


export const updateUser = async (id, name, password) => {
    if (await getUserById(id)) {
        await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                password
            }
        })
        return true
    }
    return false
}

export const login = async (username, password) => {
    const user = await prisma.user.findFirst({
        where: {
            name: username
        }
    })

    if (!user) throw new Error('User not found')

    if (!bcrypt.compareSync(password, user.password)){
        console.log("Provided username:", username);
        console.log("Provided password:", password);
        console.log("Hashed password from DB:", user.password);
        throw new Error('Invalid password')
    } 

    // Generate a token here
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    return token
}