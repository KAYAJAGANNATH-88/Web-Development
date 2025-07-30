import React, { useState } from 'react';
import axios from 'axios';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'https://openweathermap.org/api'; // Replace with your OpenWeather API key

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found or API error.');
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Weather App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          className="px-4 py-2 rounded border border-gray-300 w-64"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {weather && (
        <div className="bg-white p-6 rounded shadow-md text-center w-80">
          <h2 className="text-2xl font-semibold mb-2">{weather.name}, {weather.sys.country}</h2>
          <p className="text-xl">{weather.main.temp} °C</p>
          <p className="capitalize text-gray-700">{weather.weather[0].description}</p>
          <p className="text-sm mt-2">Humidity: {weather.main.humidity}%</p>
          <p className="text-sm">Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
