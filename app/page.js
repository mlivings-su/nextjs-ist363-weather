"use client";
//core
import { useEffect, useState } from "react";

//next.js
import Image from "next/image";

//custom
import List from "../components/List";
import Tabs from "../components/Tabs";

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
  const [daysOfWeek, setDaysOfWeek] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const peopleArr = getPeople();

  useEffect(() => {
    getGeoLocation()
      .then((position) => {
        console.log(position);
        setLocation(position);
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWeatherDataByLatLon(location);
      setWeatherData(response);
    };
    location ? fetchData() : null;
  }, [location]);

  useEffect(() => {
    //filter out days of week
    const tempWeek = [];

    weatherData &&
      weatherData.list.filter((block) => {
        const date = new Date(block.dt * 100);
        const options = { weekday: "short" };
        const day = date.toLocaleDateString("en-US", options);
        // console.log(day);
        if (!tempWeek.includes(day)) {
          tempWeek.push(day);
        }
      });

    setDaysOfWeek(tempWeek);

    //then set state with the day of the week
  }, [weatherData]);

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
      {weatherData && daysOfWeek && (
        <section>
          <Tabs
            activeIndex={activeDayIndex}
            items={daysOfWeek}
            clickHandler={setActiveDayIndex}
          />
          <List
            activeIndex={activeDayIndex}
            items={weatherData.list}
            daysOfWeek={daysOfWeek}
          />
        </section>
      )}
    </div>
  );
};
export default Homepage;
