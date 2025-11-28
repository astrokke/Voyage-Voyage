import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TravelDetailComponent } from './travel-detail.component';
import {
  selectHighlightedStepId,
  selectSelectedTravel,
  selectTravelLoading
} from '../../state/travel/travel.reducer';
import { deleteTravel, loadTravelById } from '../../state/travel/travel.actions';

describe('TravelDetailComponent', () => {
  let component: TravelDetailComponent;
  let fixture: ComponentFixture<TravelDetailComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelDetailComponent],
      providers: [
        provideRouter([]),
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' }))
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectSelectedTravel, {
      id: 1,
      title: 'Voyage',
      destination: 'Berlin',
      steps: []
    });
    store.overrideSelector(selectTravelLoading, false);
    store.overrideSelector(selectHighlightedStepId, null);

    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(TravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTravelById on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadTravelById({ id: 1 }));
  });

  it('should dispatch deleteTravel when deleteTravel is confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteTravel(1);
    expect(store.dispatch).toHaveBeenCalledWith(deleteTravel({ id: 1 }));
  });
});
