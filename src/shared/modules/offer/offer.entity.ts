import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { Town } from '../../types/town.enum.js';
import { AppartmentType } from '../../types/appartment-type.enum.js';
import { Amenities } from '../../types/amenities.enum.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ type: String, trim: true, required: true })
  public title!: string;

  @prop({ type: String, trim: true })
  public description!: string;

  @prop({ type: Date })
  public postDate!: Date;

  @prop({ type: String })
  public previewImage!: string;

  @prop({ type: () => [String] })
  public images!: string[];

  @prop({
    type: String,
    enum: Town,
  })
  public town!: Town;

  @prop({ type: Boolean })
  public isPremium!: boolean;

  @prop({ type: Boolean })
  public isFavorite!: boolean;

  @prop({ type: Number })
  public rate!: number;

  @prop({
    type: String,
    enum: AppartmentType,
  })
  public type!: AppartmentType;

  @prop({ type: Number })
  public bedrooms!: number;

  @prop({ type: Number })
  public maxAdults!: number;

  @prop({ type: Number })
  public price!: number;

  @prop({ type: () => [String], enum: Amenities })
  public amenities!: Amenities[];

  @prop({
    ref: () => UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
