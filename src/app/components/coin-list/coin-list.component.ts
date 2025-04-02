import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
  standalone: false
})
export class CoinListComponent implements OnInit {
  coins: any[] = [];
  filteredCoins: any[] = [];
  isLoading = true;
  errorMessage = '';
  searchTerm = '';

  constructor(private cryptoService: CryptoService) { }

  ngOnInit(): void {
    this.loadCoins();
  }

  loadCoins(): void {
    this.isLoading = true;
    this.cryptoService.getTopCoins(50).subscribe({
      next: (data) => {
        this.coins = data;
        this.filteredCoins = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load coin data. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching coins:', error);
      }
    });
  }

  searchCoins(): void {
    this.filteredCoins = this.coins.filter(coin => 
      coin.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      coin.symbol.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getPercentageClass(value: number): string {
    return value >= 0 ? 'text-success' : 'text-danger';
  }
}