import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TravelService } from './travel.service';
import { Travel, TravelPayload } from '../models/travel.model';

describe('TravelService', () => {
  let service: TravelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TravelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch travels', () => {
    const mockTravels: Travel[] = [
      { id: 1, title: 'Voyage', destination: 'Rome', steps: [] }
    ];

    service.getTravels().subscribe(travels => {
      expect(travels).toEqual(mockTravels);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/travels');
    expect(req.request.method).toBe('GET');
    req.flush(mockTravels);
  });

  it('should create travel', () => {
    const payload: TravelPayload = {
      title: 'Test',
      destination: 'Berlin',
      steps: []
    };
    const response: Travel = { id: 4, ...payload, steps: [] };

    service.createTravel(payload).subscribe(travel => {
      expect(travel).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/travels');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(response);
  });
});
