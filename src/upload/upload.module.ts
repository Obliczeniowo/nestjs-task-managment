import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';

@Module({
  controllers: [UploadController],
  imports: [MulterModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => (
      {
        storage: diskStorage({
          destination: './uploaded-files',//configService.get<string>('MULTER_DEST'), // Tutaj podaj ścieżkę do folderu, gdzie chcesz zapisywać pliki
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            callback(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
          },
        }),
      }
    ),
    inject: [ConfigService],
  }),]
})
export class UploadModule { }
