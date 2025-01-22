import React, { useState } from 'react';

const cities = [
  "Islamabad", "Lahore", "Quetta", "Multan", "Rawalpindi", "Hyderabad", "Mirpurkhas", "Malir", "Karachi"
];

function AddressForm() {
  const [selectedCity, setSelectedCity] = useState("");

  // Explicitly typing the event parameter
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <label htmlFor="city">Select City</label>
      <select
        id="city"
        name="city"
        value={selectedCity}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddressForm;
