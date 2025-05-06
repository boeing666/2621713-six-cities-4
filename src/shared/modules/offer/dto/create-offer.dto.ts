import {
  City,
  Amenity,
  HouseType,
  Coordinates,
  User
} from '../../../types/index.js';

export class CreateOfferDto {
  title!: string;
  description!: string;
  image!: string;
  date!: Date;
  cost!: number;
  city!: City;
  gallery!: string[];
  isPremium!: boolean;
  isFavorite!: boolean;
  rating!: number;
  apartmentType!: HouseType;
  roomCount!: number;
  guestCount!: number;
  amenities!: Amenity[];
  owner!: User;
  commentsCount!: number;
  coordinates!: Coordinates;
}
