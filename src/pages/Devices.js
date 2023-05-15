import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Devices() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Set up the Mapbox access token
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHkyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA";

  // Get the device data from the API
  useEffect(() => {
    fetch("/v1/devices/all")
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
      // scrollZoom: false,
    });

    newMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  // Add the markers to the map when the markers data changes
  useEffect(() => {
    if (map && markers.length > 0) {
      const newMarkers = markers.map((marker) => {
        // Create a new popup
        const popup = new mapboxgl.Popup({ offset: 25, className: 'rounded-lg' })
        .setHTML(`
          <div class="p-2">
            <h2 class="font-bold">Longitude: ${marker.longitude}</h2>
            <h2 class="font-bold">Latitude: ${marker.latitude}</h2>
          </div>
        `);

        // Create a new marker and add the popup to it
        const newMarker = new mapboxgl.Marker()
          .setLngLat([marker.longitude, marker.latitude])
          .setPopup(popup)
          .addTo(map);

        return newMarker;
      });
      return () => {
        newMarkers.forEach((marker) => marker.remove());
        map.removeControl(new mapboxgl.NavigationControl());
      };
    }
  }, [map, markers]);

  return (
    <div className="h-screen w-screen pt-16">
      <div id="map" className="h-full"></div>
    </div>
  );
}

export default Devices;
