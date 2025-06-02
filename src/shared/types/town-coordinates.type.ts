import { Coordinates } from './coordinates.type.js';
import { Town } from './town.enum.js';

export type TownCoordinates = Record<Town, Coordinates>;
