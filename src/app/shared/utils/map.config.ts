import { environment } from '@env/environment';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import RenderFeature from 'ol/render/Feature';
import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import { Style, Icon, Text, Fill } from 'ol/style';
import { HouseCoordinateEntity } from '@shared/entities/monitoring.type';
import { Coordinate } from 'ol/coordinate';

export function OLMap(config: {
    target: string | HTMLElement | undefined;
    center?: number[];
}) {
    const { target, center } = config;

    return new Map({
        target,
        layers: [
            new TileLayer({
                source: new XYZ({
                    url: 'https://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=b70671f2786000ee524b946cc21fb2aa'
                })
            }),
            new TileLayer({
                source: new XYZ({
                    url: 'https://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=b70671f2786000ee524b946cc21fb2aa'
                })
            })
        ],
        view: new View({
            center: (center?.length && center) || fromLonLat([119.985508, 31.79542]),
            zoom: 14
        })
    });
}

export function houseIconStyle(config: {
    houseid?: string;
}) {
    const { houseid } = config;

    const styleFunc = (feature: RenderFeature | Feature<Geometry>) => {
        const data: HouseCoordinateEntity = feature.get('data');
        const { name, id } = data;

        const defaultStyle = new Style({
            zIndex: 1,
            image: new Icon({
                src: environment.assets_prefix + '/assets/icons/icon_bf_location_default.svg',
                scale: 0.32
            }),
            text: new Text({
                text: name,
                offsetY: -25,
                scale: 1.1,
                padding: [5, 7, 2, 9],
                backgroundFill: new Fill({
                    color: '#7D83F2'
                }),
                fill: new Fill({
                    color: '#fff'
                })
            })
        })

        const selectedStyle = new Style({
            zIndex: 2,
            image: new Icon({
                src: environment.assets_prefix + '/assets/icons/icon_bf_location.svg',
                scale: 0.32
            }),
            text: new Text({
                text: name,
                offsetY: -25,
                scale: 1.1,
                padding: [5, 7, 2, 9],
                backgroundFill: new Fill({
                    color: '#ff9600'
                }),
                fill: new Fill({
                    color: '#fff'
                })
            })
        })
        if (id === houseid) {
            return selectedStyle;
        }
        return defaultStyle;
    }
    return styleFunc;
}
