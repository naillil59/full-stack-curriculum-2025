import React, { useState, useEffect } from "react";
import TodaysWeather from "./TodaysWeather.js"
import "../styles/MainContainer.css"; // Import the CSS file for MainContainer
import WeatherCards from "./WeatherCards";
import clearIcon from "../icons/01d.svg";
import cloudsIcon from "../icons/03d.svg";
import rainIcon from "../icons/09d.svg";

function MainContainer(props) {
  function formatDate(daysFromNow = 0) {
    let output = "";
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
    output += " " + date.getDate();
    return output;
  }

  function conditionImage(weatherCondition) {
          switch (weatherCondition) {
            case "Clear":
              return clearIcon;
            case "Clouds":
              return cloudsIcon;
            case "Rain":
              return rainIcon;
            default:
              return cloudsIcon; // fallback icon
          }
        }

  /*
  STEP 1: IMPORTANT NOTICE!

  Before you start, ensure that both App.js and SideContainer.js are complete. The reason is MainContainer 
  is dependent on the city selected in SideContainer and managed in App.js. You need the data to flow from 
  App.js to MainContainer for the selected city before making an API call to fetch weather data.
  */
  
  /*
  STEP 2: Manage Weather Data with State.
  
  Just like how we managed city data in App.js, we need a mechanism to manage the weather data 
  for the selected city in this component. Use the 'useState' hook to create a state variable 
  (e.g., 'weather') and its corresponding setter function (e.g., 'setWeather'). The initial state can be 
  null or an empty object.
  */

  const[todaysWeather, setTodaysWeather] = useState();
  const[weatherForecast, setWeatherForecast] = useState();
  const[aqi, setAqi] = useState();   
  
  /*
  STEP 3: Fetch Weather Data When City Changes.
  
  Whenever the selected city (passed as a prop) changes, you should make an API call to fetch the 
  new weather data. For this, use the 'useEffect' hook.

  The 'useEffect' hook lets you perform side effects (like fetching data) in functional components. 
  Set the dependency array of the 'useEffect' to watch for changes in the city prop. When it changes, 
  make the API call.

  After fetching the data, use the 'setWeather' function from the 'useState' hook to set the weather data 
  in your state.
  */

  async function fetchTodaysData() {
    let todaysWeatherApiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&units=imperial&appid=${props.apiKey}`;
    let todayResponse = await fetch(todaysWeatherApiCall);
    let todayData = await todayResponse.json();
    return todayData;
  }

  async function fetchForecastData() {
    let weatherForecastApiCall = `http://api.openweathermap.org/data/2.5/forecast?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&units=imperial&appid=${props.apiKey}`;
    let weatherResponse = await fetch(weatherForecastApiCall);
    let weatherData = await weatherResponse.json();
    const jsonString = JSON.stringify(weatherData);
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  }

  async function fetchAqiData(){
    let aqiApiCall = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&appid=${props.apiKey}`
    let aqiResponse = await fetch(aqiApiCall)
    let aqiData = await aqiResponse.json()
    return aqiData
  }

  useEffect(() => {
    if (!props.selectedCity) return;
    async function fetchAllData() {
      const today = await fetchTodaysData();
      const forecast = await fetchForecastData();
      const air = await fetchAqiData();
      setTodaysWeather(today);
      setWeatherForecast(forecast);
      setAqi(air);
    }
    fetchAllData();
  }, [props.selectedCity]);
  
  
  return (
    <div id="main-container">
      <div id="weather-container">
        {/* 
        STEP 4: Display Weather Data.
        
        With the fetched weather data stored in state, use conditional rendering (perhaps the ternary operator) 
        to display it here. Make sure to check if the 'weather' state has data before trying to access its 
        properties to avoid runtime errors. 

        Break down the data object and figure out what you want to display (e.g., temperature, weather description).
        This is a good section to play around with React components! Create your own - a good example could be a WeatherCard
        component that takes in props, and displays data for each day of the week.
        */
        }
        {!weatherForecast || !aqi ? (<div> </div>) : (
          <>
           <TodaysWeather conditionImage={conditionImage} todaysWeather={todaysWeather} aqi={aqi} formatDate={formatDate} city={props.selectedCity}></TodaysWeather>
           <br />
           <br />
           <div>
           <WeatherCards weatherForecastData={weatherForecast} formatDate={formatDate} conditionImage={conditionImage}></WeatherCards>
           </div>  
          </>
        )}
      </div>
    </div>
  );
}


export default MainContainer;

