import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  Max,
  MaxLength,
  Min,
  MinLength,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Amenities } from '../../../types/amenities.enum.js';
import { Town } from '../../../types/town.enum.js';
import { AppartmentType } from '../../../types/appartment-type.enum.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsNotEmpty()
  @MinLength(20, {
    message: CreateOfferValidationMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferValidationMessage.description.maxLength,
  })
  public description: string;

  @IsNotEmpty()
  @IsEnum(Town, { message: CreateOfferValidationMessage.town.invalid })
  public town: Town;

  @IsNotEmpty({ message: CreateOfferValidationMessage.image.empty })
  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.count })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.images.count })
  @IsNotEmpty({ each: true })
  public images: string[];

  @IsNotEmpty()
  @IsBoolean()
  public isPremium: boolean;

  @IsNotEmpty()
  @IsEnum(AppartmentType, { message: CreateOfferValidationMessage.type.invalid })
  public type: AppartmentType;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.min })
  @Max(100000, { message: CreateOfferValidationMessage.price.max })
  public price: number;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsEnum(Amenities, {
    each: true,
    message: CreateOfferValidationMessage.amenities.invalidValue,
  })
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.amenities.minSize })
  public amenities: Amenities[];

  @IsNotEmpty()
  public userId: string;
}
