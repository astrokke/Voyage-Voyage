import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { TravelService } from '../../core/services/travel.service';
import {
  addActivity,
  addActivityFailure,
  addActivitySuccess,
  createStep,
  createStepFailure,
  createStepSuccess,
  createTravel,
  createTravelFailure,
  createTravelSuccess,
  deleteActivity,
  deleteActivityFailure,
  deleteActivitySuccess,
  deleteStep,
  deleteStepFailure,
  deleteStepSuccess,
  deleteTravel,
  deleteTravelFailure,
  deleteTravelSuccess,
  loadTravelById,
  loadTravelByIdFailure,
  loadTravelByIdSuccess,
  loadTravels,
  loadTravelsFailure,
  loadTravelsSuccess,
  updateActivity,
  updateActivityFailure,
  updateActivityStatus,
  updateActivityStatusFailure,
  updateActivityStatusSuccess,
  updateActivitySuccess,
  updateStep,
  updateStepFailure,
  updateStepSuccess,
  updateTravel,
  updateTravelFailure,
  updateTravelSuccess
} from './travel.actions';

@Injectable()
export class TravelEffects {
  private readonly actions$ = inject(Actions);
  private readonly travelService = inject(TravelService);
  private readonly router = inject(Router);

  private toError(error: unknown): string {
    if (!error) {
      return 'Erreur inconnue';
    }
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return 'Une erreur est survenue';
  }

  loadTravels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTravels),
      switchMap(() =>
        this.travelService.getTravels().pipe(
          map(travels => loadTravelsSuccess({ travels })),
          catchError(error => of(loadTravelsFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  loadTravelById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTravelById),
      switchMap(({ id }) =>
        this.travelService.getTravelById(id).pipe(
          map(travel => loadTravelByIdSuccess({ travel })),
          catchError(error => of(loadTravelByIdFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  createTravel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTravel),
      switchMap(({ data }) =>
        this.travelService.createTravel(data).pipe(
          map(travel => createTravelSuccess({ travel })),
          catchError(error => of(createTravelFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  updateTravel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTravel),
      switchMap(({ id, data }) =>
        this.travelService.updateTravel(id, data).pipe(
          map(travel => updateTravelSuccess({ travel })),
          catchError(error => of(updateTravelFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  deleteTravel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTravel),
      switchMap(({ id }) =>
        this.travelService.deleteTravel(id).pipe(
          map(() => deleteTravelSuccess({ id })),
          catchError(error => of(deleteTravelFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  createStep$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createStep),
      switchMap(({ travelId, payload }) =>
        this.travelService.addStep(travelId, payload).pipe(
          map(step => createStepSuccess({ travelId, step })),
          catchError(error => of(createStepFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  updateStep$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateStep),
      switchMap(({ travelId, stepId, payload }) =>
        this.travelService.updateStep(travelId, stepId, payload).pipe(
          map(step => updateStepSuccess({ travelId, step })),
          catchError(error => of(updateStepFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  deleteStep$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteStep),
      switchMap(({ travelId, stepId }) =>
        this.travelService.deleteStep(travelId, stepId).pipe(
          map(() => deleteStepSuccess({ travelId, stepId })),
          catchError(error => of(deleteStepFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  addActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addActivity),
      switchMap(({ travelId, stepId, payload }) =>
        this.travelService.addActivity(travelId, stepId, payload).pipe(
          map(activity => addActivitySuccess({ travelId, stepId, activity })),
          catchError(error => of(addActivityFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  updateActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateActivity),
      switchMap(({ travelId, stepId, activityId, payload }) =>
        this.travelService.updateActivity(travelId, stepId, activityId, payload).pipe(
          map(activity => updateActivitySuccess({ travelId, stepId, activity })),
          catchError(error => of(updateActivityFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  deleteActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteActivity),
      switchMap(({ travelId, stepId, activityId }) =>
        this.travelService.deleteActivity(travelId, stepId, activityId).pipe(
          map(() => deleteActivitySuccess({ travelId, stepId, activityId })),
          catchError(error => of(deleteActivityFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  updateActivityStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateActivityStatus),
      switchMap(({ travelId, stepId, activityId, status }) =>
        this.travelService.updateActivityStatus(travelId, stepId, activityId, status).pipe(
          map(activity => updateActivityStatusSuccess({ travelId, stepId, activity })),
          catchError(error => of(updateActivityStatusFailure({ error: this.toError(error) })))
        )
      )
    )
  );

  redirectToTravel$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createTravelSuccess, updateTravelSuccess),
        tap(({ travel }) => this.router.navigate(['/travels', travel.id]))
      ),
    { dispatch: false }
  );

  redirectHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteTravelSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  reloadAfterDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTravelSuccess),
      map(() => loadTravels())
    )
  );

  goNotFound$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadTravelByIdFailure),
        tap(() => this.router.navigate(['/404']))
      ),
    { dispatch: false }
  );
}

