import prisma from "../db.js"

export const getWeaponStats = async (id) => {
    return await prisma.stats_Weapons.findMany({
        where: {
            weapon_id : parseInt(id)
        }
    });
}

export const getWeaponStatsById = async (id, statId) => {
    return await prisma.stats_Weapons.findUnique({
        where: {
            weapon_id_stat_id: { 
                weapon_id: parseInt(id), 
                stat_id: parseInt(statId),   
            },
        }
    });
}

export const deleteWeaponStats = async (id, statId) => {
    if (await getWeaponStatsById(id, statId)) {
        await prisma.stats_Weapons.delete({
            where: {
                weapon_id_stat_id: { 
                    weapon_id: parseInt(id), 
                    stat_id: parseInt(statId),   
                },
            }
        })
        return true
    }
    return false
}

export const createWeaponStats = async (weapon_id, stat_id, value) => {
    const weapon = await prisma.stats_Weapons.create({
        data: {
            weapon_id,
            stat_id,
            value
        },
        select: {
            weapon_id: true,
            stat_id: true,
            value: true
        }
    })
    return weapon
}

export const updateWeaponStats = async (id, statId, value) => {
    if (await getWeaponStatsById(id, statId)) {
        const weapon = await prisma.stats_Weapons.update({
            where: {
                weapon_id_stat_id: { 
                    weapon_id: parseInt(id), 
                    stat_id: parseInt(statId),   
                },
            },
            data: {
                value
            }
        })
        return true
    }
}

