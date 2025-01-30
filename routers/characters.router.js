import express from 'express'
import * as charactersController from '../controllers/characters.controller.js'
import authMiddleware from '../middlewares/auth.js'
import { authorizeRole } from '../middlewares/authorizeRole.js'
import { authorizeRoleOrSelf } from '../middlewares/authorizeRoleOrSelf.js'
import { verifyOwnershipOrAdmin } from '../middlewares/authorizeRoleOrOwner.js'

const router = express.Router()

router.get('/', charactersController.getCharacters)
router.get('/:id', charactersController.getCharacterById)
router.delete('/:id', authMiddleware, verifyOwnershipOrAdmin , charactersController.deleteCharacter)
router.post('/', charactersController.createCharacter)
router.put('/:id', authMiddleware, verifyOwnershipOrAdmin, charactersController.updateCharacter)
router.get('/:id/stats', charactersController.getCharacterStats)


router.get('/:id/basicStats', charactersController.getBasicCharacterStats)
router.get('/:id/hitpool', charactersController.getCharacterHitpool)
router.get('/:id/damage', charactersController.getCharacterAvgDamage)


export default router