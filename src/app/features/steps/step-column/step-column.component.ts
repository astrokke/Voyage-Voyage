import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Activity, ActivityStatus, Step } from '../../../core/models/travel.model';

export interface ActivityFormPayload {
  title: string;
  description?: string;
  schedule?: string;
  status: ActivityStatus;
}

@Component({
  selector: 'app-step-column',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-column.component.html',
  styleUrl: './step-column.component.scss'
})
export class StepColumnComponent {
  private readonly fb = inject(FormBuilder);
  @Input({ required: true }) step!: Step;
  @Input() highlighted = false;
  @Output() editStep = new EventEmitter<Step>();
  @Output() deleteStep = new EventEmitter<Step>();
  @Output() addActivity = new EventEmitter<{ stepId: number; payload: ActivityFormPayload }>();
  @Output() editActivity = new EventEmitter<{ stepId: number; activity: Activity }>();
  @Output() deleteActivity = new EventEmitter<{ stepId: number; activityId: number }>();
  @Output() updateStatus = new EventEmitter<{ stepId: number; activityId: number; status: ActivityStatus }>();

  activityForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    schedule: [''],
    status: ['prevue' as ActivityStatus]
  });

  submitActivity(): void {
    if (this.activityForm.invalid || !this.step) {
      this.activityForm.markAllAsTouched();
      return;
    }
    this.addActivity.emit({
      stepId: this.step.id,
      payload: this.activityForm.value as ActivityFormPayload
    });
    this.activityForm.reset({
      title: '',
      description: '',
      schedule: '',
      status: 'prevue'
    });
  }

  requestStepEdit(): void {
    this.editStep.emit(this.step);
  }

  requestStepDelete(): void {
    this.deleteStep.emit(this.step);
  }

  requestActivityEdit(activity: Activity): void {
    this.editActivity.emit({ stepId: this.step.id, activity });
  }

  requestActivityDelete(activityId: number): void {
    this.deleteActivity.emit({ stepId: this.step.id, activityId });
  }

  toggleStatus(activity: Activity): void {
    const status: ActivityStatus = activity.status === 'prevue' ? 'faite' : 'prevue';
    this.updateStatus.emit({ stepId: this.step.id, activityId: activity.id, status });
  }

  trackActivity(_index: number, activity: Activity): number {
    return activity.id;
  }
}
