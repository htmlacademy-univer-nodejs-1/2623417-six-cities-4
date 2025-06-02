import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader.ts/index.js';
import {
  createOffer,
  getErrorMessage,
  getMongoURI,
} from '../../shared/helpers/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import {
  DefaultOfferService,
  OfferModel,
  OfferService,
} from '../../shared/modules/offer/index.js';
import {
  DefaultUserService,
  UserModel,
  UserService,
} from '../../shared/modules/user/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { Offer } from '../../shared/types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { FavoriteModel } from '../../shared/modules/favorite/index.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(
      this.logger,
      OfferModel,
      FavoriteModel
    );
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number): void {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public getName(): string {
    return '--import';
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    console.log('Starting import with params:', {
      filename,
      login,
      host,
      dbname,
      salt,
    });
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.userId,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      previewImage: offer.previewImage,
      price: offer.price,
      type: offer.type,
      images: offer.images,
      town: offer.town,
      isPremium: offer.isPremium,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      amenities: offer.amenities,
      userId: user.id,
    });
  }
}
