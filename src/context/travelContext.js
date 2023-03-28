import { React, createContext, useState } from 'react';
import axios from 'axios';

export const TravelContext = createContext(null);

const TravelProvider = ({ children }) => {
  const [travels, setTravels] = useState([]);

  const [filteredTravel, setFilteredTravel] = useState([]);

  const [render, setRender] = useState(false);

  const getTravel = () => {
    axios
      .get('http://localhost:8000/travel')
      .then((res) => {
        console.log('TRAVEL', res.data);
        setTravels(res.data.travels);
        setFilteredTravel(res.data.travel);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };
  return (
    <TravelContext.Provider value={{ getTravel, travels, setTravels, filteredTravel, setFilteredTravel }}>
      {children}
    </TravelContext.Provider>
  );
};

export default TravelProvider;
