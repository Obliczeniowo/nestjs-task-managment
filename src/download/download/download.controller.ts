import { Controller, Get, Header, Param, Res, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream, } from 'fs';
import { join } from 'path';

@Controller('download')
export class DownloadController {
  constructor(private config: ConfigService) {
  }

  // @Header('Content-Type', 'application/octet-stream')
  // @Header('Content-Disposition', 'attachment; filename="file.py"')
  @Get(':filename')
  downloadFile(@Param('filename') filename: string, @Res() res) {
    const path = join(process.cwd(), this.config.get('MULTER_DEST'.replace('./', '')), filename)
    const file = createReadStream(path);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`
    });
    file.pipe(res);
    // res.sendFile(path); // way with express installed
  }
}
