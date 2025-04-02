import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Subscription } from 'rxjs';

// Define interfaces for type safety
interface HistoricalDataPoint {
  date: Date;
  value: number;
}

interface HistoricalData {
  prices: HistoricalDataPoint[];
  market_caps: HistoricalDataPoint[];
  total_volumes: HistoricalDataPoint[];
}

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss'],
  standalone: false
})
export class CoinDetailComponent implements OnInit, OnDestroy {
  coinId: string = '';
  coin: any = null;
  historicalData: HistoricalData | null = null;
  isLoading = true;
  errorMessage = '';
  chart: Chart | null = null;
  timeframe = 7; // Default to 7 days
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.coinId = params['id'];
      this.loadCoinData();
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
    
    // Destroy chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
  }

  loadCoinData(): void {
    this.isLoading = true;
    
    // Get coin details
    const detailsSub = this.cryptoService.getCoinDetails(this.coinId).subscribe({
      next: (data) => {
        this.coin = data;
        this.loadHistoricalData();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load coin data. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching coin details:', error);
      }
    });
    
    this.subscriptions.push(detailsSub);
  }

  loadHistoricalData(): void {
    const historicalSub = this.cryptoService.getHistoricalData(this.coinId, this.timeframe).subscribe({
      next: (data) => {
        this.historicalData = data;
        this.isLoading = false;
        this.createChart();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load historical data. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching historical data:', error);
      }
    });
    
    this.subscriptions.push(historicalSub);
  }

  changeTimeframe(days: number): void {
    this.timeframe = days;
    this.loadHistoricalData();
  }

  createChart(): void {
    if (!this.historicalData || !this.historicalData.prices) {
      return;
    }
    
    // Destroy previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
    
    const ctx = document.getElementById('priceChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    const labels = this.historicalData.prices.map((price) => {
      const date = new Date(price.date);
      return date.toLocaleDateString();
    });
    
    const prices = this.historicalData.prices.map((price) => price.value);
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Price (USD)',
          data: prices,
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Price (USD)'
            }
          }
        }
      }
    });
  }

  getPercentageClass(value: number): string {
    return value >= 0 ? 'text-success' : 'text-danger';
  }
}