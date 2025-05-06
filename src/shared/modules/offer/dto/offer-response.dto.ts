import {
  City,
  Amenity,
  HouseType,
  Coordinates,
  User
} from '../../../types/index.js';

export class OfferResponseDto {
  id!: string;
  title!: string;
  description!: string;
  image!: string;
  date!: Date;
  cost!: number;
  town!: City;
  gallery!: string[];
  isPremium!: boolean;
  isFavorite!: boolean;
  rating!: number;
  apartmentType!: HouseType;
  roomCount!: number;
  guestCount!: number;
  amenities!: Amenity[];
  owner: User;
  coordinates: Coordinates;
}
