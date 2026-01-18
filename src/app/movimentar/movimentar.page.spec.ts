import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimentarPage } from './movimentar.page';

describe('MovimentarPage', () => {
  let component: MovimentarPage;
  let fixture: ComponentFixture<MovimentarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
