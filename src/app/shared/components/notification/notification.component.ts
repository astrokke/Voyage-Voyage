import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectNotification, NotificationState } from '../../../state/notification/notification.reducer';
import { clearNotification } from '../../../state/notification/notification.actions';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  private readonly store = inject(Store);
  notification$: Observable<NotificationState> = this.store.select(selectNotification);

  clear(): void {
    this.store.dispatch(clearNotification());
  }
}
