import * as statsService from '../services/stats.service.js'

export const getStats = async (req, res) => {
    const data = await statsService.getStats()

    res.json({
        success: true,
        data
    })
}

export const getStatById = async (req, res, next) => {
    try {
        const data = await statsService.getStatById(req.params.id)

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Stat not found'
            })
        }

        res.json({
            success: true,
            data
        })
    }
    catch (err) {
        return next(err)
    }
}

export const deleteStat = async (req, res, next) => {
    try {
        const stat = await statsService.deleteStat(req.params.id)

        if (!stat) {
            return res.status(404).json({
                success: false,
                message: 'Stat not found'
            })
        }

        res.json({
            success: true,
            message: 'Stat deleted'
        })
    }catch (err) {
        return next(err)
    }
}

export const createStat = async (req, res, next) => {
    try {
        const {name} = req.body
        res.json({
            stat: await statsService.createStat(name)
        })
    }
    catch (err) {
        return next(err)
    }
}

export const updateStat = async (req, res, next) => {
    try {
        const {name} = req.body
        const stat = await statsService.updateStat(req.params.id, name)

        if (!stat) {
            return res.status(404).json({
                success: false,
                message: 'Stat not found'
            })
        }

        res.json({
            success: true,
            message: 'Stat updated'
        })
    }catch (err) {
        return next(err)
    }
}