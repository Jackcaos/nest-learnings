import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// 超级管理员C1：拥有所有功能的权限，包括新增管理员。
// 管理员C2：拥有所有普通的权限，新增用户的权限。
// 业务用户C3：拥有所有的普通权限。
// 普通用户C4：拥有大部分项目增删改查的权限，除了核心数据看版的权限没有。 对应二进制 1111
// 游客C5：只有部分页面的浏览权限。 对应二进制0001

// 超级管理员权限 111111111111
// 管理审批 100000
// 数据权限 010000
// 删除权限 001000
// 修改权限 000100
// 创建权限 000010
// 查看权限 000001

@Entity("sc_permission", { comment: "用户权限表" })
export class Permission {
  @PrimaryGeneratedColumn({ comment: "用户权限表主键id" })
  id: number;

  @Column({ comment: "用户id" })
  user_id: number;

  @Column({ comment: "用户权限" })
  permission: number;

  @Column({
    name: "create_user_id",
    comment: "创建角色信息用户id",
  })
  createUserId: number;

  @Column({
    name: "update_user_id",
    comment: "更新角色信息用户id",
  })
  updateUserId: number;

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

// create table sc_permission
// (
//     id         BIGINT     not null auto_increment comment '自增id',
//     user_id    BIGINT     not null comment '用户 id',
//     permission   int(8)     not null comment '用户权限',
//     create_user_id BIGINT not null comment '创建者的id',
//     update_user_id BIGINT not null comment '更新者的id',
//     is_del     tinyint(2) not null default 0 comment '是否逻辑删除',
//     created_at datetime   not null default current_timestamp comment '记录创建时间',
//     updated_at datetime   not null default current_timestamp on update current_timestamp comment '记录更新时间',
//     primary key id (id),
//     index user_id_idx (user_id)
// ) engine InnoDB
//   default charset utf8mb4
//   collate utf8mb4_unicode_ci comment '用户权限表';
