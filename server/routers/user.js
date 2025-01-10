import e from "express";
import { verifyToken } from "../middleware/auth";
import {getUser, getUserFriends, addRemoveFriend} from '../controllers/users.js'

const router = express.Router();

router.get('/:id', verifyToken, getUser )
router.get('/:id/friends', verifyToken, getUserFriends)

router.patch('/:id/:friendId', verifyToken, addRemoveFriend )

export default router;