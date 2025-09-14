import { NgModule } from '@angular/core';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserListComponent, UserCardComponent, UserDetailComponent],
  imports: [CommonModule, UsersRoutingModule],
  providers: [],
  exports: [],
})
export class UsersModule {}
