import {
  Offer,
  Town,
  Amenities,
  User,
  AppartmentType,
  UserType,
} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const fields = offerData.replace('\n', '').split('\t');
  if (fields.length !== 22) {
    console.error('Invalid field count', fields.length, fields);
    throw new Error('Invalid field count');
  }
  const [
    title,
    description,
    postDate,
    town,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rate,
    type,
    bedrooms,
    maxAdults,
    price,
    amenities,
    hostName,
    hostEmail,
    hostPassword,
    hostType,
    hostAvatarUrl,
    comments,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name: hostName || '',
    email: hostEmail || '',
    avatarUrl: hostAvatarUrl || '',
    password: hostPassword || '',
    type: (hostType as UserType) || UserType.Regular,
  } as User;

  return {
    title: title || '',
    description: description || '',
    postDate: new Date(postDate) || new Date(),
    town: (town as Town) || Town.Paris,
    previewImage: previewImage || '',
    images: images.split(',') || [],
    isPremium: Boolean(isPremium) || false,
    isFavorite: Boolean(isFavorite) || false,
    rate: Number(rate) || 0,
    type: (type as AppartmentType) || AppartmentType.Apartment,
    bedrooms: Number(bedrooms) || 0,
    maxAdults: Number(maxAdults) || 1,
    price: Number(price) || 0,
    amenities:
      amenities.split(',').map((amenity) => amenity as Amenities) || [],
    userId: user,
    comments: Number(comments) || 0,
    latitude: Number(latitude) || 0,
    longitude: Number(longitude) || 0,
  };
}
