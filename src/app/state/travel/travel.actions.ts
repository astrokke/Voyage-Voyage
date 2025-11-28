import { createAction, props } from '@ngrx/store';
import { Activity, ActivityStatus, Step, Travel, TravelPayload } from '../../core/models/travel.model';

export const loadTravels = createAction('[Travel] Load Travels');
export const loadTravelsSuccess = createAction('[Travel] Load Travels Success', props<{ travels: Travel[] }>());
export const loadTravelsFailure = createAction('[Travel] Load Travels Failure', props<{ error: string }>());

export const loadTravelById = createAction('[Travel] Load Travel By Id', props<{ id: number }>());
export const loadTravelByIdSuccess = createAction('[Travel] Load Travel By Id Success', props<{ travel: Travel }>());
export const loadTravelByIdFailure = createAction('[Travel] Load Travel By Id Failure', props<{ error: string }>());

export const createTravel = createAction('[Travel] Create Travel', props<{ data: TravelPayload }>());
export const createTravelSuccess = createAction('[Travel] Create Travel Success', props<{ travel: Travel }>());
export const createTravelFailure = createAction('[Travel] Create Travel Failure', props<{ error: string }>());

export const updateTravel = createAction('[Travel] Update Travel', props<{ id: number; data: TravelPayload }>());
export const updateTravelSuccess = createAction('[Travel] Update Travel Success', props<{ travel: Travel }>());
export const updateTravelFailure = createAction('[Travel] Update Travel Failure', props<{ error: string }>());

export const deleteTravel = createAction('[Travel] Delete Travel', props<{ id: number }>());
export const deleteTravelSuccess = createAction('[Travel] Delete Travel Success', props<{ id: number }>());
export const deleteTravelFailure = createAction('[Travel] Delete Travel Failure', props<{ error: string }>());

export const createStep = createAction('[Travel] Create Step', props<{ travelId: number; payload: Pick<Step, 'name' | 'order'> }>());
export const createStepSuccess = createAction('[Travel] Create Step Success', props<{ travelId: number; step: Step }>());
export const createStepFailure = createAction('[Travel] Create Step Failure', props<{ error: string }>());

export const updateStep = createAction(
  '[Travel] Update Step',
  props<{ travelId: number; stepId: number; payload: Pick<Step, 'name' | 'order'> }>()
);
export const updateStepSuccess = createAction('[Travel] Update Step Success', props<{ travelId: number; step: Step }>());
export const updateStepFailure = createAction('[Travel] Update Step Failure', props<{ error: string }>());

export const deleteStep = createAction('[Travel] Delete Step', props<{ travelId: number; stepId: number }>());
export const deleteStepSuccess = createAction('[Travel] Delete Step Success', props<{ travelId: number; stepId: number }>());
export const deleteStepFailure = createAction('[Travel] Delete Step Failure', props<{ error: string }>());

export const addActivity = createAction(
  '[Travel] Add Activity',
  props<{ travelId: number; stepId: number; payload: Pick<Activity, 'title' | 'description' | 'schedule' | 'status'> }>()
);
export const addActivitySuccess = createAction(
  '[Travel] Add Activity Success',
  props<{ travelId: number; stepId: number; activity: Activity }>()
);
export const addActivityFailure = createAction('[Travel] Add Activity Failure', props<{ error: string }>());

export const updateActivity = createAction(
  '[Travel] Update Activity',
  props<{ travelId: number; stepId: number; activityId: number; payload: Pick<Activity, 'title' | 'description' | 'schedule' | 'status'> }>()
);
export const updateActivitySuccess = createAction(
  '[Travel] Update Activity Success',
  props<{ travelId: number; stepId: number; activity: Activity }>()
);
export const updateActivityFailure = createAction('[Travel] Update Activity Failure', props<{ error: string }>());

export const deleteActivity = createAction(
  '[Travel] Delete Activity',
  props<{ travelId: number; stepId: number; activityId: number }>()
);
export const deleteActivitySuccess = createAction(
  '[Travel] Delete Activity Success',
  props<{ travelId: number; stepId: number; activityId: number }>()
);
export const deleteActivityFailure = createAction('[Travel] Delete Activity Failure', props<{ error: string }>());

export const updateActivityStatus = createAction(
  '[Travel] Update Activity Status',
  props<{ travelId: number; stepId: number; activityId: number; status: ActivityStatus }>()
);
export const updateActivityStatusSuccess = createAction(
  '[Travel] Update Activity Status Success',
  props<{ travelId: number; stepId: number; activity: Activity }>()
);
export const updateActivityStatusFailure = createAction('[Travel] Update Activity Status Failure', props<{ error: string }>());

export const setHighlightedStep = createAction('[Travel] Set Highlighted Step', props<{ stepId: number | null }>());

