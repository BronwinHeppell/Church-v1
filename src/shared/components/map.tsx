import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGVycmFuaW91cyIsImEiOiJjbTA1MjgwYncwZzFtMnJxejF2NW5tcHh1In0.j_6RWiIX-SyDhumqn_4_vQ';

const Map = () => {
  const lat = -25.7961862;
  const long = 28.2931054;
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11', // or any other Mapbox style
      center: [long, lat], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    // Disable interactions

    const marker = new mapboxgl.Marker()
      .setLngLat([long, lat]) // Longitude, Latitude
      .addTo(map);

    marker.getElement().addEventListener('click', () => {
      const googleMapsUrl = `https://www.google.com/maps/place/Corpus+Christi+Anglican+Church/@-25.7961862,28.2931054,17z/data=!3m1!4b1!4m6!3m5!1s0x1e955ffb3657c89b:0x84e228c1cd662421!8m2!3d-25.7961862!4d28.2956857!16s%2Fg%2F11cs18f00p?entry=ttu`;
      window.open(googleMapsUrl, '_blank'); // Open Google Maps in a new tab
    });

    // Clean up on unmount
    return () => map.remove();
  }, [lat]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '200px' }} />;
};

export default Map;
