import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ViewProcessoPageRoutingModule } from './view-processo-routing.module';
import { ViewProcessoPage } from './view-processo.page';

describe('ViewProcessoPage', () => {
  let component: ViewProcessoPage;
  let fixture: ComponentFixture<ViewProcessoPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ViewProcessoPage],
      imports: [IonicModule.forRoot(), ViewProcessoPageRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProcessoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
