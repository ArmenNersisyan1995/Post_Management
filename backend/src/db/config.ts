import { Sequelize } from 'sequelize';
import { StatusCodes } from 'http-status-codes';

import environment from 'resources/constants/environment';
import logger from 'logger';
import { ApiError } from 'resources/types';

const sequelize = new Sequelize({
  host: environment.DB_HOST,
  username: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
  dialect: 'postgres',
});

sequelize.authenticate().then(() => {
  logger.info('Connection has been stablished successfully.');
}).catch((err) => {
  const error = new ApiError({
    message: err.message,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    name: 'Database Error',
  });
  logger.error(error);
});

export default sequelize;
