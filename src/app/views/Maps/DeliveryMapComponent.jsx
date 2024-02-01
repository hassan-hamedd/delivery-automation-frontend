import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryComponent = () => {
  const [emiratesData, setEmiratesData] = useState({});
  const [selectedEmirate, setSelectedEmirate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [loading, setLoading] = useState(true)

  const selectedDriver = emiratesData[selectedEmirate]?.driver;
  const selectedVehicle = emiratesData[selectedEmirate]?.vehicle;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://delivery-automation-backend.vercel.app/api/v1/invoice/invoice-list');
        setEmiratesData(response.data.emiratesData);
        // Set the default selected emirate and location
        const defaultEmirate = Object.keys(response.data.emiratesData)[0];
        console.log("Data: ", response.data)
        setSelectedEmirate(defaultEmirate);
        setSelectedLocation(response.data.emiratesData[defaultEmirate].locations[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const handleEmirateChange = (emirate) => {
    setSelectedEmirate(emirate);
    setSelectedLocation(emiratesData[emirate].locations[0]);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleTimeChange = (event) => {
    setDeliveryTime(event.target.value);
  };

  const handleSaveChanges = () => {
    // Implement saving changes to the state or making API requests to save data
    console.log('Delivery time:', deliveryTime);
  };

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h2>Select Emirate:</h2>
      <select value={selectedEmirate} onChange={(e) => handleEmirateChange(e.target.value)}>
        {Object.keys(emiratesData).map((emirate) => (
          <option key={emirate} value={emirate}>{emirate}</option>
        ))}
      </select>

      <h2>Invoices for {selectedEmirate}:</h2>
      <ul>
        {emiratesData[selectedEmirate] && emiratesData[selectedEmirate].invoices.map((invoice) => (
          <li key={invoice._id}>{invoice.invoiceNumber}</li>
        ))}
      </ul>

      <h2>Selected Driver:</h2>
      <p>Name: {selectedDriver?.driverName}</p>
      <p>Code: {selectedDriver?.driverCode}</p>

      <h2>Selected Vehicle:</h2>
      <p>Name: {selectedVehicle?.brand}</p>
      <p>Code: {selectedVehicle?.vehiculeCode}</p>

      <h2>Select Delivery Time:</h2>
      <input type="datetime-local" value={deliveryTime} onChange={handleTimeChange} />

      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default DeliveryComponent;
