import { Injectable, OnInit } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { DataBase, ImUser, Inspection, SubDataBase, SubDataBaseStr } from '@shared/entities/database.type';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  user: ImUser = JSON.parse(sessionStorage.getItem('user') || "{}");
  private database: DataBase = JSON.parse(localStorage.getItem('database') || "{}");

  constructor(
    private message: MessageService
  ) { }

  /** 初始化数据库 */
  initDatabase(user: ImUser): boolean {
    this.user = user;
    const databaseStr = localStorage.getItem('database');
    const databaseObj = databaseStr && JSON.parse(databaseStr) || {};
    const { id } = user;
    if (databaseObj[id]) {
      return false;
    }
    databaseObj[id] = {
      inspection: {},
      maintenance: {},
      breakdown: {},
      monitoring: {},
      work: {},
      event: {},
    };
    this.database = databaseObj;
    localStorage.setItem('database', JSON.stringify(databaseObj));
    return true;
  }


  /** 根据子模块读取数据 */
  read<T>(name: SubDataBaseStr) {
    const { user, database } = this;
    if (!database[user.id]) {
      console.error('找不到用户信息，无法读取数据库');
      return {};
    }
    return database[user.id][name] as { [key: string]: T };
  }

  set(name: SubDataBaseStr, data: SubDataBase, key: string = 'id'): boolean {
    const { user, database } = this;
    if (!database[user.id]) {
      console.error('找不到用户信息，无法更新数据库');
      return false;
    }
    const id: string = data[key];
    database[user.id][name][id] = { ...data }
    localStorage.setItem('database', JSON.stringify(database));
    return true;
  }

  del(name: SubDataBaseStr, id: string): boolean {
    const { user, database } = this;
    if (!database[user.id]) {
      console.error('找不到用户信息，无法删除数据');
      return false;
    }
    delete database[user.id][name][id];
    localStorage.setItem('database', JSON.stringify(database));
    return true;
  }
  initData() {
    if (!this.user.id) { return false; }
    const arr: Inspection[] = Object.values(this.read('inspection') || {});
    const inspections = arr.filter((i) => i.loading);
    if (inspections.length) {
      setTimeout(() => {
        for (const item of inspections) {
          item.loading = false;
          this.set('inspection', item);
        }
        this.message.show({
          type: 'info',
          content: '检测到数据上传异常，已帮您恢复'
        })
      }, 500);
    }
    return true;
  }
}
