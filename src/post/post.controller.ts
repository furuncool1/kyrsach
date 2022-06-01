import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Request, Res, SetMetadata, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { CreatePostDto } from "./dto/create.post.dto";
import { PostService } from "./service/post.service";
import { User } from "src/user/entity/user.entity";
import { RolesGuard } from "src/user/midleware/role.midleware";


@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }


  @Get('/post')
  index(@Request() req) {

    return this.postService.paginate()
  }

  @SetMetadata('roles', ['admin', 'author'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/post')
  async create(@Body() dto: CreatePostDto, @Request() req) {
    return await this.postService.createPost(dto, req.user.id);
  }

  @SetMetadata('roles', ['admin', 'author'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post("/post/:id")
  async updatePost(
    @Res() resp: Response,
    @Param('id')
    id: number,
    @Body()
    dto: CreatePostDto,
    @Request() req) {
    try {
      await this.postService.updatePost(dto, id);
      return resp.status(HttpStatus.OK).json({ text: 'ok' });
    } catch (e) {
      console.log(e);
      return resp.status(HttpStatus.NOT_FOUND).json({ text: "Not Found" });
    }
  }


  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Delete('/post/:id')
  async delete(@Res() resp: Response, @Param('id') id: number) {
    await this.postService.deletePost(id);
    return resp.status(HttpStatus.OK).json({ text: 'ok' });
  }


}