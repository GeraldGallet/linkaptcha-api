import {
  CreateLinkConfigurationModel,
  LinkConfigurationModel,
} from '../models';
import { linkConfigurationRepository } from '../repositories';

class StoreLinkConfigurationUseCase {
  private static instance: StoreLinkConfigurationUseCase;

  private constructor() {}

  public static getInstance(): StoreLinkConfigurationUseCase {
    if (!StoreLinkConfigurationUseCase.instance) {
      StoreLinkConfigurationUseCase.instance =
        new StoreLinkConfigurationUseCase();
    }
    return StoreLinkConfigurationUseCase.instance;
  }

  /**
   * Handles the storage of a LinkConfigurationModel object.
   * @param config The LinkConfigurationModel object to store.
   */
  public handle(config: CreateLinkConfigurationModel): Promise<LinkConfigurationModel> {
    return linkConfigurationRepository.storeLinkConfiguration(config);
  }
}

class FindLinkConfigurationByTokenUseCase {
  private static instance: FindLinkConfigurationByTokenUseCase;

  private constructor() {}

  public static getInstance(): FindLinkConfigurationByTokenUseCase {
    if (!FindLinkConfigurationByTokenUseCase.instance) {
      FindLinkConfigurationByTokenUseCase.instance =
        new FindLinkConfigurationByTokenUseCase();
    }
    return FindLinkConfigurationByTokenUseCase.instance;
  }

  /**
   * Handles the retrieval of a LinkConfigurationModel by token.
   * @param token The token to search for.
   * @returns The LinkConfigurationModel object if found, otherwise undefined.
   */
  public handle(token: string): LinkConfigurationModel | undefined {
    return linkConfigurationRepository.findLinkConfigurationByToken(token);
  }
}

class TokenExistsUseCase {
  private static instance: TokenExistsUseCase;

  private constructor() {}

  public static getInstance(): TokenExistsUseCase {
    if (!TokenExistsUseCase.instance) {
      TokenExistsUseCase.instance = new TokenExistsUseCase();
    }
    return TokenExistsUseCase.instance;
  }

  /**
   * Handles the check for the existence of a token.
   * @param token The token to check.
   * @returns True if the token exists, otherwise false.
   */
  public handle(token: string): boolean {
    return linkConfigurationRepository.tokenExists(token);
  }
}

export const storeLinkConfigurationUseCase =
  StoreLinkConfigurationUseCase.getInstance();
export const findLinkConfigurationByTokenUseCase =
  FindLinkConfigurationByTokenUseCase.getInstance();
export const tokenExistsUseCase = TokenExistsUseCase.getInstance();
