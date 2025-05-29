import { IsNotEmpty, MinLength, MaxLength, ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsBoolean, IsInt, Max, Min, IsMongoId } from 'class-validator';
import {
  City,
  Amenity,
  HouseType,
  Coordinates,
  User
} from '../../../types/index.js';
import { CreateOfferMessages } from './create-offer.messages.js';

export class UpdateOfferDto {
  @IsNotEmpty()
  @MinLength(10, { message: CreateOfferMessages.title.minLength })
  @MaxLength(100, { message: CreateOfferMessages.title.maxLength })
  public title?: string;

  @IsNotEmpty()
  @MinLength(20, {
    message: CreateOfferMessages.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferMessages.description.maxLength,
  })
  public description?: string;

  @IsNotEmpty({ message: CreateOfferMessages.image.empty })
  public image?: string;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferMessages.price.invalidFormat })
  @Min(100, { message: CreateOfferMessages.price.minValue })
  @Max(100000, { message: CreateOfferMessages.price.maxValue })
  public cost?: number;

  @IsNotEmpty()
  @IsEnum(City, { message: CreateOfferMessages.city.invalid })
  public city?: City;

  @IsArray({ message: CreateOfferMessages.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferMessages.images.count })
  @ArrayMaxSize(6, { message: CreateOfferMessages.images.count })
  @IsNotEmpty({ each: true })
  public gallery?: string[];

  @IsNotEmpty()
  @IsBoolean()
  public isPremium?: boolean;

  @IsNotEmpty()
  @IsEnum(HouseType, { message: CreateOfferMessages.type.invalid })
  public apartmentType?: HouseType;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferMessages.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferMessages.bedrooms.minValue })
  @Max(8, { message: CreateOfferMessages.bedrooms.maxValue })
  public roomCount?: number;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferMessages.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferMessages.maxAdults.minValue })
  @Max(10, { message: CreateOfferMessages.maxAdults.maxValue })
  public guestCount?: number;

  @IsArray({ message: CreateOfferMessages.amenities.invalidFormat })
  @IsEnum(Amenity, {
    each: true,
    message: CreateOfferMessages.amenities.invalidValue,
  })
  @ArrayMinSize(1, { message: CreateOfferMessages.amenities.minSize })
  public amenities?: Amenity[];

  @IsNotEmpty()
  @IsMongoId({ message: CreateOfferMessages.userId.invalidId })
  public user?: User;

  @IsNotEmpty()
  public coordinates?: Coordinates;
}
