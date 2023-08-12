import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('test/file')
export class TestFileController {
  constructor(private configService: ConfigService) {}

  @Get('/')
  index() {
    return {
      name: 'hi',
      timestamp: new Date(),
      testVariable: this.configService.get<string>('TEST_VARIABLE'),
    };
  }

  @Post('/fileUploadSingle')
  @UseInterceptors(FileInterceptor('my_file'))
  fileUploadSingle(@UploadedFile() my_file: Express.Multer.File) {
    console.log('@my_file', my_file);
    return {
      my_file,
    };
  }

  @Post('/fileUploadMultiple')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'my_files', maxCount: 3 },
      { name: 'other_files', maxCount: 3 },
    ]),
  )
  fileUploadMultiple(
    @UploadedFiles()
    fieldNamesRecord: Record<string, Array<Express.Multer.File>>,
  ) {
    console.log('@fieldNamesRecord', fieldNamesRecord);
    return Object.entries(fieldNamesRecord).map(([fieldName, files]) => {
      return {
        fieldName,
        files: files.map((file) => {
          return {
            originalname: file.originalname,
          };
        }),
      };
    });
  }

  @Post('/fileUploadAny')
  @UseInterceptors(AnyFilesInterceptor())
  fileUploadAny(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('@files', files);
    return files.map((x) => ({
      fieldname: x.fieldname,
      originalname: x.originalname,
    }));
  }

  @Post('/fileUploadSingleWithOtherJsonData')
  @UseInterceptors(FileInterceptor('my_file'))
  fileUploadSingleWithOtherJsonData(
    @UploadedFile() my_file: Express.Multer.File,
    @Body('my_json', {
      transform: (value: string, metadata: any) => {
        console.log('@metadata', metadata);
        return JSON.parse(value);
      },
    })
    my_json: { name: string },
    // @Body('my_json') my_json: { name: string },
  ) {
    console.log('@my_file', my_file);
    console.log('@my_json', my_json);
    return {
      my_file: {
        originalname: my_file.originalname,
      },
      my_json,
    };
  }
}
