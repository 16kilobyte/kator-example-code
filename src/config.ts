import dotenv from 'dotenv';

dotenv.config();

export type IConfig = {
  databaseUrl: string;
  dbEntitiesPath: string[];
  debugLogging: boolean;
  dropDbSchema: boolean;
  synchronizeDbOnRestart: boolean;
};

const isDevMode = process.env.NODE_ENV !== 'production';

export const config: IConfig = {
  databaseUrl: process.env.DATABASE_URL,
  dbEntitiesPath: [
    ...isDevMode ? ['src/entities/**/*.ts'] : ['dist/entities/**/*.js'],
  ],
  debugLogging: process.env.DB_LOGGING === 'true',
  dropDbSchema: process.env.DB_DROP_SCHEMA === 'true',
  synchronizeDbOnRestart: process.env.DB_FORCE === 'true',
};
