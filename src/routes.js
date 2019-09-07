import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import DeveloperController from './app/controllers/DeveloperController';
import TeamController from './app/controllers/TeamController';
import TeamDeveloperController from './app/controllers/TeamDeveloperController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/developers', DeveloperController.index);
routes.get('/developers/:id', DeveloperController.show);
routes.post('/developers', DeveloperController.store);
routes.delete('/developers/:id', DeveloperController.delete);

routes.get('/teams', TeamController.index);
routes.post('/teams', TeamController.store);
routes.put('/teams/:id', TeamController.update);
routes.delete('/teams/:id', TeamController.delete);

routes.get('/teams/:teamId/member', TeamDeveloperController.index);
routes.post('/teams/:teamId/member', TeamDeveloperController.store);
routes.put('/teams/:teamId/member/:id', TeamDeveloperController.update);
routes.delete('/teams/:teamId/member/:id', TeamDeveloperController.delete);

export default routes;
