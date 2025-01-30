import prisma from "../db.js"

export const getArmors = async () => {
    return await prisma.Armors.findMany();
}

export const getArmorById = async (id) => {
    return await prisma.Armors.findUnique({
        where: {
            id : parseInt(id)
        }
    });
}

export const deleteArmor = async (id) => {
    if (await getArmorById(id)) {
        await prisma.Armors.delete({
            where: {
                id
            }
        })
        return true
    }
    return false
}

export const create = async (name, melee_defence,ranged_defence) => {
    const count = await prisma.Armors.count({
        where: {
            name
        }
    })
    if (count > 0) throw new Error('Armor already exists')

    const armor = await prisma.armors.create({
        data: {
            name,
            melee_defence,
            ranged_defence
        },
        select: {
            id: true,
            name: true,
            melee_defence: true,
            ranged_defence: true,
        }
    })

    return armor
}

export const updateArmor = async (id, name, melee_defence, ranged_defence) => {
    if (await getArmorById(id)) {
        await prisma.Armors.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                melee_defence,
                ranged_defence
            }
        })
        return true
    }
}