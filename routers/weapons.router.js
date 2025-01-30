import express from 'express'
import * as weaponsController from '../controllers/weapons.controller.js'
import * as weaponStatsController from '../controllers/weapons.stats.controller.js'
import authMiddleware from '../middlewares/auth.js'
import { authorizeRole } from '../middlewares/authorizeRole.js'

const router = express.Router()

router.get('/', weaponsController.getWeapons) // get all weapons
router.get('/:id', weaponsController.getWeaponById)
router.delete('/:id', authMiddleware,authorizeRole([1]), weaponsController.deleteWeapon)
router.post('/', authMiddleware,authorizeRole([1]), weaponsController.createWeapon)
router.put('/:id', authMiddleware,authorizeRole([1]), weaponsController.updateWeapon)

router.get('/:id/stats', weaponStatsController.getWeaponStats)
router.get('/:id/stats/:statId', weaponStatsController.getWeaponStatsById)
router.delete('/:id/stats/:statId', authMiddleware,authorizeRole([1]), weaponStatsController.deleteWeaponStat)
router.post('/stats', authMiddleware,authorizeRole([1]), weaponStatsController.createWeaponStat)
router.put('/:id/stats/:statId', authMiddleware,authorizeRole([1]), weaponStatsController.updateWeaponStat)


export default router