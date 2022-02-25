import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassvordComponent } from './reset-passvord.component';

describe('ResetPassvordComponent', () => {
  let component: ResetPassvordComponent;
  let fixture: ComponentFixture<ResetPassvordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPassvordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPassvordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
