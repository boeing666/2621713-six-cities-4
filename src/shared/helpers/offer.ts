import {
  City,
  Amenity,
  HouseType,
  Offer,
  User,
  UserType,
  Coordinates
} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewPath,
    imagePaths,
    isPremium,
    isFavorites,
    rating,
    houseType,
    roomsCount,
    guestCount,
    rentalCost,
    amenities,
    username,
    mail,
    avatar,
    userType,
    commentsCount,
    rawCoordinates
  ] = offerData.replace('\n', '').split('\t');

  const coordinates: Coordinates = {
    latitude: Number(rawCoordinates.split(';')[0]),
    longitude: Number(rawCoordinates.split(';')[1]),
  };

  const user: User = {
    name: username,
    mail,
    avatar,
    type: UserType[userType as keyof typeof UserType] ?? undefined,
  };

  return {
    title,
    description,
    date: new Date(postDate),
    city: City[city as keyof typeof City] ?? City.Paris,
    image: previewPath,
    gallery: imagePaths.split(','),
    isPremium: isPremium === 'true',
    isFavorite: isFavorites === 'true',
    rating: Number(rating),
    apartmentType: HouseType[houseType as keyof typeof HouseType] ?? HouseType.apartment,
    roomCount: Number(roomsCount),
    guestCount: Number(guestCount),
    cost: Number(rentalCost),
    amenities: amenities.split(';') as Amenity[],
    owner: user,
    commentsCount: Number(commentsCount),
    coordinates: coordinates
  };
}
