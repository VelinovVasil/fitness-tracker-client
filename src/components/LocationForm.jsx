import React, { useState } from 'react';

export default function LocationForm({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <form className="location-form" onSubmit={handleSubmit}>
      <label>
        Location Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save Location</button>
    </form>
  );
}
