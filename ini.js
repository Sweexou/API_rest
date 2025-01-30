import prisma from './db.js'
import bcrypt from 'bcrypt'


const defaultUser = {
    name: 'admin',
    password: 'admin'
}

export const init = async () => {
    createDefaultStats()
    createDefaultUser()
}


export const createDefaultStats = async () => {
    const stats = ['strength', 'fortitude', 'dexterity', 'perception', 'wisdom']
    for (let stat of stats) {
        const count = await prisma.stats.count({
            where: {
                name: stat
            }
        })
        if (count > 0) continue
        await prisma.stats.create({
            data: {
                name: stat
            }
        })
    }
}

export const createDefaultUser = async () => {
    const count = await prisma.user.count({
        where: {
            name: defaultUser.name
        }
    })
    if (count > 0) return
    const encryptedPassword = bcrypt.hashSync(defaultUser.password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
    await prisma.user.create({
        data: {
            name: defaultUser.name,
            password: encryptedPassword,
            role: 1
        }
    })
}

export default init;