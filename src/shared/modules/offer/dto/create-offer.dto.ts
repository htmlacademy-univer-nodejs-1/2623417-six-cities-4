import { Amenities } from '../../../types/amenities.enum.js';
import { Town } from '../../../types/town.enum.js';
import { ApartmentType } from '../../../types/apartment-type.enum.js';


export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public price!: number;
  public town!: Town;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  // public isFavorite!: boolean;
  public rate!: number;
  public type!: ApartmentType;
  public bedrooms!: number;
  public maxAdults!: number;
  public amenities!: Amenities[];
  public host!: string;
}
