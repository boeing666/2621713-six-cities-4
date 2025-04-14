import { City, Facilities, HouseType } from '../../../types/index.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public image!: string;
  public date!: Date;
  public cost!: number;
  public town!: City;
  public gallery!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public apartmentType!: HouseType;
  public roomCount!: number;
  public guestCount!: number;
  public amenities!: Facilities[];
  public userId!: string;
}
