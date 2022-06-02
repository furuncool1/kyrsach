
import { Post } from 'src/post/entity/post.entity';
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  ManyToOne,
  Index, 
  OneToMany
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name:string;

  @Column({unique:true})
  email:string;
  
  @Index()
  @Column()
  password:string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[]

}


