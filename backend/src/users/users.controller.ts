import {
  Controller,
  Res,
  Get,
  Body,
  Post,
  Query,
  Param,
  ParseIntPipe,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { EmailService } from 'src/emails/email.service';
import { EmailDto, UserProfileDto } from './dto/users.dto';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../files/file-uploading.utils';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  // @Post('/file')
  @Post('/:id/uploadImage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file, @Param('id') id : number) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
      UpdateImg: await this.usersService.findByNicknameAndUpdateImg(id, file.filename)
    };
    
    return response;
  }

  @Post('/files')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @ApiOperation({ summary: 'todo: 이미지 업로드' })
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  


  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: '/app/files' });
  }

  @Get('/email')
  async secondAuth(@Query('email') email: string): Promise<boolean> {
    const user = await this.usersService.getUserByEmail(email);
    if (user === null) {
      return false;
    }
    await this.emailService.sendEmail(user.email, user.secondAuthCode);
    // await this.emailService.sendEmail('dudns0503@naver.com');
    return true;
  }

  @Post('/emailVerify')
  async checkVerity(
    @Query('email') email: string,
    @Body('code') code: number,
  ): Promise<boolean> {
    const user = await this.usersService.getUserByEmail(email);
    return user.secondAuthCode === code;
  }

  @Post('/emailAuthSetup')
  async codeSetup(@Body() emailDto: EmailDto): Promise<void> {
    this.usersService.toggleSecondAuth(emailDto.email);
  }

  @ApiOperation({ summary: '유저 목록 가져오기' })
  @Get('')
  async getUsers(): Promise<User[]> {
    const ret = await this.usersService.getUsers();
    return ret;
  }

  @ApiOperation({ summary: '특정 유저의 정보 조회' })
  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserProfileDto> {
    const user = await this.usersService.getUserById(id);

    return user;
  }

  @ApiOperation({ summary: '친구 추가' })
  @Post(':id/friends')
  async addFriend(
    @Param('id', ParseIntPipe) myId: number,
    @Body('targetId', ParseIntPipe) targetId: number,
  ): Promise<void> {
    await this.usersService.addFriend(myId, targetId);
  }
}
