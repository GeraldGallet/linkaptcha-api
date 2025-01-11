import {
  CreateLinkConfigurationModel,
  LinkConfigurationModel,
} from '../models';
import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

const dataFilePath = path.join(__dirname, 'linkConfigurations.json');

class LinkConfigurationRepository {
  private static instance: LinkConfigurationRepository;

  private constructor() {}

  public static getInstance(): LinkConfigurationRepository {
    if (!LinkConfigurationRepository.instance) {
      LinkConfigurationRepository.instance = new LinkConfigurationRepository();
    }
    return LinkConfigurationRepository.instance;
  }

  /**
   * Stores a LinkConfigurationModel object.
   * @param config The LinkConfigurationModel object to store.
   */
  public async storeLinkConfiguration(config: CreateLinkConfigurationModel): Promise<LinkConfigurationModel> {
    const newLinkConfiguration = { ...config, token: v4() }

    console.log(newLinkConfiguration)
    const existingData = this.readLinkConfigurations();
    existingData.push(newLinkConfiguration);
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

    return newLinkConfiguration
  }

  /**
   * Finds a LinkConfigurationModel by token.
   * @param token The token to search for.
   * @returns The LinkConfigurationModel object if found, otherwise undefined.
   */
  public findLinkConfigurationByToken(
    token: string,
  ): LinkConfigurationModel | undefined {
    const existingData = this.readLinkConfigurations();
    return existingData.find((config) => config.token === token);
  }

  /**
   * Checks if a token exists.
   * @param token The token to check.
   * @returns True if the token exists, otherwise false.
   */
  public tokenExists(token: string): boolean {
    const existingData = this.readLinkConfigurations();
    return existingData.some((config) => config.token === token);
  }

  private readLinkConfigurations(): LinkConfigurationModel[] {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data) as LinkConfigurationModel[];
  }
}

export const linkConfigurationRepository =
  LinkConfigurationRepository.getInstance();
