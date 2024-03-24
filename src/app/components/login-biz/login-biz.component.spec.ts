import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBizComponent } from './login-biz.component';

describe('LoginBizComponent', () => {
  let component: LoginBizComponent;
  let fixture: ComponentFixture<LoginBizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginBizComponent]
    });
    fixture = TestBed.createComponent(LoginBizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
