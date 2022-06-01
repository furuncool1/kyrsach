import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
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
      console.log(new Date().toDateString());
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
      const token = await this.authService.register(registerDto);
      if(token){
        return {
          accessToken:token
        }
      }

      throw new BadRequestException();
  }

}
