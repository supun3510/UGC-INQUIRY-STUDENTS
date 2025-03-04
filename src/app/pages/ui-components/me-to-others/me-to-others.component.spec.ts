import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeToOthersComponent } from './me-to-others.component';

describe('MeToOthersComponent', () => {
  let component: MeToOthersComponent;
  let fixture: ComponentFixture<MeToOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeToOthersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeToOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
