import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBizComponent } from './register-biz.component';

describe('RegisterBizComponent', () => {
  let component: RegisterBizComponent;
  let fixture: ComponentFixture<RegisterBizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterBizComponent]
    });
    fixture = TestBed.createComponent(RegisterBizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
