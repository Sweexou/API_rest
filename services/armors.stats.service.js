import prisma from "../db.js"

export const getArmorStats = async (id) => {
    return await prisma.stats_Armors.findMany({
        where: {
            armor_id : parseInt(id)
        }
    });
}

export const getArmorStatsById = async (id, statId) => {
    return await prisma.stats_Armors.findUnique({
        where: {
            armor_id_stat_id: { 
                armor_id: parseInt(id), 
                stat_id: parseInt(statId),   
            },
        }
    });
}

export const deleteArmorStats = async (id, statId) => {
    if (await getArmorStatsById(id, statId)) {
        await prisma.stats_Armors.delete({
            where: {
                armor_id_stat_id: { 
                    armor_id: parseInt(id), 
                    stat_id: parseInt(statId),   
                },
            }
        })
        return true
    }
    return false
}

export const createArmorStats = async (armor_id, stat_id, value) => {
    const armor = await prisma.stats_Armors.create({
        data: {
            armor_id,
            stat_id,
            value
        },
        select: {
            armor_id: true,
            stat_id: true,
            value: true
        }
    })
    return armor
}

export const updateArmorStats = async (id, statId, value) => {
    if (await getArmorStatsById(id, statId)) {
        const armor = await prisma.stats_Armors.update({
            where: {
                armor_id_stat_id: { 
                    armor_id: parseInt(id), 
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