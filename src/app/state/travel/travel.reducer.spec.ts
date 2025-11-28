import { travelReducer, TravelState } from './travel.reducer';
import {
  loadTravels,
  loadTravelsSuccess,
  createStepSuccess,
  updateActivityStatusSuccess,
  deleteTravelSuccess
} from './travel.actions';
import { Travel } from '../../core/models/travel.model';

const initialState: TravelState = travelReducer(undefined, { type: '@@init' } as any);

describe('TravelReducer', () => {
  const travel: Travel = {
    id: 1,
    title: 'Voyage',
    destination: 'Rome',
    steps: [
      {
        id: 10,
        name: 'Jour 1',
        order: 1,
        activities: [
          { id: 100, title: 'Visite', status: 'prevue' }
        ]
      }
    ]
  };

  it('should set loading true on loadTravels', () => {
    const state = travelReducer(undefined, loadTravels());
    expect(state.loading).toBeTrue();
  });

  it('should store travels on load success', () => {
    const state = travelReducer(initialState, loadTravelsSuccess({ travels: [travel] }));
    expect(state.travels.length).toBe(1);
  });

  it('should add step on createStepSuccess', () => {
    const baseState: TravelState = {
      ...initialState,
      selectedTravel: { ...travel, steps: [] }
    };
    const state = travelReducer(
      baseState,
      createStepSuccess({
        travelId: travel.id,
        step: { id: 20, name: 'Jour 2', order: 2, activities: [] }
      })
    );
    expect(state.selectedTravel?.steps.length).toBe(1);
    expect(state.highlightedStepId).toBe(20);
  });

  it('should update activity status', () => {
    const baseState: TravelState = {
      ...initialState,
      selectedTravel: travel,
      travels: [travel]
    };
    const state = travelReducer(
      baseState,
      updateActivityStatusSuccess({
        travelId: travel.id,
        stepId: 10,
        activity: { id: 100, title: 'Visite', status: 'faite' }
      })
    );
    const updatedActivity = state.selectedTravel?.steps[0].activities[0];
    expect(updatedActivity?.status).toBe('faite');
  });

  it('should remove travel on delete success', () => {
    const baseState: TravelState = {
      ...initialState,
      travels: [travel],
      selectedTravel: travel
    };
    const state = travelReducer(baseState, deleteTravelSuccess({ id: travel.id }));
    expect(state.travels.length).toBe(0);
    expect(state.selectedTravel).toBeNull();
  });
});

