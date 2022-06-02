import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/registerDto';
import { AuthService } from './service/auth.service';



@Controller()
export class AuthController {
  constructor(
    private readonly authService:AuthService
  ) {}
  
  @Post('/login')
  async login(@Body() loginDto:LoginDto){

      const token = await this.authService.login(loginDto);
    
      if(token){
        return {
          accessToken:token
        }
      }

      throw new BadRequestException();
 
  }


  @Post('/register')
  async register(@Body() registerDto:RegisterDto){
      console.log('fassf');
      const token = await this.authService.register(registerDto);
      if(token){
        return {
          accessToken:token
        }
      }

      throw new BadRequestException();
  }

  @Get('/get-user')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Request() req){
    return req.user;
  }

}
