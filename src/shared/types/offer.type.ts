import { User } from './user.type.js';
import { AppartmentType } from './appartment-type.enum.js';
import { Amenities } from './amenities.enum.js';
import { Town } from './town.enum.js';
import { Coordinates } from './coordinates.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  town: Town;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rate: number;
  type: AppartmentType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  amenities: Amenities[];
  userId: User;
  comments: number;
  location: Coordinates;
};
