import { setupServer as mswSetupServer } from 'msw/node';
import { getHandlers } from './handlers';

export const setupServer = (baseURL: string) =>
  mswSetupServer(...getHandlers({ baseURL: `${baseURL}` }));
