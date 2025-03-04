import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersToMeComponent } from './others-to-me.component';

describe('OthersToMeComponent', () => {
  let component: OthersToMeComponent;
  let fixture: ComponentFixture<OthersToMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OthersToMeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersToMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
