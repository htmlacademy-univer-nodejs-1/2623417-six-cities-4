import { Amenities, Town, ApartmentType } from '../../../types/index.js';

export class OfferResponseDto {
  id!: string;
  title!: string;
  description!: string;
  postDate!: Date;
  previewImage!: string;
  images!: string[];
  town!: Town;
  isPremium!: boolean;
  rate!: number;
  type!: ApartmentType;
  bedrooms!: number;
  maxAdults!: number;
  price!: number;
  amenities!: Amenities[];
  isFavorite!: boolean;
}
