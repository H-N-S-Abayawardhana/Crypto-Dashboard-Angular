import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CryptoService } from '../../services/crypto.service';

import { CoinListComponent } from './coin-list.component';

describe('CoinListComponent', () => {
  let component: CoinListComponent;
  let fixture: ComponentFixture<CoinListComponent>;

  const cryptoServiceMock: Partial<CryptoService> = {
    getTopCoins: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinListComponent],
      providers: [
        provideRouter([]),
        { provide: CryptoService, useValue: cryptoServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
