import e from 'express';
import * as weaponService from '../services/weapons.service.js';

export const getWeapons = async (req, res) => {
    const data = await weaponService.getWeapons();

    res.json({
        success: true,
        data
    });
}

export const getWeaponById = async (req, res, next) => {
    try {
        const data = await weaponService.getWeaponById(req.params.id);
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
    } catch (err) {
        return next(err);
    }
}

export const deleteWeapon = async (req, res, next) => {
    try {
        const weapon = await weaponService.deleteWeapon(req.params.id);

        if (!weapon) {
            return res.status(404).json({
                success: false,
                message: 'Weapon not found'
            });
        }

        res.json({
            success: true,
            message: 'Weapon deleted'
        });
    } catch (err) {
        return next(err);
    }
}

export const createWeapon = async(req, res, next) => {
    try{
    const {name, min_damage, max_damage, damage_reduction} = req.body;
    const weapon = await weaponService.createWeapon(name, min_damage, max_damage, damage_reduction);

    res.status(201).json({
        success: true,
        data: weapon
    });
    } catch (err) {
        return next(err);
    }
}

export const updateWeapon = async (req, res, next) => {
    try {
        const {name, min_damage, max_damage, damage_reduction} = req.body;
        const weapon = await weaponService.updateWeapon(req.params.id, name, min_damage, max_damage, damage_reduction);

        if (!weapon) {
            return res.status(404).json({
                success: false,
                message: 'Weapon not found'
            });
        }

        res.json({
            success: true,
            message: 'Weapon updated'})
        } catch (err) {
            return next(err);
        }
}


