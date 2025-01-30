import prisma from "../db.js"

export const getAccessories = async () => {
    return await prisma.Accessories.findMany();
}

export const getAccessoryById = async (id) => {
    return await prisma.Accessories.findUnique({
        where: {
            id: parseInt(id)
        }
    });
}

export const deleteAccessory = async (id) => {
    if (await getAccessoryById(id)) {
        await prisma.Accessories.delete({
            where: {
                id
            }
        })
        return true
    }
    return false
}


export const create = async (name, magic_defence) => {
    const count = await prisma.Accessories.count({
        where: {
            name
        }
    })
    if (count > 0) throw new Error('Accessory already exists')

    const accessory = await prisma.Accessories.create({
        data: {
            name,
            magic_defence
        },
        select: {
            id: true,
            name: true,
            magic_defence: true,
        }
    })

    return accessory
}


export const updateAccessory = async (id, name, magic_defence) => {
    if (await getAccessoryById(id)) {
        await prisma.Accessories.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                magic_defence
            }
        })
        return true
    }
}