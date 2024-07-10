import React, { useRef, useEffect } from 'react';
import './Map.css';
import data from './parcels.geojson';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-89.401230, 43.073051],
      zoom: 12,
      pitch: 60.00,
    });

    map.on('load', () => {
      map.addSource('taxes', {
        type: 'geojson',
        data
      });

      map.addLayer(
        {
          id: "taxes",
          source: "taxes",
          type: "fill-extrusion",
          paint: {
            "fill-extrusion-color": ["interpolate", ['linear'], ["/", ["get", "NetTaxes"], ["get", "LotSize"]], 0, "purple", 10, "blue", 20, "green", 30, "yellow"],
            "fill-extrusion-height": ["*", 100, ["/", ["get", "NetTaxes"], ["get", "LotSize"]]],
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.8
          }
        }
      );

      map.addControl(new mapboxgl.NavigationControl());
    });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} className='map-container' />
    </div>
  );
};

export default Map;
