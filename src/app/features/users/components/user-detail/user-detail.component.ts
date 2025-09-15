import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user!: User;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.fetchUser(+userId);
    } else {
      this.error = 'User ID is invalid.';
    }
  }

  fetchUser(id: number) {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message ?? 'Failed to load user';
        this.loading = false;
      },
    });
  }

  goBack() {
    const queryParams = this.route.snapshot.queryParams;
    this.router.navigate(['/users'], { queryParams });
  }
}
