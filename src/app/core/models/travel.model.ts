export type ActivityStatus = 'prevue' | 'faite';

export interface Activity {
  id: number;
  title: string;
  description?: string;
  schedule?: string;
  status: ActivityStatus;
}

export interface Step {
  id: number;
  name: string;
  order: number;
  activities: Activity[];
}

export interface Travel {
  id: number;
  title: string;
  destination: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  steps: Step[];
}

export interface TravelPayload extends Omit<Travel, 'id' | 'steps'> {
  steps?: Step[];
}

