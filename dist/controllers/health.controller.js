"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as utils from '../helpers/util';
// const logger = utils.getLogger(__filename);
const getHealth = (req, res) => {
    //logger.info()
    res.status(200).send('Server is up!');
};
exports.getHealth = getHealth;
