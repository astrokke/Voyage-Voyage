import { createAction, props } from '@ngrx/store';

export type NotificationKind = 'success' | 'error';

export const showNotification = createAction(
  '[Notification] Show',
  props<{ message: string; kind: NotificationKind }>()
);

export const clearNotification = createAction('[Notification] Clear');

