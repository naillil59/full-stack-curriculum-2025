import React, { useState, useEffect } from "react";

function WeatherCards(props) {

    let listOnly = props.weatherForecastData.list;
    console.log(listOnly)

    const dailyTemps = []
    for (let day = 0; day < 5; day++) {
        const dayData = listOnly.slice(day * 8, (day*8 + 8))
        console.log(dayData)
        const temps = dayData.map(item => item.main.temp)
        const minTemp = Math.min(...temps)
        const maxTemp = Math.max(...temps)
        dailyTemps.push({minTemp, maxTemp})
    }

    const weatherCondition = []
		//recorded conditions are at 12pm (12/3=4 so start at 4)
		for (let i = 4; i < listOnly.length; i+=8) {
			weatherCondition.push(listOnly[i].weather[0].main)
		}

    return (
        <div id="forecast-container" style={{ 
            display: "flex", 
            flexDirection: "row",
            flexWrap: "nowrap", 
            justifyContent: "center"
             }}>
            {dailyTemps.map((temp, i) => (
            <div
                key={i}
                style={{
                background: "white",
                width: "80%",
                margin: "2%",
                padding: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
            >
                <h2 style={{ fontSize: ".8rem", margin: "5%" }}>{props.formatDate(i + 1)}</h2>
                <img src={props.conditionImage(weatherCondition[i])} alt="weather icon" />
                <h1 style={{ fontSize: "1rem", margin: "5%" }}>
                {Math.round(temp.maxTemp)}° / {Math.round(temp.minTemp)}°
                </h1>
            </div>
            ))}
        </div>
        );
}

export default WeatherCards;
