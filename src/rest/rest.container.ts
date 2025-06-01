import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../shared/libs/database-client/index.js';
import { AppExceptionFilter, ExceptionFilter } from '../shared/libs/rest/index.js';

export function createRestApplicationContainer(container: Container) {

  container
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  container
    .bind<Logger>(Component.Logger)
    .to(PinoLogger)
    .inSingletonScope();
  container
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  container
    .bind<DatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();
  container
    .bind<ExceptionFilter>(Component.ExceptionFilter)
    .to(AppExceptionFilter)
    .inSingletonScope();

  return container;
}
