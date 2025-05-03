import { Container } from 'inversify';
import { UserService } from './user-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultUserService } from './default-user.service.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './index.js';

export function createUserContainer(container: Container) {

  container
    .bind<UserService>(Component.UserService)
    .to(DefaultUserService)
    .inSingletonScope();
  container
    .bind<types.ModelType<UserEntity>>(Component.UserModel)
    .toConstantValue(UserModel);

}
