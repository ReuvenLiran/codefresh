import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineStepComponent } from './inline-step.component';

describe('InlineStepComponent', () => {
  let component: InlineStepComponent;
  let fixture: ComponentFixture<InlineStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
