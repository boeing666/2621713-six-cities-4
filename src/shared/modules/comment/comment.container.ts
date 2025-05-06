import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { DefaultCommentService } from './default-comment.service.js';
import { CommentEntity, CommentModel, CommentService } from './index.js';
import { Component } from '../../types/index.js';

export function createCommentContainer() {
  const container = new Container();

  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return container;
}
