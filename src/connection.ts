import { createConnection } from 'typeorm';

import { config } from './config';

export const connection = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: config.databaseUrl,
    synchronize: config.synchronizeDbOnRestart,
    logging: config.debugLogging,
    dropSchema: config.dropDbSchema,
    entities: config.dbEntitiesPath,
  });

  return conn;
};
