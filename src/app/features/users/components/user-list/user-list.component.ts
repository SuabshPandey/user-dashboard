import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedUsers: User[] = [];
  error: string = '';
  loading: boolean = false;

  // Columns
  columns: string[] = ['id', 'name', 'username', 'email', 'phone', 'website'];

  // Pagination
  page: number = 1;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  totalRecords: number = 0;

  // Layout
  layout: 'table' | 'card' = 'table';

  // Search
  searchTerm: string = '';
  searchSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private subscriptions: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Load layout from localStorage
    const savedLayout = localStorage.getItem('userLayout');
    if (savedLayout === 'table' || savedLayout === 'card') {
      this.layout = savedLayout;
    }

    this.fetchUsers();

    // Initialize search from URL if exists
    this.subscriptions.add(
      this.route.queryParamMap.subscribe((params) => {
        const search = params.get('search') || '';
        this.searchTerm = search;

        const pageParam = params.get('page');
        this.page = pageParam ? Number(pageParam) : 1;

        const pageSizeParam = params.get('pageSize');
        this.pageSize = pageSizeParam ? Number(pageSizeParam) : 5;

        this.searchSubject.next(search);
      })
    );

    // Subscribe to search changes
    this.subscriptions.add(
      this.searchSubject
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((value) => {
          this.searchTerm = value;
          this.updateFilteredUsers();

          // Update query params
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { search: value || null },
            queryParamsHandling: 'merge',
          });
        })
    );
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.updateFilteredUsers();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message ?? 'Error fetching users';
        this.loading = false;
      },
    });
  }

  updateFilteredUsers() {
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
      );
    } else {
      this.filteredUsers = [...this.users];
    }

    this.totalRecords = this.filteredUsers.length;
    this.page = 1;
    this.updateDisplayedUsers();
  }

  updateDisplayedUsers() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(start, end);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.updateDisplayedUsers();
  }

  onPageSizeChange(event: any) {
    this.pageSize = Number(event.target.value);
    this.page = 1;
    this.updateDisplayedUsers();
  }

  onRowClick(user: User) {
    this.router.navigate(['/users', user.id], {
      queryParams: {
        search: this.searchTerm,
        page: this.page,
        pageSize: this.pageSize,
      },
    });
  }

  changeLayout(newLayout: 'table' | 'card') {
    this.layout = newLayout;
    localStorage.setItem('userLayout', newLayout);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
