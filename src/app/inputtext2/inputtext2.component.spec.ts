import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Inputtext2Component } from './inputtext2.component';

describe('Inputtext2Component', () => {
  let component: Inputtext2Component;
  let fixture: ComponentFixture<Inputtext2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Inputtext2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Inputtext2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
