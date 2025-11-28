import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Travel } from '../../core/models/travel.model';
import { deleteTravel, loadTravels } from '../../state/travel/travel.actions';
import { selectAllTravels, selectTravelLoading } from '../../state/travel/travel.reducer';

@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './travel-list.component.html',
  styleUrl: './travel-list.component.scss'
})
export class TravelListComponent implements OnInit {
  private readonly store = inject(Store);
  travels$: Observable<Travel[]> = this.store.select(selectAllTravels);
  loading$: Observable<boolean> = this.store.select(selectTravelLoading);
  highlightedId = signal<number | null>(null);

  ngOnInit(): void {
    this.store.dispatch(loadTravels());
  }

  trackById(_index: number, travel: Travel): number {
    return travel.id;
  }

  mark(travelId: number): void {
    this.highlightedId.set(travelId);
    setTimeout(() => this.highlightedId.set(null), 1500);
  }

  remove(travelId: number): void {
    if (confirm('Supprimer ce voyage ?')) {
      this.store.dispatch(deleteTravel({ id: travelId }));
      this.mark(travelId);
    }
  }
}
