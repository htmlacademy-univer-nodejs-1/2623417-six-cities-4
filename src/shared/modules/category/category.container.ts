import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { CategoryService } from './category-service.interface.js';
import { DefaultCategoryService } from './category.service.js';
import { CategoryEntity, CategoryModel } from './category.entity.js';

export function createCategoryContainer(container: Container) {
  container.bind<CategoryService>(Component.CategoryService).to(DefaultCategoryService);
  container.bind<types.ModelType<CategoryEntity>>(Component.CategoryModel).toConstantValue(CategoryModel);

}
