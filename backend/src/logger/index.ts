import fs from 'fs';
import path from 'path';
import { Logger } from 'tslog';

import { getCurrentDate } from 'utils';
import { APIError, LogLevel } from 'resources/types';

const tsLog = new Logger();

const writeIntoFile = (logObj: { message: string, level: LogLevel }) => {
  const dateISO: string = getCurrentDate();
  const filename = `${dateISO}.log`;
  fs.appendFile(
    path.join(__dirname, '../log', filename),
    `${JSON.stringify(logObj)}\n`,
    (err: Error | null) => {
      /* eslint-disable no-console */
      if (err) console.error(`Error writing file: ${filename}`);
    },
  );
};

const info = (message: string) => {
  writeIntoFile({ message, level: 'info' });
  tsLog.info(JSON.stringify(message));
};

const warn = (apiError: APIError) => {
  const { message } = apiError;
  writeIntoFile({ message, level: 'warn' });
  tsLog.warn(JSON.stringify(message));
};

const error = (apiError: APIError) => {
  const { message } = apiError;
  writeIntoFile({ message, level: 'error' });
  tsLog.error(JSON.stringify(message));
};

export default { info, warn, error };
