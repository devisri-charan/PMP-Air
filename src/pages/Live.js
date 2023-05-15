import React, { useState, useEffect } from 'react';

function Live() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch the data from the API
    fetch('/v1/data/all')
      .then(response => response.json())
      .then(data => {
        // Reverse the data array to start from the end
        const reversedData = data.reverse();
        // Convert the date to IST format for each item
        const formattedData = reversedData.map(item => ({
          ...item,
          date: new Date(item.timestamp * 1000).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
          }),
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center pt-20">
      {data.reverse().map((item) => (
        <div key={item._id.$oid} className="max-w-md mx-auto my-4 bg-white rounded-xl shadow-md overflow-hidden md:max-w">
          <div className="md:flex">
            <div className="p-8">
              <p className="mt-2 text-gray-500">Timestamp: {item.date}</p>
              <p className="mt-2 text-gray-500">Temperature: {item.temperature}</p>
              <p className="mt-2 text-gray-500">Humidity: {item.humidity}</p>
              <p className="mt-2 text-gray-500">TVOC: {item.tvoc}</p>
              <p className="mt-2 text-gray-500">CO2: {item.co2}</p>
              <p className="mt-2 text-gray-500">PM1: {item.pm1}</p>
              <p className="mt-2 text-gray-500">PM2.5: {item.pm2_5}</p>
              <p className="mt-2 text-gray-500">PM10: {item.pm10}</p>
              <p className="mt-2 text-gray-500">Latitude: {item.latitude}</p>
              <p className="mt-2 text-gray-500">Longitude: {item.longitude}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Live;
