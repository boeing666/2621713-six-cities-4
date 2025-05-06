import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { City } from '../../types/city.enum.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;

  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  exists(documentId: string): Promise<boolean>;

  findPremiumOffersByCity(
    city: City,
    userId?: string
  ): Promise<DocumentType<OfferEntity>[]>;

  getUserFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;

  addFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity>>;

  deleteFavorite(userId: string, offerId: string): Promise<void>;

  updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
