import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { TravelPayload } from '../../core/models/travel.model';
import { createTravel, loadTravelById, updateTravel } from '../../state/travel/travel.actions';
import { selectSelectedTravel, selectTravelLoading } from '../../state/travel/travel.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-travel-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './travel-form.component.html',
  styleUrl: './travel-form.component.scss'
})
export class TravelFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  form = this.fb.group({
    title: ['', Validators.required],
    destination: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    imageUrl: ['']
  });

  loading$: Observable<boolean> = this.store.select(selectTravelLoading);
  private travelId: number | null = null;

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.travelId = Number(id);
        this.store.dispatch(loadTravelById({ id: this.travelId }));
      } else {
        this.travelId = null;
        this.form.reset({
          title: '',
          destination: '',
          description: '',
          startDate: '',
          endDate: '',
          imageUrl: ''
        });
      }
    });

    this.store
      .select(selectSelectedTravel)
      .pipe(
        filter(travel => !!travel),
        takeUntilDestroyed()
      )
      .subscribe(travel => {
        if (travel && this.travelId === travel.id) {
          this.form.patchValue({
            title: travel.title,
            destination: travel.destination,
            description: travel.description || '',
            startDate: travel.startDate || '',
            endDate: travel.endDate || '',
            imageUrl: travel.imageUrl || ''
          });
        }
      });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.value as TravelPayload;
    if (this.travelId) {
      this.store.dispatch(updateTravel({ id: this.travelId, data: payload }));
      return;
    }
    this.store.dispatch(createTravel({ data: payload }));
  }

  get isEdit(): boolean {
    return this.travelId !== null;
  }
}
