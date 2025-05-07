import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { Logger } from '../../libs/logger/index.js';
import { City, Component } from '../../types/index.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { StatusCodes } from 'http-status-codes';
import { BaseController, DocumentExistsMiddleware, HttpError, HttpMethod, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../../rest/libs/index.js';
import { CreateOfferDto, OfferRdo, OfferService } from './index.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { fillDTO } from '../../helpers/common.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger)
    protected readonly logger: Logger,

    @inject(Component.OfferService)
    private readonly offerService: OfferService,

    @inject(Component.CommentService)
    private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:city/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const limit = parseInt(req.query.limit as string, 10) || DEFAULT_OFFER_COUNT;
    const offers = await this.offerService.findAll(limit, req.body?.userId);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body } : CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  async show(req: Request, res: Response) {
    const offer = await this.offerService.findById(req.params.offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  async update(req: Request, res: Response) {
    const updatedOffer = await this.offerService.updateById(
      req.params.offerId,
      req.body
    );

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  async delete(req: Request, res: Response) {
    const offerId = req.params.offerId;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  async getPremium(req: Request, res: Response) {
    const city = req.params.city as City;
    const offers = await this.offerService.findPremiumOffersByCity(
      city,
      req.body?.userId
    );
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async getFavorites(req: Request, res: Response) {
    const offers = await this.offerService.getUserFavorites(req.body?.userId);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async addFavorite(req: Request, res: Response) {
    const offer = await this.offerService.addFavorite(
      req.params.offerId,
      req.body?.userId
    );
    this.created(res, fillDTO(OfferRdo, offer));
  }

  async removeFavorite(req: Request, res: Response) {
    await this.offerService.deleteFavorite(
      req.params.offerId,
      req.body?.userId
    );
    this.noContent(res, {});
  }

  async getComments(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
