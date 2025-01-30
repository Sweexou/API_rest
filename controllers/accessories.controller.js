import * as accessoryService from '../services/accessories.service.js';


export const getAccessories = async (req, res) => {
    const data = await accessoryService.getAccessories();
    res.json({
        success: true,
        data
    });
}

export const getAccessoryById = async (req, res, next) => {
    try {
        const data = await accessoryService.getAccessoryById(req.params.id);

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


export const deleteAccessory = async (req, res, next) => {
    try {
        const accessory = await accessoryService.deleteAccessory(parseInt(req.params.id));


        if (!accessory) {
            return res.status(404).json({
                success: false,
                message: 'Accessory not found'
            });
        }

        res.json({
            success: true,
            message: 'Accessory deleted'
        });
    } catch (error) {
    return next(error)
    }   
}

export const createAccessory = async (req, res, next) => {
    try {
        const { name, magic_defence } = req.body;
        
        const accessory = await accessoryService.create(name, magic_defence)
        
        res.status(201).json({
            success: true,
            data: accessory
        });
    } catch (err) {
        return next(err)
    }
}

export const updateAccessory = async (req, res, next) => {
    try {
        const { name, magic_defence } = req.body;
    const accessory = await accessoryService.updateAccessory(req.params.id, name, magic_defence);

    if (!accessory) {
        return res.status(404).json({
            success: false,
            message: 'Accessory not found'
        });
    }

    res.json({
        success: true,
        message: 'Accessory updated'
    });
    } catch (err) {
        return next(err)
    }   
}