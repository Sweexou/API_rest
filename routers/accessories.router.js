import express from 'express'
import * as accessoriesController from '../controllers/accessories.controller.js'
import * as accessoryStatsController from '../controllers/accessories.stats.controller.js'
import authMiddleware from '../middlewares/auth.js'
import { authorizeRole } from '../middlewares/authorizeRole.js'

const router = express.Router()

router.get('/', accessoriesController.getAccessories)
router.get('/:id', accessoriesController.getAccessoryById)
router.delete('/:id', authMiddleware,authorizeRole([1]), accessoriesController.deleteAccessory)
router.post('/', authMiddleware,authorizeRole([1]), accessoriesController.createAccessory)
router.put('/:id', authMiddleware,authorizeRole([1]), accessoriesController.updateAccessory)

router.get('/:id/stats', accessoryStatsController.getAccessoryStats)
router.get('/:id/stats/:statId', accessoryStatsController.getAccessoryStatsById)
router.delete('/:id/stats/:statId', authMiddleware,authorizeRole([1]), accessoryStatsController.deleteAccessoryStat)
router.post('/stats', authMiddleware,authorizeRole([1]), accessoryStatsController.createAccessoryStat)
router.put('/:id/stats/:statId', authMiddleware,authorizeRole([1]), accessoryStatsController.updateAccessoryStat)

export default router