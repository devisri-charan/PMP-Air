import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
  
    // Set up the Mapbox access token
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHkyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA";
  
    // Get the device data from the API
    useEffect(() => {
      fetch('/v1/devices/all')
        .then((response) => response.json())
        .then((data) => {
          setMarkers(
            data.map((device) => ({
              longitude: device.longitude,
              latitude: device.latitude,
            }))
          );
        });
    }, []);
  
    // Initialize the map when the component mounts
    useEffect(() => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [77.2834115218655, 28.568367391756283],
        zoom: 10,
      });
  
      setMap(newMap);
  
      return () => {
        newMap.remove();
      };
    }, []);
  
    // Add the markers to the map when the markers data changes
    useEffect(() => {
      if (map && markers.length > 0) {
        const newMarkers = markers.map((marker) =>
          new mapboxgl.Marker()
            .setLngLat([marker.longitude, marker.latitude])
            .addTo(map)
        );
  
        return () => {
          newMarkers.forEach((marker) => marker.remove());
        };
      }
    }, [map, markers]);
  
    return (
      <div className="h-screen">
        <div id="map" className="h-full"></div>
      </div>
    );
  }
  
  export default Map;
  