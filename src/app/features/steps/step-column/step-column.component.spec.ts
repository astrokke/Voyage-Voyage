import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepColumnComponent } from './step-column.component';

describe('StepColumnComponent', () => {
  let component: StepColumnComponent;
  let fixture: ComponentFixture<StepColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepColumnComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StepColumnComponent);
    component = fixture.componentInstance;
    component.step = {
      id: 1,
      name: 'Jour 1',
      order: 1,
      activities: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addActivity when form is valid', () => {
    spyOn(component.addActivity, 'emit');
    component.activityForm.setValue({
      title: 'Visite',
      description: '',
      schedule: '',
      status: 'prevue'
    });
    component.submitActivity();
    expect(component.addActivity.emit).toHaveBeenCalledWith({
      stepId: 1,
      payload: {
        title: 'Visite',
        description: '',
        schedule: '',
        status: 'prevue'
      }
    });
  });

  it('should stop submission when form invalid', () => {
    spyOn(component.addActivity, 'emit');
    component.activityForm.patchValue({ title: '' });
    component.submitActivity();
    expect(component.addActivity.emit).not.toHaveBeenCalled();
  });

  it('should toggle status', () => {
    spyOn(component.updateStatus, 'emit');
    component.toggleStatus({ id: 5, title: 'Test', status: 'prevue' });
    expect(component.updateStatus.emit).toHaveBeenCalledWith({
      stepId: 1,
      activityId: 5,
      status: 'faite'
    });
  });
});
