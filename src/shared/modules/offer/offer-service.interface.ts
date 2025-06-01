import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { Town } from '../../types/town.enum.js';

export interface OfferService {
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
  findPremiumOffersByCity(
    town: Town,
    userId?: string
  ): Promise<DocumentType<OfferEntity>[]>;
  getUserFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  addFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity>>;
  deleteFavorite(userId: string, offerId: string): Promise<void>;
  // updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
