import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TravelListComponent } from './travel-list.component';
import { selectAllTravels, selectTravelLoading } from '../../state/travel/travel.reducer';
import { deleteTravel, loadTravels } from '../../state/travel/travel.actions';

describe('TravelListComponent', () => {
  let component: TravelListComponent;
  let fixture: ComponentFixture<TravelListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelListComponent],
      providers: [provideMockStore(), provideRouter([])]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllTravels, [
      {
        id: 1,
        title: 'Voyage test',
        destination: 'Paris',
        startDate: '2024-01-01',
        endDate: '2024-01-05',
        steps: []
      }
    ]);
    store.overrideSelector(selectTravelLoading, false);

    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(TravelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTravels on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadTravels());
  });

  it('should render travel cards from store data', () => {
    const cards = fixture.nativeElement.querySelectorAll('.travel-card');
    expect(cards.length).toBe(1);
    expect(cards[0].querySelector('h2')?.textContent).toContain('Voyage test');
  });

  it('should dispatch deleteTravel when remove is confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.remove(1);
    expect(store.dispatch).toHaveBeenCalledWith(deleteTravel({ id: 1 }));
  });
});
