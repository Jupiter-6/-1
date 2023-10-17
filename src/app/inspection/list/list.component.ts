import { Component, OnInit } from '@angular/core';
import { Inspection } from '@shared/entities/database.type';
import { DatabaseService } from '@shared/services/_database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'im-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Inspection[] = [];

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.readDatabase();
  }
  onSeclected(event: string) {
    console.log(event);
  }
  /** 读取数据库 */
  readDatabase() {
    this.list = Object.values(this.databaseService.read<Inspection>('inspection') || {});
  }
  del(id: string) {
    this.databaseService.del('inspection', id);
    this.readDatabase();
  }
  clear() {
    localStorage.removeItem('database');
    this.databaseService.initDatabase(this.databaseService.user);
    window.location.reload();
  }
  go(event: MouseEvent, item: Inspection) {
    event.stopPropagation();
    this.router.navigate(['/inspection/pump-house/' + item.id]);
  }
}
