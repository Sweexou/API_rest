import * as accessoryStatService from '../services/accessories.stats.service.js';


export const getAccessoryStats = async (req, res, next) => {
    try {
        const data = await accessoryStatService.getAccessoryStats(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Accessory not found'
            });
        }
    
        res.json({
            success: true,
            data
        });
    } catch (error) {
        return next(error)}
}

export const getAccessoryStatsById = async (req, res, next) => {
    try {
        const data = await accessoryStatService.getAccessoryStatsById(req.params.id, req.params.statId);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Accessory not found'
            });
        }

        res.json({
            success: true,
            data
        });
    } catch (error) {
        return next(error)
    }
    
}

export const deleteAccessoryStat = async (req, res, next) => {
    try {
        const accessory = await accessoryStatService.deleteAccessoryStats(req.params.id, req.params.statId);

        if (!accessory) {
            return res.status(404).json({
                success: false,
                message: 'Accessory not found'
            });
        }

        res.json({
            success: true,
            message: 'Accessory stats deleted'
        });
    } catch (error) {
        return next(error)
    }
}

export const createAccessoryStat = async(req, res, next) => {
    try {
        const {accessory_id, stat_id, value} = req.body;
        const accessory = await accessoryStatService.createAccessoryStats(accessory_id, stat_id, value);

        res.status(201).json({
            success: true,
            data: accessory
        });
    } catch (error) {
        return next(error)
    }
    
}

export const updateAccessoryStat = async (req, res, next) => {
    try {
        const {value} = req.body;
        const accessory = await accessoryStatService.updateAccessoryStats(req.params.id, req.params.statId, value);

        if (!accessory) {
            return res.status(404).json({
                success: false,
                message: 'Accessory not found'
            });
        }

        res.json({
            success: true,
            message: 'accessorie stats updated'
        });
    } catch (error) {
        return next(error)
    }
}