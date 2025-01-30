import * as characterService from '../services/characters.service.js';

export const getCharacters = async (req, res) => {
    const data = await characterService.getCharacters();

    res.json({
        success: true,
        data
    });
}

export const getCharacterById = async (req, res, next) => {
    try {
        const data = await characterService.getCharacterById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Character not found'
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

export const deleteCharacter = async (req, res, next) => {
    try {
        const character = await characterService.deleteCharacter(req.params.id);

        if (!character) {
            return res.status(404).json({
                success: false,
                message: 'Character not found'
            });
        }

        res.json({
            success: true,
            message: 'Character deleted'
        });
    } catch (error) {
        return next(error)
    }
}

export const createCharacter = async (req, res, next) => {
    const {name, weapon1Id, weapon2Id, armor1Id, armor2Id, accessory1Id, accessory2Id, userId} = req.body;
    try {
    const character = await characterService.createCharacter(name, weapon1Id, weapon2Id, armor1Id, armor2Id, accessory1Id, accessory2Id, userId)
    res.json({
        character 
    });
    } catch (error) {
        return next(error)
    }

    
}


export const updateCharacter = async (req, res, next) => {
    const {name, weapon1Id, weapon2Id, armor1Id, armor2Id, accessory1Id, accessory2Id, userId} = req.body;
    try {
        const character = await characterService.updateCharacter(req.params.id, name, weapon1Id, weapon2Id, armor1Id, armor2Id, accessory1Id, accessory2Id, userId);
        if (!character) {
            return res.status(404).json({
                success: false,
                message: 'Character not found'
            });
        }
    } catch (error) {
        return next(error)
    }

    

    res.json({
        success: true,
        message: 'Character updated'
    });
}


export const getCharacterStats = async (req, res, next) => {
    try {
        const data = await characterService.getCharacterStats(req.params.id);
        res.json({
            success: true,
            data
        });
    } catch (error) {
        return next(error)
    }

    
}

export const getCharacterStatsById = async (req, res, next) => {
    try {
        const data = await characterService.getCharacterStatsById(req.params.id, req.params.statId);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Character not found'
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

export const getBasicCharacterStats = async (req, res, next) => {
    try {
        const data = await characterService.getBasicCharacterStats(req.params.id);
        res.json({
            success: true,
            data
        });
    } catch (error) {
        return next(error)
    }   
}

export const getCharacterHitpool = async (req, res, next) => {
    try {
        const data = await characterService.getCharacterHitpool(req.params.id);
        res.json({
            success: true,
            data
        });
    } catch (error) {
        return next(error)
    }
}

export const getCharacterAvgDamage = async (req, res, next) => {
    try {
        const data = await characterService.getCharacterAvgDamage(req.params.id);
        res.json({
            success: true,
            data
        });
    } catch (error) {
        return next(error)
    }
}