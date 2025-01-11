import { Request, Response } from 'express';
import {
  storeLinkConfigurationUseCase,
  findLinkConfigurationByTokenUseCase,
  tokenExistsUseCase,
} from '../useCases';
import { CreateLinkConfigurationModel } from '../models/linkConfiguration.model';

class StoreLinkConfigurationController {
  public async handle(req: Request, res: Response) {
    const config: CreateLinkConfigurationModel = req.body;
    const result = await storeLinkConfigurationUseCase.handle(config);
    
    res
      .status(201)
      .send({ message: 'Link configuration stored successfully.', data: result });
  }
}

class FindLinkConfigurationByTokenController {
  public handle(req: Request, res: Response) {
    const { token } = req.params;
    const config = findLinkConfigurationByTokenUseCase.handle(token);
    if (config) {
      res.status(200).send(config);
    } else {
      res.status(404).send({ message: 'Link configuration not found.' });
    }
  }
}

class TokenExistsController {
  public handle(req: Request, res: Response) {
    const { token } = req.params;
    const exists = tokenExistsUseCase.handle(token);
    res.status(200).send({ exists });
  }
}

// Exporting the controllers
export const storeLinkConfigurationController =
  new StoreLinkConfigurationController();
export const findLinkConfigurationByTokenController =
  new FindLinkConfigurationByTokenController();
export const tokenExistsController = new TokenExistsController();
