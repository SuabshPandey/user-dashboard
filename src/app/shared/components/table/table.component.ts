import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() page: number = 1;
  @Input() pageSize: number = 5;
  @Input() totalRecords: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();


  onPageChange(newPage: number){
    this.pageChange.emit(newPage);
  }

  onRowClick(row: any){
    this.rowClick.emit(row);
  }

}
