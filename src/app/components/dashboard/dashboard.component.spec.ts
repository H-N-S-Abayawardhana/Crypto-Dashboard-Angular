import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CryptoService } from '../../services/crypto.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const cryptoServiceMock: Partial<CryptoService> = {
    getTopCoins: () => of([]),
    getGlobalMarketData: () => of({ data: {} })
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: CryptoService, useValue: cryptoServiceMock }]
    })
    .compileComponents();


    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
