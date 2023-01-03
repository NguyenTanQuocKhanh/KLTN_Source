import { BadRequestException } from '@nestjs/common';
import * as path from 'path';

export const pngFileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (
    ![
      '.jpg',
      '.jpeg',
      '.jfif',
      '.pjpeg',
      '.pjp',
      '.avif',
      '.gif',
      '.png',
      '.mp4',
    ].includes(ext)
  ) {
    req.fileValidationError = 'Invalid file type';
    return callback(new BadRequestException('Invalid file type'), false);
  }
  return callback(null, true);
};
