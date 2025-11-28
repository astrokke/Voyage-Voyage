import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Activity, Step, Travel } from '../../core/models/travel.model';
import {
  addActivitySuccess,
  deleteActivitySuccess,
  deleteStepSuccess,
  deleteTravelSuccess,
  loadTravelById,
  loadTravelByIdFailure,
  loadTravelByIdSuccess,
  loadTravels,
  loadTravelsFailure,
  loadTravelsSuccess,
  setHighlightedStep,
  updateActivitySuccess,
  updateActivityStatusSuccess,
  updateStepSuccess,
  updateTravelSuccess,
  createTravelSuccess,
  createStepSuccess
} from './travel.actions';

export interface TravelState {
  travels: Travel[];
  selectedTravel: Travel | null;
  loading: boolean;
  error: string | null;
  highlightedStepId: number | null;
}

const initialState: TravelState = {
  travels: [],
  selectedTravel: null,
  loading: false,
  error: null,
  highlightedStepId: null
};

const updateSteps = (steps: Step[], updatedStep: Step): Step[] =>
  steps.map(step => (step.id === updatedStep.id ? { ...step, ...updatedStep } : step));

const removeStep = (steps: Step[], stepId: number): Step[] => steps.filter(step => step.id !== stepId);

const updateActivityList = (steps: Step[], stepId: number, activity: Activity): Step[] =>
  steps.map(step =>
    step.id === stepId ? { ...step, activities: step.activities.map(item => (item.id === activity.id ? activity : item)) } : step
  );

const removeActivity = (steps: Step[], stepId: number, activityId: number): Step[] =>
  steps.map(step =>
    step.id === stepId ? { ...step, activities: step.activities.filter(activity => activity.id !== activityId) } : step
  );

const addActivityToStep = (steps: Step[], stepId: number, activity: Activity): Step[] =>
  steps.map(step => (step.id === stepId ? { ...step, activities: [...step.activities, activity] } : step));

const reducer = createReducer(
  initialState,
  on(loadTravels, state => ({ ...state, loading: true, error: null })),
  on(loadTravelsSuccess, (state, { travels }) => ({ ...state, travels, loading: false })),
  on(loadTravelsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(loadTravelById, state => ({ ...state, loading: true, error: null })),
  on(loadTravelByIdSuccess, (state, { travel }) => ({ ...state, selectedTravel: travel, loading: false })),
  on(loadTravelByIdFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(createTravelSuccess, (state, { travel }) => ({
    ...state,
    travels: [...state.travels, travel],
    selectedTravel: travel
  })),
  on(updateTravelSuccess, (state, { travel }) => ({
    ...state,
    travels: state.travels.map(item => (item.id === travel.id ? travel : item)),
    selectedTravel: state.selectedTravel && state.selectedTravel.id === travel.id ? travel : state.selectedTravel
  })),
  on(deleteTravelSuccess, (state, { id }) => ({
    ...state,
    travels: state.travels.filter(travel => travel.id !== id),
    selectedTravel: state.selectedTravel && state.selectedTravel.id === id ? null : state.selectedTravel
  })),
  on(createStepSuccess, (state, { travelId, step }) => ({
    ...state,
    selectedTravel:
      state.selectedTravel && state.selectedTravel.id === travelId
        ? { ...state.selectedTravel, steps: [...state.selectedTravel.steps, step] }
        : state.selectedTravel,
    highlightedStepId: step.id
  })),
  on(updateStepSuccess, (state, { travelId, step }) => ({
    ...state,
    selectedTravel:
      state.selectedTravel && state.selectedTravel.id === travelId
        ? { ...state.selectedTravel, steps: updateSteps(state.selectedTravel.steps, step) }
        : state.selectedTravel,
    highlightedStepId: step.id
  })),
  on(deleteStepSuccess, (state, { travelId, stepId }) => ({
    ...state,
    selectedTravel:
      state.selectedTravel && state.selectedTravel.id === travelId
        ? { ...state.selectedTravel, steps: removeStep(state.selectedTravel.steps, stepId) }
        : state.selectedTravel,
    highlightedStepId: null
  })),
  on(addActivitySuccess, (state, { travelId, stepId, activity }) => ({
    ...state,
    selectedTravel:
      state.selectedTravel && state.selectedTravel.id === travelId
        ? { ...state.selectedTravel, steps: addActivityToStep(state.selectedTravel.steps, stepId, activity) }
        : state.selectedTravel,
    highlightedStepId: stepId
  })),
  on(updateActivitySuccess, (state, { travelId, stepId, activity }) => ({
    ...state,
    selectedTravel:
      state.selectedTravel && state.selectedTravel.id === travelId
        ? { ...state.selectedTravel, steps: updateActivityList(state.selectedTravel.steps, stepId, activity) }
        : state.selectedTravel,
    highlightedStepId: stepId
  })),
  on(deleteActivitySuccess, (state, { travelId, stepId, activityId }) => ({
    ...state,
    selectedTravel:
      state.selectedTravel && state.selectedTravel.id === travelId
        ? { ...state.selectedTravel, steps: removeActivity(state.selectedTravel.steps, stepId, activityId) }
        : state.selectedTravel,
    highlightedStepId: stepId
  })),
  on(updateActivityStatusSuccess, (state, { travelId, stepId, activity }) => ({
    ...state,
    selectedTravel:
      state.selectedTravel && state.selectedTravel.id === travelId
        ? { ...state.selectedTravel, steps: updateActivityList(state.selectedTravel.steps, stepId, activity) }
        : state.selectedTravel,
    highlightedStepId: stepId
  })),
  on(setHighlightedStep, (state, { stepId }) => ({ ...state, highlightedStepId: stepId }))
);

export const travelFeatureKey = 'travel';
export const travelReducer = reducer;
export const selectTravelState = createFeatureSelector<TravelState>(travelFeatureKey);
export const selectAllTravels = createSelector(selectTravelState, state => state.travels);
export const selectSelectedTravel = createSelector(selectTravelState, state => state.selectedTravel);
export const selectTravelLoading = createSelector(selectTravelState, state => state.loading);
export const selectTravelError = createSelector(selectTravelState, state => state.error);
export const selectHighlightedStepId = createSelector(selectTravelState, state => state.highlightedStepId);

