import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [TableComponent, CardComponent],
  imports: [CommonModule, NgbPaginationModule],
  providers: [],
  exports: [TableComponent, CardComponent, NgbPaginationModule],
})
export class SharedModule {}
