import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArquivarPage } from './arquivar.page';

describe('ArquivarPage', () => {
  let component: ArquivarPage;
  let fixture: ComponentFixture<ArquivarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
