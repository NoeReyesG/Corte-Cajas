import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialConfigurationComponent } from './initial-configuration.component';

describe('InitialConfigurationComponent', () => {
  let component: InitialConfigurationComponent;
  let fixture: ComponentFixture<InitialConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitialConfigurationComponent]
    });
    fixture = TestBed.createComponent(InitialConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
