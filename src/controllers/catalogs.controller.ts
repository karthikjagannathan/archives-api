/**
 * controller - /catalogs
 *
 */

import { Request, Response } from 'express';

// import { getDb } from '../db';
import * as utils from '../helpers/util.helper';
import { Catalog } from '../db/models/catalog.model';

const logger = utils.getLogger(__filename);

const getCatalogs = async (req: Request, res: Response): Promise<void> => {
  logger.info('getCatalogs');

  try {
    res.status(200).send(await Catalog.find());
  } catch (e) {
    logger.debug(e);
    res.status(400).send({
      error: e.message,
    });
  }
};

export { getCatalogs };
