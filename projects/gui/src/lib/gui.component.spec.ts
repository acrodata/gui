import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiComponent } from './gui.component';

describe('GuiComponent', () => {
  let component: GuiComponent;
  let fixture: ComponentFixture<GuiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuiComponent],
    });
    fixture = TestBed.createComponent(GuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
