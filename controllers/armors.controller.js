import * as armorsService from '../services/armors.service.js';

export const getArmors = async (req, res) => {
    try {
        const data = await armorsService.getArmors();
        res.json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching armors',
            error: error.message
        });
    }
}

export const getArmorById = async (req, res, next) => {

    try {
        const data = await armorsService.getArmorById(parseInt(req.params.id));

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

export const deleteArmor = async (req, res, next) => {
    try {
        const armor = await armorsService.deleteArmor(parseInt(req.params.id));

        if (!armor) {
            return res.status(404).json({
                success: false,
                message: 'Armor not found'
            });
        }

        res.json({
            success: true,
            message: 'Armor deleted'
        });
    } catch (error) {
        return next(error)
    }
}

export const createArmor = async (req, res, next) => {

    try {
        const { name, melee_defence, ranged_defence } = req.body;
        
        const armor =  await armorsService.create(name, melee_defence, ranged_defence)

        res.status(201).json({
            success: true,
            data: armor
        });
    } catch (error) {
        return next(error)
    }
}

export const updateArmor = async (req, res, next) => {
    try {
        const { name, melee_defence, ranged_defence } = req.body;
        const armor = await armorsService.updateArmor(req.params.id, name, melee_defence, ranged_defence);

        if (!armor) {
            return res.status(404).json({
                success: false,
                message: 'Armor not found'
            });
        }

        res.json({
            success: true,
            message: 'Armor updated'
        });
    } catch (error) {
        return next(error)
    }
}