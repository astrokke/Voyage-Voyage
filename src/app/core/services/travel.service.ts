import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity, ActivityStatus, Step, Travel, TravelPayload } from '../models/travel.model';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  getTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(`${this.apiUrl}/travels`);
  }

  getTravelById(id: number): Observable<Travel> {
    return this.http.get<Travel>(`${this.apiUrl}/travels/${id}`);
  }

  createTravel(travel: TravelPayload): Observable<Travel> {
    return this.http.post<Travel>(`${this.apiUrl}/travels`, travel);
  }

  updateTravel(id: number, travel: TravelPayload): Observable<Travel> {
    return this.http.put<Travel>(`${this.apiUrl}/travels/${id}`, travel);
  }

  deleteTravel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/travels/${id}`);
  }

  addStep(travelId: number, payload: Pick<Step, 'name' | 'order'>): Observable<Step> {
    return this.http.post<Step>(`${this.apiUrl}/travels/${travelId}/steps`, payload);
  }

  updateStep(travelId: number, stepId: number, payload: Pick<Step, 'name' | 'order'>): Observable<Step> {
    return this.http.put<Step>(`${this.apiUrl}/travels/${travelId}/steps/${stepId}`, payload);
  }

  deleteStep(travelId: number, stepId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/travels/${travelId}/steps/${stepId}`);
  }

  addActivity(
    travelId: number,
    stepId: number,
    payload: Pick<Activity, 'title' | 'description' | 'schedule' | 'status'>
  ): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiUrl}/travels/${travelId}/steps/${stepId}/activities`, payload);
  }

  updateActivity(
    travelId: number,
    stepId: number,
    activityId: number,
    payload: Pick<Activity, 'title' | 'description' | 'schedule' | 'status'>
  ): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiUrl}/travels/${travelId}/steps/${stepId}/activities/${activityId}`, payload);
  }

  deleteActivity(travelId: number, stepId: number, activityId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/travels/${travelId}/steps/${stepId}/activities/${activityId}`);
  }

  updateActivityStatus(
    travelId: number,
    stepId: number,
    activityId: number,
    status: ActivityStatus
  ): Observable<Activity> {
    return this.http.patch<Activity>(
      `${this.apiUrl}/travels/${travelId}/steps/${stepId}/activities/${activityId}/status`,
      { status }
    );
  }
}
