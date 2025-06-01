import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  HttpError,
  HttpMethod,
  RequestQuery,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Town, Component } from '../../types/index.js';
import { CreateOfferDto, OfferRdo, OfferService } from './index.js';
import { fillDTO } from '../../helpers/index.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ParamTown } from './type/param-town.type.js';
import { CommentRdo, CommentService } from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService)
    private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
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
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
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
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
  }

  public async index(
    { query }: Request<RequestQuery>,
    res: Response
  ): Promise<void> {
    const limit = parseInt(query.limit as string, 10);
    const offers = await this.offerService.find(limit);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  async show({ params }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  async update(
    { body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(
      params.offerId,
      body
    );

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  async delete(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;

    const offer = await this.offerService.deleteById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }
    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  async getPremium({ params }: Request<ParamTown>, res: Response) {
    const city = params.town as Town;
    const offers = await this.offerService.findPremiumOffersByCity(city);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getComments(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    if (!(await this.offerService.exists(params.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
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
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found',
        'OfferController'
      );
    }
    this.created(res, fillDTO(OfferRdo, offer));
  }

  async removeFavorite(req: Request, res: Response) {
    await this.offerService.deleteFavorite(
      req.params.offerId,
      req.body?.userId
    );
    this.noContent(res, {});
  }
}
