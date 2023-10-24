import { Router } from 'express';
import HomeController from '../controllers/home.js';
import { authGuard, setTemplateVars } from '../middlewares/session.js';
import { LoginController, LogoutController } from '../controllers/login.js';
import { RegisterController } from '../controllers/register.js';

const appRouter = Router()
appRouter.use(setTemplateVars)

appRouter.get("/", authGuard, HomeController);
appRouter.post("/login", LoginController);
appRouter.get('/logout', authGuard, LogoutController);
appRouter.post("/register", RegisterController);

export default appRouter;
