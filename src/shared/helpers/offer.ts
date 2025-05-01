import { TownType, Amenities, ApartmentType, Offer, User, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    date,
    town,
    image,
    gallery,
    isPremium,
    isFavorite,
    rating,
    apartmentType,
    roomCount,
    guestCount,
    cost,
    amenities,
    username,
    mail,
    avatar,
    userType,
    commentCount,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const author: User = {
    name: username,
    mail,
    avatar,
    type: UserType[userType as keyof typeof UserType] ?? undefined,
    password: ''
  };

  return {
    title,
    description,
    date: new Date(date),
    town: TownType[town as keyof typeof TownType] ?? undefined,
    image,
    gallery: gallery.split('; '),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number(rating),
    apartmentType: ApartmentType[apartmentType as keyof typeof ApartmentType] ?? undefined,
    roomCount: Number(roomCount),
    guestCount: Number(guestCount),
    cost: Number(cost),
    amenities: amenities as Amenities,
    author,
    commentCount: Number(commentCount),
    coordinates: {
      latitude: Number(coordinates.split(';')[0]),
      longitude: Number(coordinates.split(';')[1])
    }
  };
}