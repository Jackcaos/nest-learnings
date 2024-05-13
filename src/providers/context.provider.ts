import { ClsServiceManager } from "nestjs-cls";

import { type User } from "../modules/user/user.entity";

// 根据单次请求维度的数据存储
export class ContextProvider {
  private static readonly dimensions = "request";

  private static readonly user = "user";

  private static get<T>(key: string) {
    const store = ClsServiceManager.getClsService();

    return store.get<T>(ContextProvider.getKeyWithDimensions(key));
  }

  private static set(key: string, value: any): void {
    const store = ClsServiceManager.getClsService();

    store.set(ContextProvider.getKeyWithDimensions(key), value);
  }

  private static getKeyWithDimensions(key: string): string {
    return `${ContextProvider.dimensions}.${key}`;
  }

  static setUser(user: User): void {
    ContextProvider.set(ContextProvider.user, user);
  }

  static getUser(): User {
    return ContextProvider.get(ContextProvider.user);
  }
}
