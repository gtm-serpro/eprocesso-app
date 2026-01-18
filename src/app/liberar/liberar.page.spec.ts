import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiberarPage } from './liberar.page';

describe('LiberarPage', () => {
  let component: LiberarPage;
  let fixture: ComponentFixture<LiberarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LiberarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
