import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("sc_user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 128 })
  password: string;

  @Column({ length: 256 })
  description: string;

  @Column({ length: 128 })
  account: string;

  @Column({
    name: "isdel",
    type: "tinyint",
  })
  isDel: number;

  @Column({
    name: "created_at",
    transformer: {
      to(value: any): any {
        return value;
      },
      from(value: any): any {
        return new Date(value).valueOf();
      },
    },
  })
  createdAt: Date;

  @Column({
    name: "updated_at",
    transformer: {
      to(value: any): any {
        return value;
      },
      from(value: any): any {
        return new Date(value).valueOf();
      },
    },
  })
  updatedAt: Date;
}
