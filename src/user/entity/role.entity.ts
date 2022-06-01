import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    Index, 
    OneToMany
  } from 'typeorm';
  import { User } from './user.entity';
  @Entity()
  export class Role {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name:string;
    
    @Column()
    system_name:string

    @OneToMany(() => User, (user) => user.role)
    users: Role[]
  
}
  
  
  