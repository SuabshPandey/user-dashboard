import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
  declarations: [TableComponent, CardComponent, LoaderComponent],
  imports: [CommonModule, NgbPaginationModule],
  providers: [],
  exports: [TableComponent, CardComponent, LoaderComponent, NgbPaginationModule],
})
export class SharedModule {}
