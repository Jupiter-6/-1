import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, Headers, Payload, POST, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix)
export class StationService extends BaseApi {

  constructor(
    protected injector: Injector,
    private http: _HttpClient,
  ) {
    super(injector);
  }

  /** 查询所有 */
  @POST('/sda/station/query_forcache.api')
  queryAll(@Payload data: any): Observable<any> {
    return new Observable();
  }

}
