"use client";

import { useEffect, useState } from "react";
import Image from "next/images";
import ButtonDemo from "../components/ButtonDemo";
import ColorPicker from "../components/ColorPicker";
import PeoplePicker from "../components/PeoplePicker";

import {
  getGeoLocation,
  getPeople,
  getWeatherData,
  getWeatherDataByLatLon,
} from "../lib/api.js";

// import {} from "next/dist/lib/constants";

const Homepage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const peopleArr = getPeople();

  useEffect(() => {
    getGeoLocation()
      .then((position) => {
        console.log(position);
        setLocation(position);
      })
      .catch((error) => {
        setErrorMsg(error);
        // console.log(error);
      });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getWeatherDataByLatLon(location);
      setWeatherData(response);
    };
    location ? fetchData() : null;
  }, [location]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getWeatherData();
  //     setWeatherData(response);
  //   };
  //   fetchData();
  // }, []);

  //console.log({ peopleArr });
  return (
    <div>
      <h1> Weather App </h1>
      (errorMsg && <div>{errorMsg}</div>)
      {weatherData && (
        <div>
          <h2>{weatherData.city.name}</h2>
          <p>Current temp: {weatherData.list[0].main.temp}&deg; F</p>
          <p>{weatherData.list[0].weather[0].description}</p>

          <Image
            //why is the {weatherdata section same color as the link}********
            src={
              "https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png"
            }
            alt={
              "Weather icon for ${weatherData.list[0].weather[0].description}"
            }
            width={100}
            height={100}
          />
        </div>
      )}
      {/* <PeoplePicker people={peopleArr} />
      <ButtonDemo />
      <ColorPicker /> */}
    </div>
  );
};
export default Homepage;
