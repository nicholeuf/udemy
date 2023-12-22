import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';

import { createCellsRouter } from './routes/cell';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    // Development mode w/ CRA dev server
    app.use(
      createProxyMiddleware({
        target: 'http://127.0.0.1:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    // When running production build on user's machine
    const packagePath = require.resolve(
      '@jsnotenlf/local-client/build/index.html'
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
