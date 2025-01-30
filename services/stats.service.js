import prisma from "../db.js"

export const getStats = async () => {
    return await prisma.stats.findMany()
}

export const getStatById = async (id) => {
    return await prisma.stats.findUnique({
        where: {
            id : parseInt(id)
        }
    });
}

export const deleteStat = async (id) => {
    if (await getStatById(id)) {
        await prisma.stats.delete({
            where: {
                id : parseInt(id)
            }
        })
        return true
    }
    return false
}

export const createStat = async (name) => {
    if (await prisma.stats.count({
        where: {
            name
        }
    }) > 0) {
        throw new Error('Stat already exists')
    }
    const stat = await prisma.stats.create({
        data: {
            name
        },
        select: {
            id: true,
            name: true
        }
    })
    return stat
}

export const updateStat = async (id, name) => {
    if (await getStatById(id)) {
        const stat = await prisma.stats.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name
            }
        })
        return true
    }
}