import prisma from "../db.js"

export const getWeapons = async () => {
    return await prisma.weapons.findMany();
}

export const getWeaponById = async (id) => {
    return await prisma.weapons.findUnique({
        where: {
            id : parseInt(id)
        }
    });
}

export const deleteWeapon = async (id) => {
    if (await getWeaponById(id)) {
        await prisma.weapons.delete({
            where: {
                id : parseInt(id)
            }
        })
        return true
    }
    return false
}


export const createWeapon = async ( name, min_damage, max_damage, damage_reduction) => {
    const count = await prisma.weapons.count({
        where: {
            name
        }
    })
    if (count > 0) throw new Error('Weapon already exists')
        
    const weapon = await prisma.weapons.create({
        data: {
            name,
            min_damage,
            max_damage,
            damage_reduction,
        },
        select: {
            id: true,
            name: true,
            min_damage: true,
            max_damage: true,
            damage_reduction: true,
        },
    })

    return weapon

}

export const updateWeapon = async (id, name, min_damage, max_damage, damage_reduction) => {
    if (await getWeaponById(id)) {
        const weapon = await prisma.weapons.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                min_damage,
                max_damage,
                damage_reduction
            }
        })
        return true
    }
}
