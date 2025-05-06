import { Expose, Type } from 'class-transformer';
import { Amenity, City, Coordinates, HouseType } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose({ name: 'date' })
  public postDate: string;

  @Expose({ name: 'image' })
  public previewImage: string;

  @Expose({ name: 'gallery' })
  public images: string[];

  @Expose()
  public city: City;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rate: number;

  @Expose()
  public type: HouseType;

  @Expose()
  public roomsCount: number;

  @Expose()
  public guestCount: number;

  @Expose()
  public price: number;

  @Expose()
  public amenities: Amenity[];

  @Expose()
  @Type(() => UserRdo)
  public owner: UserRdo;

  @Expose()
  public commentsCount: number;

  @Expose()
  @Type(() => Coordinates)
  public coordinates: Coordinates;
}
