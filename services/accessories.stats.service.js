import prisma from "../db.js"

export const getAccessoryStats = async (id) => {
    return await prisma.stats_accessories.findMany({
        where: {
            accessory_id : parseInt(id)
        }
    });
}

export const getAccessoryStatsById = async (id, statId) => {
    return await prisma.stats_accessories.findUnique({
        where: {
            accessory_id_stat_id: { 
                accessory_id: parseInt(id), 
                stat_id: parseInt(statId),   
            },
        }
    });
}

export const deleteAccessoryStats = async (id, statId) => {
    if (await getAccessoryStatsById(id, statId)) {
        await prisma.stats_accessories.delete({
            where: {
                accessory_id_stat_id: { 
                    accessory_id: parseInt(id), 
                    stat_id: parseInt(statId),   
                },
            }
        })
        return true
    }
    return false
}

export const createAccessoryStats = async (accessory_id, stat_id, value) => {
    const accessory = await prisma.stats_accessories.create({
        data: {
            accessory_id,
            stat_id,
            value
        },
        select: {
            accessory_id: true,
            stat_id: true,
            value: true
        }
    })
    return accessory
}

export const updateAccessoryStats = async (id, statId, value) => {
    if (await getAccessoryStatsById(id, statId)) {
        const accessory = await prisma.stats_accessories.update({
            where: {
                accessory_id_stat_id: { 
                    accessory_id: parseInt(id), 
                    stat_id: parseInt(statId),   
                },
            },
            data: {
                value
            },
        })
        return true
    }
}
