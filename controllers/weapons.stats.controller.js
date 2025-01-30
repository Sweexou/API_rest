import * as weaponStatService from '../services/weapons.stats.service.js';

export const getWeaponStats = async (req, res, next) => {
    try {
    const data = await weaponStatService.getWeaponStats(req.params.id);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: 'Weapons not found'
        });
    }

    res.json({
        success: true,
        data
    });
    } catch (error) {
        next(error);
    }
}

export const getWeaponStatsById = async (req, res, next) => {
    try {
        const data = await weaponStatService.getWeaponStatsById(req.params.id, req.params.statId);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Weapon not found'
            });
        }

        res.json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
}

export const deleteWeaponStat = async (req, res, next) => {
    try {
        const weapon = await weaponStatService.deleteWeaponStats(req.params.id, req.params.statId);

        if (!weapon) {
            return res.status(404).json({
                success: false,
                message: 'Weapon not found'
            });
        }

        res.json({
            success: true,
            message: 'Weapon stats deleted'
        });
    } catch (error) {
        next(error);
    }
}

export const createWeaponStat = async(req, res, next) => {
    try {
        const {weapon_id, stat_id, value} = req.body;
        const weapon = await weaponStatService.createWeaponStats(weapon_id, stat_id, value);

        res.status(201).json({
            success: true,
            data: weapon
        });
    } catch (error) {
        next(error);
    }
}

export const updateWeaponStat = async (req, res, next) => {
    try {
        const {value} = req.body;
        const weapon = await weaponStatService.updateWeaponStats(req.params.id, req.params.statId, value);

        if (!weapon) {
            return res.status(404).json({
                success: false,
                message: 'Weapon not found'
            });
        }

        res.json({
            success: true,
            message: 'Weapon stats updated'})
    } catch (error) {
        next(error);
    }
}