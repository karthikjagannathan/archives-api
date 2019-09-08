/**
 * test - /health
 */

import config from 'config';
import * as chai from 'chai';
import chaiHttp = require('chai-http'); // es6 module syntax is not supported in chai-http

chai.use(chaiHttp);
import { request, expect } from 'chai';

const host = process.env.HOST || config.get('host');
const port = process.env.PORT || config.get('port');
const url = `http://${host}:${port}`;

describe('/health', () => {
  it('should get success response', async () => {
    const response = await request(url).get('/health');
    expect(response).to.have.status(200);
    expect(response.text).to.equal('Server is up!');
  });
});
