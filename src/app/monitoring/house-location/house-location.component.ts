import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseCoordinateEntity } from '@shared/entities/monitoring.type';
import { MonitoringApiService } from '@shared/services/monitoring-api.service';
import { houseIconStyle, OLMap } from '@shared/utils/map.config';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorImage from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import Map from 'ol/Map';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { fromLonLat } from 'ol/proj';
import { MonitoringService } from '../monitoring.service';

@Component({
  selector: 'im-house-location',
  templateUrl: './house-location.component.html',
  styleUrls: ['./house-location.component.scss']
})
export class HouseLocationComponent implements OnInit {
  @ViewChild('maptemp', { static: true }) maptemp!: ElementRef; // 地图
  houses: HouseCoordinateEntity[] = [];
  houseid!: string;
  map!: Map;
  houseLayer!: VectorImage<any>;

  constructor(
    private apiService: MonitoringApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public monitoringService: MonitoringService
  ) { }

  ngOnInit(): void {
    this.initMap();

    this.activatedRoute.paramMap
      .subscribe((data: any) => {
        this.houseid = data.params.houseid
        if (this.map && this.houses.length) {
          this.renderHouseLayer();
        }
      })
  }
  /** 初始化地图 */
  initMap() {
    setTimeout(() => {
      this.map = OLMap({
        target: this.maptemp.nativeElement,
        center: this.apiService.center
      });
      this.houseLayer = new VectorImage({
        source: new VectorSource(),
        style: houseIconStyle({ houseid: this.houseid })
      })
      this.map.addLayer(this.houseLayer);
      /** 鼠标单击节点图层 */
      this.map.on('click', (event: MapBrowserEvent<any>) => {
        this.map.forEachFeatureAtPixel(event.pixel, (f) => {
          const { id } = f.get('data');

          this.router.navigate([`/monitoring/house-location/${id}`], { replaceUrl: true });
        });
      });
      this.houseQuery();
    });
  }
  /** 查询泵房数据 */
  houseQuery() {
    this.houses = this.apiService.gethouses();
    if (this.houses.length) {
      this.renderHouseLayer();
      return false;
    }
    this.apiService.houseQueryformonitor({
      criteria: [{ name: 'enabled', value1: 1 }]
    }).subscribe((data) => {
      if (data.code === '0') {
        this.houses = data.items || [];
        this.apiService.setHouses(this.houses);
        this.renderHouseLayer();
      }
    })
    return true;
  }
  /** 渲染泵房图层 */
  renderHouseLayer() {


    const features: Array<Feature<Point>> = [];
    for (const item of this.houses) {
      const coordinate = fromLonLat([item.positionx, item.positiony]);
      const point = new Point(coordinate);
      const feature = new Feature({ geometry: point });
      feature.set('data', item);
      features.push(feature);
    }
    this.houseLayer.getSource().clear(); // Remove all features from the source.
    this.houseLayer.setStyle(houseIconStyle({ houseid: this.houseid }));
    this.houseLayer.getSource().addFeatures(features);
    /** 将当前泵房位置设置为中心点 */
    const house = this.houses.find(i => i.id === this.houseid);
    if (house) {
      setTimeout(() => {
        const center = fromLonLat([house.positionx, house.positiony]);
        this.apiService.center = center;
        this.map.getView().animate(
          { center, duration: 600 }
        );
      });
    }
  }
}
