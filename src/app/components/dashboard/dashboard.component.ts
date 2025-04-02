import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  topCoins: any[] = [];
  marketData: any = {};
  isLoading = true;
  errorMessage = '';

  constructor(private cryptoService: CryptoService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    // Get top coins
    this.cryptoService.getTopCoins(10).subscribe({
      next: (data) => {
        this.topCoins = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load coin data. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching top coins:', error);
      }
    });
    
    // Get global market data
    this.cryptoService.getGlobalMarketData().subscribe({
      next: (data) => {
        this.marketData = data.data;
      },
      error: (error) => {
        console.error('Error fetching market data:', error);
      }
    });
  }

  getPercentageClass(value: number): string {
    return value >= 0 ? 'text-success' : 'text-danger';
  }
}