import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  addActivityFailure,
  addActivitySuccess,
  createStepFailure,
  createStepSuccess,
  createTravelFailure,
  createTravelSuccess,
  deleteActivityFailure,
  deleteActivitySuccess,
  deleteStepFailure,
  deleteStepSuccess,
  deleteTravelFailure,
  deleteTravelSuccess,
  loadTravelByIdFailure,
  loadTravelsFailure,
  updateActivityFailure,
  updateActivityStatusFailure,
  updateActivityStatusSuccess,
  updateActivitySuccess,
  updateStepFailure,
  updateStepSuccess,
  updateTravelFailure,
  updateTravelSuccess
} from '../travel/travel.actions';
import { clearNotification, showNotification } from './notification.actions';

@Injectable()
export class NotificationEffects {
  private readonly actions$ = inject(Actions);

  success$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        createTravelSuccess,
        updateTravelSuccess,
        deleteTravelSuccess,
        createStepSuccess,
        updateStepSuccess,
        deleteStepSuccess,
        addActivitySuccess,
        updateActivitySuccess,
        deleteActivitySuccess,
        updateActivityStatusSuccess
      ),
      map(action => {
        const type = action.type;
        if (type.includes('Step')) {
          return showNotification({ message: 'Étape mise à jour', kind: 'success' });
        }
        if (type.includes('Activity')) {
          return showNotification({ message: 'Activité mise à jour', kind: 'success' });
        }
        return showNotification({ message: 'Voyage mis à jour', kind: 'success' });
      })
    )
  );

  failure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        loadTravelsFailure,
        loadTravelByIdFailure,
        createTravelFailure,
        updateTravelFailure,
        deleteTravelFailure,
        createStepFailure,
        updateStepFailure,
        deleteStepFailure,
        addActivityFailure,
        updateActivityFailure,
        deleteActivityFailure,
        updateActivityStatusFailure
      ),
      map(({ error }) => showNotification({ message: error, kind: 'error' }))
    )
  );

  clear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showNotification),
      switchMap(() => timer(3000).pipe(map(() => clearNotification())))
    )
  );
}

