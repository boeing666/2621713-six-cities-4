import { City } from './city.enum.js';
import { HouseType } from './house-type.enum.js';
import { Amenity } from './facilities.type.js';
import { User } from './user.type.js';
import { Coordinates } from './coordinates.js';

export type Offer = {
  title: string;
  description: string;
  image: string;
  date: Date;
  cost: number;
  city: City;
  gallery: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  apartmentType: HouseType;
  roomCount: number;
  guestCount: number;
  amenities: Amenity[];
  owner: User;
  commentsCount: number;
  coordinates: Coordinates;
}

