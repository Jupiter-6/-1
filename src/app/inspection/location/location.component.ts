import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { houseIconStyle, OLMap } from '@shared/utils/map.config';
import VectorImage from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import Map from 'ol/Map';

@Component({
  selector: 'im-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @ViewChild('maptemp', { static: true }) maptemp!: ElementRef; // 地图
  houseLayer = new VectorImage({
    source: new VectorSource(),
    style: houseIconStyle({})
  })

  map!: Map;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(({ name, x, y }) => {
        const center = fromLonLat([x, y]);
        this.map = OLMap({
          target: this.maptemp.nativeElement,
          center
        });
        this.map.addLayer(this.houseLayer);
        const point = new Point(center);
        const feature = new Feature({ geometry: point });
        feature.set('data', { name, id: null });
        this.houseLayer.getSource().clear();
        this.houseLayer.getSource().addFeature(feature);
      })
  }

}
