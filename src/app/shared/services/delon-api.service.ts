import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class DelonApiService {

  constructor(
    private http: _HttpClient,
  ) { }

  getData() {
    return this.http.get('https://qq1639501830.top/bian/api/v3/ticker/price', { symbol: 'BTCUSDT' });
  }
  getMockData() {
    return this.http.get('/user', {
      pi: 1, ps: 1
    });
  }
}
