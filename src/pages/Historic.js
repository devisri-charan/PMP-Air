import React, { useEffect, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

// function Historic() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("/v1/data/all")
//       .then((response) => response.json())
//       .then((data) => setData(data));
//   }, []);

//   const pm1Data = {
//     labels: data.map((datum) => new Date(datum.date).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })),
//     datasets: [
//       {
//         label: "PM1",
//         data: data.map((datum) => datum.pm1),
//         fill: false,
//         borderColor: "#2563eb",
//       },
//     ],
//   };

//   const pm2_5Data = {
//     labels: data.map((datum) => new Date(datum.date).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })),
//     datasets: [
//       {
//         label: "PM2.5",
//         data: data.map((datum) => datum.pm2_5),
//         fill: false,
//         borderColor: "#2563eb",
//       },
//     ],
//   };

//   const pm10Data = {
//     labels: data.map((datum) => new Date(datum.date).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })),
//     datasets: [
//       {
//         label: "PM10",
//         data: data.map((datum) => datum.pm10),
//         fill: false,
//         borderColor: "#2563eb",
//       },
//     ],
//   };
  
//   const co2Data = {
//     labels: data.map((datum) => new Date(datum.date).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })),
//     datasets: [
//       {
//         label: "CO2",
//         data: data.map((datum) => datum.co2),
//         fill: false,
//         borderColor: "#2563eb",
//       },
//     ],
//   };

//   const tvocData = {
//     labels: data.map((datum) => new Date(datum.date).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })),
//     datasets: [
//       {
//         label: "TVOC",
//         data: data.map((datum) => datum.tvoc),
//         fill: false,
//         borderColor: "#2563eb",
//       },
//     ],
//   };

//   return (
//     <div className="h-screen p-20">
//       <div className="flex justify-center items-center">
//         <Line key="pm1" data={pm1Data} options={{ scales: { y: { beginAtZero: false }, x: { type: 'category', position: 'bottom' } } }} />
//       </div>
//       <div className="flex justify-center items-center">
//         <Line key="pm2_5" data={pm2_5Data} options={{ scales: { y: { beginAtZero: true }, x: { type: 'category', position: 'bottom' } } }} />
//       </div>
//       <div className="flex justify-center items-center">
//         <Line key="pm10" data={pm10Data} options={{ scales: { y: { beginAtZero: true }, x: { type: 'category', position: 'bottom' } } }} />
//       </div>
//       <div className="flex justify-center items-center">
//         <Line key="co2" data={co2Data} options={{ scales: { y: { beginAtZero: true }, x: { type: 'category', position: 'bottom' } } }} />
//       </div>
//       <div className="flex justify-center items-center">
//         <Line key="tvoc" data={tvocData} options={{ scales: { y: { beginAtZero: true }, x: { type: 'category', position: 'bottom' } } }} />
//       </div>
//     </div>
//   );
// }
function Historic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/v1/data/all")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const pmData = useMemo(() => ({
    labels: data.map((datum) => new Date(datum.timestamp * 1000).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })),
    datasets: [
      {
        label: "PM1",
        data: data.map((datum) => datum.pm1),
        fill: true,
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        borderWidth: 0,
        pointRadius: 0,
        borderColor: "#2563eb",
      },
      {
        label: "PM2.5",
        data: data.map((datum) => datum.pm2_5),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 0,
        pointRadius: 0,
        borderColor: "#ff6384",
      },
      {
        label: "PM10",
        data: data.map((datum) => datum.pm10),
        fill: true,
        backgroundColor: "rgba(0, 99, 132, 0.2)",
        borderWidth: 0,
        pointRadius: 0,
        borderColor: "#aa6384",
      },
    ],
  }), [data]);

  const filterData = (hours) => {
    const now = Date.now() / 1000; // convert to seconds
    const startTime = now - hours * 3600;
    return data.filter((datum) => datum.timestamp >= startTime);
  };

  const handleLast9HoursClick = () => {
    const filteredData = filterData(9);
    const labels = filteredData.map((datum) => new Date(datum.timestamp * 1000).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }));
    const pm1Values = filteredData.map((datum) => datum.pm1);
    const pm2_5Values = filteredData.map((datum) => datum.pm2_5);
    const pm10Values = filteredData.map((datum) => datum.pm10);
    setChartData({ labels, pm1Values, pm2_5Values, pm10Values });
  };

  const handleLast24HoursClick = () => {
    const filteredData = filterData(24);
    const labels = filteredData.map((datum) => new Date(datum.timestamp * 1000).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }));
    const pm1Values = filteredData.map((datum) => datum.pm1);
    const pm2_5Values = filteredData.map((datum) => datum.pm2_5);
    const pm10Values = filteredData.map((datum) => datum.pm10);
    setChartData({ labels, pm1Values, pm2_5Values, pm10Values });
  };

  const [chartData, setChartData] = useState({ labels: [], pm1Values: [], pm2_5Values: [], pm10Values: []});

  useEffect(() => {
    setChartData({ labels: pmData.labels, pm1Values: pmData.datasets[0].data, pm2_5Values: pmData.datasets[1].data, pm10Values: pmData.datasets[2].data});
  }, [pmData]);

  return (
    <div className="h-screen p-20 mb-8">
      <div className="mt-4 flex justify-center items-center space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLast9HoursClick}>Last 9 hours</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLast24HoursClick}>Last 24 hours</button>
      </div>
      <div className="flex justify-center items-center">
        <Line key="pm" data={
          {labels: chartData.labels,
          datasets: [
            { ...pmData.datasets[0], data: chartData.pm1Values },
            { ...pmData.datasets[1], data: chartData.pm2_5Values },
            { ...pmData.datasets[2], data: chartData.pm10Values }]}
            } 
          options={{
            scales: {
              y: {
                beginAtZero: false },
              x: {
                type: 'category',
                position: 'bottom' }
                } 
              }
              }/>
      </div>
    </div>
  );
}

export default Historic;