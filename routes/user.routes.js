import express from 'express';
import { register, login, getProfile, logout } from '../controllers/user.controller.js';
import isLoggedIn from '../middlewares/authentication.js';



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', isLoggedIn, getProfile);
router.get('/logout', isLoggedIn, logout);


export default router;