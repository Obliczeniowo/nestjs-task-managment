import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFiles(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000, message: 'Maksymalny rozmiar pliku 1kB' }),
        new FileTypeValidator({ fileType: 'application/octet-stream' }),
      ],
    })
  ) file: Array<Express.Multer.File>): void {
    console.log(file);
  }
}
