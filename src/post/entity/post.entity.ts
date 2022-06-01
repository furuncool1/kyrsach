import { User } from 'src/user/entity/user.entity';
import { 
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn, 
  } from 'typeorm';

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:String

    @Column()
    content:String

    @CreateDateColumn()
    created_at:Date

    @ManyToOne(()=>User, (user) => user.posts)
    author:User

}
  
  
  