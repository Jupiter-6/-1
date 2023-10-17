import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArrayService } from '@delon/util';
import { IconMap } from '@shared/data/icon-map';
import { ItsysApiService } from '@shared/services/_itsys-api.service';

@Component({
  selector: 'im-menu-prod',
  templateUrl: './menu-prod.component.html',
  styleUrls: ['./menu-prod.component.scss']
})
export class MenuProdComponent implements OnInit {
  app = {} as any;
  user = {} as any;
  menus: any[] = [];
  constructor(
    private itsysApiService: ItsysApiService,
    private arrayService: ArrayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const appStr = localStorage.getItem('app');
    if (appStr) { this.app = JSON.parse(appStr); }
    const userStr = sessionStorage.getItem('user');
    if (userStr) { this.user = JSON.parse(userStr); }

    this.menus = this.itsysApiService.getMenus();
    this.getMenuData().then(data => {
      this.parseMenuData(data);
    })
  }
  menuClick(item: any) {
    if (item.href.startsWith('http')) {
      const { id, token } = this.user;
      location.replace(`${item.href}?token=${token}&userid=${id}`);
      return false;
    }
    this.router.navigate([item.href])
    return true;
  }
  async getMenuData() {
    const menuData = await this.itsysApiService.menuQuery().toPromise()
    const menuMap: { [key: string]: any } = {};
    menuData.items.map((i: any) => {
      if (i.parentid == '0') { i.parentid = '' };
      if (!i.icon) { i.icon = 'pft:home_icon_1' };
      i.icon = IconMap.get(i.icon) || 'assets/cmzassets/images/home_icon_1.png';
      menuMap[i.id] = i;
    });
    const enabled_menu_list: any[] = [];
    this.user.menuidSet.map((i: any) => {
      if (menuMap[i]) { enabled_menu_list.push(menuMap[i]) }
    })
    return enabled_menu_list.sort((a, b) => a.sortno - b.sortno);
  }
  parseMenuData(enabled_menu_list: any[]) {
    const tree = this.arrayService.arrToTree(enabled_menu_list, {
      parentIdMapName: 'parentid'
    })
    console.log('====================================');
    console.log(tree);
    console.log('====================================');
    this.menus = tree.filter(i => i.menugrpno === 'app_ihive_web');
    this.itsysApiService.setMenus(this.menus);
  }
}
