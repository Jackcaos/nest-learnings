import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("sc_user", { comment: "用户表" })
export class User {
  @PrimaryGeneratedColumn({ comment: "用户表主键id" })
  id: number;

  @Column({ comment: "用户名", length: 128 })
  name: string;

  @Column({ comment: "用户密码", length: 128 })
  password: string;

  @Column({ comment: "用户信息描述", length: 256 })
  description: string;

  @Column({ comment: "用户账号", length: 128 })
  account: string;

  @Column({
    name: "isdel",
    type: "tinyint",
    comment: "是否删除",
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
    comment: "创建时间",
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
    comment: "更新时间",
  })
  updatedAt: Date;
}
