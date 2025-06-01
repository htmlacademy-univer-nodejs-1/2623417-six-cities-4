import { ParamsDictionary } from 'express-serve-static-core';
import { Town } from '../../../types/town.enum.js';

export type ParamTown =
  | {
      town: Town;
    }
  | ParamsDictionary;
