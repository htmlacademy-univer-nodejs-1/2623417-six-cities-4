import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { Town } from '../../types/town.enum.js';
import { DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(
    offerId: string,
    userId?: string
  ): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number, userId?: string): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  findPremiumOffersByTown(
    town: Town,
    userId?: string
  ): Promise<DocumentType<OfferEntity>[]>;
  getUserFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  addFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity>>;
  deleteFavorite(userId: string, offerId: string): Promise<void>;
  updateRate(offerId: string): Promise<void>;
}
