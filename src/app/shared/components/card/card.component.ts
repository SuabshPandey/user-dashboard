import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/features/users/models/user.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() user!: User;

  ngOnInit(): void {
    console.log('User list on card', this.user);
  }
}
