import {City, Facilities, HouseType, Offer, User, UserType} from '../types/index.js';

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
    facilities,
    username,
    mail,
    avatar,
    userType,
    commentsCount,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user: User = {
    name: username,
    mail,
    avatar,
    type: UserType[userType as keyof typeof UserType] ?? undefined,
  };

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: City[city as keyof typeof City] ?? undefined,
    previewPath,
    imagePaths: imagePaths.split('; '),
    isPremium: isPremium === 'true',
    isFavorites: isFavorites === 'true',
    rating: Number(rating),
    houseType: HouseType[houseType as keyof typeof HouseType] ?? undefined,
    roomsCount: Number(roomsCount),
    guestCount: Number(guestCount),
    rentalCost: Number(rentalCost),
    facilities: facilities.split('; ').map((facility) => Facilities[facility as keyof typeof Facilities]) ?? [],
    user,
    commentsCount: Number(commentsCount),
    coordinates: coordinates.split('; ').map(Number) as [number, number]
  };
}
