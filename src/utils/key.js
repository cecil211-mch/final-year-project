import React, { useState, useEffect } from 'react';

const apiKey = "AIzaSyDkvjHplw2U8wleC5R6Tj05sNGdA7ZjfgQ"; 

function MyComponent() {
  // State variable to store data fetched from an API (example)
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch data from an API
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.example.com/data?key=${apiKey}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      {/* Display the fetched data (example) */}
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
