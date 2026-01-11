import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CryptoService } from '../../services/crypto.service';

import { CoinDetailComponent } from './coin-detail.component';

describe('CoinDetailComponent', () => {
  let component: CoinDetailComponent;
  let fixture: ComponentFixture<CoinDetailComponent>;

  const cryptoServiceMock: Partial<CryptoService> = {
    getCoinDetails: () =>
      of({
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        image: { large: '' },
        market_data: {
          current_price: { usd: 0 },
          price_change_percentage_24h: 0,
          price_change_percentage_7d: 0,
          price_change_percentage_14d: 0,
          price_change_percentage_30d: 0,
          market_cap: { usd: 0 },
          total_volume: { usd: 0 },
          fully_diluted_valuation: { usd: 0 },
          circulating_supply: 0,
          total_supply: 0,
          max_supply: 0,
          high_24h: { usd: 0 },
          low_24h: { usd: 0 }
        },
        description: { en: '' }
      }),
    // Prevent chart creation path in unit tests by omitting prices array
    getHistoricalData: () => of({ prices: undefined } as any)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinDetailComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { params: of({ id: 'bitcoin' }) } },
        { provide: CryptoService, useValue: cryptoServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
