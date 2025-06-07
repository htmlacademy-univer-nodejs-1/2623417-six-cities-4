import { Amenities, Town, AppartmentType } from '../../../types/index.js';

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
  type!: AppartmentType;
  bedrooms!: number;
  maxAdults!: number;
  price!: number;
  amenities!: Amenities[];
  latitude!: number;
  longitude!: number;
  isFavorite!: boolean;
}
