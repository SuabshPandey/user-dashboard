import { NgModule } from '@angular/core';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from "src/app/shared/shared.module";
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserListComponent, UserCardComponent, UserDetailComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule, NgbPaginationModule, FormsModule],
  providers: [],
  exports: [],
})
export class UsersModule {}
