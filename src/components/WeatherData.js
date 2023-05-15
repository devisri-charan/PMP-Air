// import { useState, useEffect } from 'react';

function WeatherData() {
//   const [temperature, setTemperature] = useState('-');
//   const [humidity, setHumidity] = useState('-');
// //   const [aqi, setAqi] = useState('-');

//   useEffect(() => {
//     fetch('/v1/data/all')
//       .then(response => response.json())
//       .then(data => {
//         setTemperature(data.temperature);
//         setHumidity(data.humidity);
//         // setAqi(data.aqi);
//       })
//       .catch(error => {
//         console.error('Error fetching weather data:', error);
//       });
//   }, []);

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold text-gray-800">Temperature</p>
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mt-2">
          <p className="text-2xl font-bold text-gray-800">26&deg;C</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold text-gray-800">Humidity</p>
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mt-2">
          <p className="text-2xl font-bold text-gray-800">80%</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold text-gray-800">Air Quality Index</p>
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mt-2">
          <p className="text-2xl font-bold text-gray-800">111</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherData;