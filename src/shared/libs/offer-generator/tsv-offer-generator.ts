import dayjs from 'dayjs';

import { TownType, Amenities, ApartmentType, MockServerData, UserType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

import { OfferGenerator } from './offer-generator.interface.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100_000;

const FIRST_WEE_DAY = 1;
const LAST_WEE_DAY = 7;

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.title);
    const description = getRandomItem(this.mockData.description);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEE_DAY, LAST_WEE_DAY), 'day').toISOString();
    const town = getRandomItem(Object.values(TownType));
    const previewPath = getRandomItem(this.mockData.houseImages);
    const imagePaths = getRandomItems(this.mockData.houseImages).join(', ');
    const isPremium = generateRandomValue(0, 1) ? 'true' : 'false';
    const isFavorites = generateRandomValue(0, 1) ? 'true' : 'false';
    const rating = generateRandomValue(1, 5);
    const apartmentType = getRandomItem(Object.values(ApartmentType));
    const roomsCount = generateRandomValue(1, 8);
    const guestCount = generateRandomValue(1, 8);
    const rentalCost = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const amenities = getRandomItem(Object.values(Amenities));
    const commentsCount = 0;
    const coordinates = [
      generateRandomValue(0, 10, 3),
      generateRandomValue(0, 10, 3)
    ].join('; ');
    const username = getRandomItem(this.mockData.username);
    const email = getRandomItem(this.mockData.email);
    const avatarPath = getRandomItem(this.mockData.avatarImage);
    const userType = getRandomItem(Object.keys(UserType));

    return [
      title, description, postDate, town,
      previewPath, imagePaths, isPremium, isFavorites,
      rating, apartmentType , roomsCount, guestCount,
      rentalCost, amenities,
      username, email, avatarPath, userType,
      commentsCount, coordinates
    ].join('\t');
  }
}
