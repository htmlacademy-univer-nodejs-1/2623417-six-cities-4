import { Expose, Type } from 'class-transformer';
import { Amenities, Town, AppartmentType } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose({ name: 'createdAt' })
  public postDate: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public town: Town;

  @Expose()
  public name: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rate: number;

  @Expose()
  public type: AppartmentType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public amenities: Amenities[];

  @Expose()
  public commentCount: number;

  @Expose()
  public latitude: number;

  @Expose()
  public longitude: number;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;
}
