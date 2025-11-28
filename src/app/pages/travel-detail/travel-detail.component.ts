import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StepColumnComponent, ActivityFormPayload } from '../../features/steps/step-column/step-column.component';
import { Step, Travel, Activity, ActivityStatus } from '../../core/models/travel.model';
import {
  addActivity,
  createStep,
  deleteActivity,
  deleteStep,
  deleteTravel,
  loadTravelById,
  updateActivity,
  updateActivityStatus,
  updateStep
} from '../../state/travel/travel.actions';
import { selectHighlightedStepId, selectSelectedTravel, selectTravelLoading } from '../../state/travel/travel.reducer';

@Component({
  selector: 'app-travel-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, StepColumnComponent],
  templateUrl: './travel-detail.component.html',
  styleUrl: './travel-detail.component.scss'
})
export class TravelDetailComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  travel$: Observable<Travel | null> = this.store.select(selectSelectedTravel);
  loading$: Observable<boolean> = this.store.select(selectTravelLoading);
  highlightedStepId$: Observable<number | null> = this.store.select(selectHighlightedStepId);

  stepForm = this.fb.group({
    name: ['', Validators.required],
    order: [1, Validators.required]
  });

  private currentTravelId: number | null = null;

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const id = Number(params.get('id'));
      if (!Number.isNaN(id)) {
        this.currentTravelId = id;
        this.store.dispatch(loadTravelById({ id }));
      }
    });
  }

  createStep(travelId: number): void {
    if (this.stepForm.invalid) {
      this.stepForm.markAllAsTouched();
      return;
    }
    const value = this.stepForm.value;
    const order = Number(value.order);
    if (!value.name || Number.isNaN(order)) {
      return;
    }
    this.store.dispatch(createStep({ travelId, payload: { name: value.name, order } }));
    this.stepForm.reset({ name: '', order: 1 });
  }

  editStep(step: Step): void {
    if (!this.currentTravelId) {
      return;
    }
    const name = prompt('Nom de l’étape', step.name);
    if (!name) {
      return;
    }
    const orderInput = prompt('Ordre de l’étape', step.order.toString());
    if (orderInput === null) {
      return;
    }
    const order = Number(orderInput);
    if (Number.isNaN(order)) {
      return;
    }
    this.store.dispatch(updateStep({ travelId: this.currentTravelId, stepId: step.id, payload: { name, order } }));
  }

  removeStep(step: Step): void {
    if (!this.currentTravelId) {
      return;
    }
    if (confirm('Supprimer cette étape ?')) {
      this.store.dispatch(deleteStep({ travelId: this.currentTravelId, stepId: step.id }));
    }
  }

  addNewActivity(travelId: number, event: { stepId: number; payload: ActivityFormPayload }): void {
    this.store.dispatch(
      addActivity({ travelId, stepId: event.stepId, payload: event.payload })
    );
  }

  editActivity(travelId: number, event: { stepId: number; activity: Activity }): void {
    const { activity } = event;
    const title = prompt('Titre de l’activité', activity.title);
    if (!title) {
      return;
    }
    const description = prompt('Description', activity.description || '') ?? '';
    const schedule = prompt('Horaires', activity.schedule || '') ?? '';
    this.store.dispatch(
      updateActivity({
        travelId,
        stepId: event.stepId,
        activityId: activity.id,
        payload: {
          title,
          description: description || undefined,
          schedule: schedule || undefined,
          status: activity.status
        }
      })
    );
  }

  removeActivity(travelId: number, event: { stepId: number; activityId: number }): void {
    if (confirm('Supprimer cette activité ?')) {
      this.store.dispatch(
        deleteActivity({
          travelId,
          stepId: event.stepId,
          activityId: event.activityId
        })
      );
    }
  }

  changeStatus(travelId: number, event: { stepId: number; activityId: number; status: ActivityStatus }): void {
    this.store.dispatch(
      updateActivityStatus({
        travelId,
        stepId: event.stepId,
        activityId: event.activityId,
        status: event.status
      })
    );
  }

  deleteTravel(travelId: number): void {
    if (confirm('Supprimer ce voyage ?')) {
      this.store.dispatch(deleteTravel({ id: travelId }));
    }
  }

  getSortedSteps(steps: Step[]): Step[] {
    return [...steps].sort((a, b) => a.order - b.order);
  }

  trackStep(_index: number, step: Step): number {
    return step.id;
  }

  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return '';
    }
    return imageUrl.startsWith('http') ? imageUrl : `http://localhost:3000${imageUrl}`;
  }
}
