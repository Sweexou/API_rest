import express from 'express'
import * as armorsController from '../controllers/armors.controller.js'
import * as armorStatsController from '../controllers/armors.stats.controller.js'
import authMiddleware from '../middlewares/auth.js'
import { authorizeRole } from '../middlewares/authorizeRole.js'

const router = express.Router()

router.get('/', armorsController.getArmors)
router.get('/:id', armorsController.getArmorById)
router.delete('/:id', authMiddleware,authorizeRole([1]), armorsController.deleteArmor)
router.post('/', authMiddleware,authorizeRole([1]), armorsController.createArmor)
router.put('/:id', authMiddleware,authorizeRole([1]), armorsController.updateArmor)

router.get('/:id/stats', armorStatsController.getArmorStats)
router.get('/:id/stats/:statId', armorStatsController.getArmorStatsById)
router.delete('/:id/stats/:statId', authMiddleware,authorizeRole([1]), armorStatsController.deleteArmorStat)
router.post('/stats', authMiddleware,authorizeRole([1]), armorStatsController.createArmorStat)
router.put('/:id/stats/:statId', authMiddleware, authorizeRole([1]), armorStatsController.updateArmorStat)

export default router