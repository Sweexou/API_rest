import express from 'express'
import * as statsController from '../controllers/stats.controller.js'
import authMiddleware from '../middlewares/auth.js'
import { authorizeRole } from '../middlewares/authorizeRole.js'

const router = express.Router()

router.get('/', statsController.getStats)
router.get('/:id', statsController.getStatById)
router.post('/', authMiddleware, authorizeRole([1]), statsController.createStat)
router.delete('/:id', authMiddleware, authorizeRole([1]), statsController.deleteStat)
router.put('/:id', authMiddleware, authorizeRole([1]), statsController.updateStat)



export default router