import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

type MarketChartTuple = [number, number];

export interface HistoricalDataPoint {
  date: Date;
  value: number;
}

export interface HistoricalData {
  prices: HistoricalDataPoint[];
  market_caps: HistoricalDataPoint[];
  total_volumes: HistoricalDataPoint[];
}

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  /**
   * Coin list (markets endpoint) used by Dashboard + Coin List
   */
  getTopCoins(limit = 10): Observable<any[]> {
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('per_page', String(limit))
      .set('page', '1')
      .set('sparkline', 'false')
      .set('price_change_percentage', '24h');

    return this.http.get<any[]>(`${this.baseUrl}/coins/markets`, { params });
  }

  /**
   * Global market data (total market cap, volume, dominance, etc.)
   */
  getGlobalMarketData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/global`);
  }

  /**
   * Single coin details used by Coin Detail page
   */
  getCoinDetails(coinId: string): Observable<any> {
    const params = new HttpParams()
      .set('localization', 'false')
      .set('tickers', 'false')
      .set('market_data', 'true')
      .set('community_data', 'false')
      .set('developer_data', 'false')
      .set('sparkline', 'false');

    return this.http.get<any>(`${this.baseUrl}/coins/${encodeURIComponent(coinId)}`, { params });
  }

  /**
   * Historical market chart data mapped into { date, value } points
   * so our chart component can be type-safe and clean.
   */
  getHistoricalData(coinId: string, days = 7): Observable<HistoricalData> {
    const params = new HttpParams().set('vs_currency', 'usd').set('days', String(days));

    return this.http
      .get<{
        prices: MarketChartTuple[];
        market_caps: MarketChartTuple[];
        total_volumes: MarketChartTuple[];
      }>(`${this.baseUrl}/coins/${encodeURIComponent(coinId)}/market_chart`, { params })
      .pipe(
        map((res) => ({
          prices: this.mapMarketChartTuples(res.prices),
          market_caps: this.mapMarketChartTuples(res.market_caps),
          total_volumes: this.mapMarketChartTuples(res.total_volumes)
        }))
      );
  }

  private mapMarketChartTuples(points: MarketChartTuple[] | undefined): HistoricalDataPoint[] {
    if (!points) return [];
    return points.map(([timestampMs, value]) => ({
      date: new Date(timestampMs),
      value
    }));
  }
}
