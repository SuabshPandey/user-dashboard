import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = [];
  error: string = '';
  loading: boolean = false;

  // pagination
  columns: string[] = ['id', 'name', 'username', 'email', 'phone', 'website'];
  page: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log('Fetched users:', data);
        this.users = data;
        this.totalRecords = data.length;
        this.updateDisplayedUsers();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message ?? 'Error fetching users';
        this.loading = false;
      },
    });
  }

  updateDisplayedUsers() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = this.users.slice(start, end);
    console.log('Displayed users:', this.displayedUsers);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.updateDisplayedUsers();
  }

  onPageSizeChange(event: Event) {
    this.page = 1; // reset to first page whenever size changes
    this.updateDisplayedUsers();
  }

  onRowClick(user: User) {
    console.log('Clicked user:', user);
    // later navigate to /users/:id
  }
}
