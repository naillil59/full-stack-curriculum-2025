import React, { useState, useEffect } from "react";

function TodaysWeather(props) {
	let imageSrc = props.conditionImage(props.todaysWeather.weather[0].main)
    return(
        <>
        <h4 id="date">{props.formatDate()}</h4>
        <h2 id="weather-for-city">Weather for {props.city.name + ", " + props.city.state}</h2>
        <br />
        <div class ="whole" style={{ 
            display: "flex", 
            flexDirection: "row",
            flexWrap: "nowrap", 
            width: "80%",
            height: "20%",
             }}>
            <div class="current" style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <h3 id="weather-condition" style={{margin: 0}}>{props.todaysWeather.weather[0].main}</h3>
                <h1 id="current-temp" style={{margin: 0}}>{Math.round(props.todaysWeather.main.temp) + "°"}</h1>
                <h4 id="aqi" style={{margin: 0}}>AQI: {props.aqi.list[0].main.aqi}</h4>
            </div>
            <img src={imageSrc} class="condition-picture" style={{objectFit: "contain",}} />
        </div>
        </>
    );
}

export default TodaysWeather