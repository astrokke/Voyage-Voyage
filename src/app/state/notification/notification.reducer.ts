import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { clearNotification, showNotification, NotificationKind } from './notification.actions';

export interface NotificationState {
  message: string | null;
  kind: NotificationKind | null;
}

const initialState: NotificationState = {
  message: null,
  kind: null
};

const reducer = createReducer(
  initialState,
  on(showNotification, (_, payload) => ({ ...payload })),
  on(clearNotification, () => initialState)
);

export const notificationFeatureKey = 'notification';
export const notificationReducer = reducer;
export const selectNotificationState = createFeatureSelector<NotificationState>(notificationFeatureKey);
export const selectNotification = createSelector(selectNotificationState, state => state);

