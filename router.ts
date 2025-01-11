import {
  findLinkConfigurationByTokenController,
  storeLinkConfigurationController,
  tokenExistsController,
} from './controllers/linkConfiguration.controller';
import { Express } from 'express';
import { logRequestsMiddleware } from './middlewares';
import { logger } from './common';

export const router = (app: Express) => {
  app.use(logRequestsMiddleware);

  app.post('/linkConfigurations', storeLinkConfigurationController.handle);
  app.get(
    '/linkConfigurations/:token',
    findLinkConfigurationByTokenController.handle,
  );
  app.get('/linkConfigurations/exists/:token', tokenExistsController.handle);

  const routes = app._router.stack
    .filter((r: any) => r.route) // only get routes
    .map((r: any) => {
      return {
        method: Object.keys(r.route.methods).join(', ').toUpperCase(),
        path: r.route.path,
      };
    });

  logger.info('Available routes:');
  routes.forEach((route: any) => {
    logger.info(`${route.method} ${route.path}`);
  });
};
