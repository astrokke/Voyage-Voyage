import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TravelFormComponent } from './travel-form.component';
import { selectSelectedTravel, selectTravelLoading } from '../../state/travel/travel.reducer';
import { createTravel, updateTravel } from '../../state/travel/travel.actions';

describe('TravelFormComponent', () => {
  let component: TravelFormComponent;
  let fixture: ComponentFixture<TravelFormComponent>;
  let store: MockStore;
  let paramMap$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  beforeEach(async () => {
    paramMap$ = new BehaviorSubject(convertToParamMap({}));

    await TestBed.configureTestingModule({
      imports: [TravelFormComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: paramMap$.asObservable() }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectSelectedTravel, null);
    store.overrideSelector(selectTravelLoading, false);

    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(TravelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch createTravel when submitting without id', () => {
    component.form.setValue({
      title: 'Titre',
      destination: 'Rome',
      description: '',
      startDate: '2024-01-01',
      endDate: '2024-01-05',
      imageUrl: ''
    });

    component.submit();

    expect(store.dispatch).toHaveBeenCalledWith(
      createTravel({
        data: {
          title: 'Titre',
          destination: 'Rome',
          description: '',
          startDate: '2024-01-01',
          endDate: '2024-01-05',
          imageUrl: ''
        }
      })
    );
  });

  it('should dispatch updateTravel when an id is provided', () => {
    paramMap$.next(convertToParamMap({ id: '3' }));
    fixture.detectChanges();

    component.form.setValue({
      title: 'Titre 2',
      destination: 'Lyon',
      description: '',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      imageUrl: ''
    });

    component.submit();

    expect(store.dispatch).toHaveBeenCalledWith(
      updateTravel({
        id: 3,
        data: {
          title: 'Titre 2',
          destination: 'Lyon',
          description: '',
          startDate: '2024-02-01',
          endDate: '2024-02-05',
          imageUrl: ''
        }
      })
    );
  });
});
