import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  IsNumber,
  Min,
  MinLength,
} from 'class-validator';
import { Amenities } from '../../../types/amenities.enum.js';
import { Town } from '../../../types/town.enum.js';
import { AppartmentType } from '../../../types/appartment-type.enum.js';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsEnum(Town, { message: CreateUpdateOfferMessage.town.invalid })
  public town?: Town;

  @IsOptional()
  @IsString({ message: CreateUpdateOfferMessage.image.invalidFormat })
  @MaxLength(256, { message: CreateUpdateOfferMessage.image.maxLength })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.images.invalidFormat })
  @Length(6, 6, { message: CreateUpdateOfferMessage.images.length })
  public images?: string[];

  @IsOptional()
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(AppartmentType, { message: CreateUpdateOfferMessage.type.invalidFormat })
  public type?: AppartmentType;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.bedrooms.min })
  @Max(8, { message: CreateUpdateOfferMessage.bedrooms.max })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.maxAdults.min })
  @Max(10, { message: CreateUpdateOfferMessage.maxAdults.max })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.price.min })
  @Max(100000, { message: CreateUpdateOfferMessage.price.max })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.amenities.invalidFormat })
  public amenities?: Amenities[];

  @IsOptional()
  @IsNumber({}, { message: CreateUpdateOfferMessage.latitude.invalidFormat })
  @Min(-90, { message: CreateUpdateOfferMessage.latitude.minValue })
  @Max(90, { message: CreateUpdateOfferMessage.latitude.maxValue })
  public latitude: number;

  @IsOptional()
  @IsNumber({}, { message: CreateUpdateOfferMessage.longitude.invalidFormat })
  @Min(-180, { message: CreateUpdateOfferMessage.longitude.minValue })
  @Max(180, { message: CreateUpdateOfferMessage.longitude.maxValue })
  public longitude: number;

  @IsOptional()
  public userId?: string;
}
