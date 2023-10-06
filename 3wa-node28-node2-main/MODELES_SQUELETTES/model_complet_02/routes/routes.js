import { Router } from 'express';
import HomeController from '../controllers/home.js';
import { LoginController, LogoutController } from '../controllers/login.js';

const appRouter = Router()

appRouter.get("/", isNotLogged, HomeController);
appRouter.post("/login", LoginController);
appRouter.get('/logout', authGuard, LogoutController);

export default appRouter;
