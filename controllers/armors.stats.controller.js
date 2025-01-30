import * as armorStatService from '../services/armors.stats.service.js';

export const getArmorStats = async (req, res, next) => {
    try {
        const data = await armorStatService.getArmorStats(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Armor not found'
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

export const getArmorStatsById = async (req, res, next) => {
    try {
        const data = await armorStatService.getArmorStatsById(req.params.id, req.params.statId);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Armor not found'
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

export const deleteArmorStat = async (req, res, next) => {
    try {
        const armor = await armorStatService.deleteArmorStats(req.params.id, req.params.statId);

        if (!armor) {
            return res.status(404).json({
                success: false,
                message: 'Armor not found'
            });
        }

        res.json({
            success: true,
            message: 'Armor stats deleted'
        });
    } catch
    (error) {
        return next(error)
    }
    
}

export const createArmorStat = async(req, res, next) => {
    try {
        const {armor_id, stat_id, value} = req.body;
        const armor = await armorStatService.createArmorStats(armor_id, stat_id, value);

        res.status(201).json({
            success: true,
            data: armor
        });
    } catch (err) {
        return next(err)
    }
     
}

export const updateArmorStat = async (req, res, next) => {
    try {
        const {value} = req.body;
        const armor = await armorStatService.updateArmorStats(req.params.id, req.params.statId, value);

        if (!armor) {
            return res.status(404).json({
                success: false,
                message: 'Armor not found'
            });
        }

        res.json({
            success: true,
            message: 'armor stats updated'
        });
    } catch (error) {
        return next(error)
    }
}
