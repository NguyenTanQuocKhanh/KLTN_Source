import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { FileType } from './file.constant';
import { getVideoDuration } from 'src/utils/get-duration-video-file';
import { get } from 'lodash';

@Injectable()
export class FilesService extends BaseService<
  FileEntity,
  Repository<FileEntity>
> {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {
    super(fileRepository, 'super');
  }

  async uploadFile(file): Promise<FileEntity> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const filePath = (get(file, 'path', '') as string).replace(/\\/g, '/');
    const path = {
      local: `/${this.configService.get('app.apiPrefix')}/v1/${filePath}`,
      s3: file.location,
    };

    const fileEntity = await this.fileRepository.save(
      this.fileRepository.create({
        path: path[this.configService.get('file.driver')],
      }),
    );

    const fileExtention = file.path.split('.').pop();
    let type = FileType.IMAGE;
    if (['mp4'].includes(fileExtention)) {
      type = FileType.VIDEO;
      const duration = await getVideoDuration(file.path);
      fileEntity.duration = Math.floor(duration);
    }
    fileEntity.type = type;

    return this.fileRepository.save(this.fileRepository.create(fileEntity));
  }

  async uploadFiles(files): Promise<FileEntity[]> {
    const uploadPromise = files?.map((file) => this.uploadFile(file));
    return await Promise.all(uploadPromise);
  }
}
