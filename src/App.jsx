import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import RingLoader from 'react-spinners/RingLoader';



function App() {

  const [weather, setWeather] = useState({})
  const [isCelsius, setIsCelsius] = useState(true)

  const [loading, setLoading] = useState(false)


  useEffect(() => {

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 8000)

    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=69feb2ae83baac245f4fec330f8842c0`)
        .then(res => setWeather(res.data))

    }

    navigator.geolocation.getCurrentPosition(success);



  }, [])

  console.log(weather)



  return (
    <>

      <div className="App">

        {loading ?

          <RingLoader
            color={"#fefedf"}
            size={70}
            loading={loading}
          />
          :

          <div className='header'>
            <h2>Weather Condition App</h2>
            <h3><i className="fa-solid fa-location-dot "></i> {" "}
              <b> Country:</b> {weather.sys?.country}
            </h3>
            <h3>
              <i className="fa-solid fa-city"></i> {" "}
              <b>City:</b>{" "}{weather.name}</h3><br /><br />
            <p className='classp'>"{weather.weather?.[0].description}"</p>
            <br /><br />
            <img className="img" src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="Weather" />
            <br />
            <div className='container'>
              <p>
                <i className="fa-solid fa-temperature-three-quarters"></i> {" "}
                <b>Temperature:</b> {isCelsius ? ((weather.main?.temp) - 273.15).toFixed() : ((weather.main?.temp) * 9 / 5 - 459.67).toFixed()}
                {" "}{isCelsius ? "°Celsius" : "°Fahrenheit"}
              </p>

              <ul>
                <li>
                  <i className="fa-solid fa-droplet"></i> {" "}
                  <b>Humidity:</b>{" "}{weather.main?.humidity}%</li>
                <li>
                  <i className="fa-solid fa-wind"></i>{" "}
                  <b>Wind Speed:</b>{" "}{weather.wind?.speed} m/s</li>
                <li>
                  <i className="fa-solid fa-temperature-arrow-down"></i>{" "}
                  <b>Pressure:</b> {weather.main?.pressure} Mb
                </li>
              </ul>
            </div>
            <button className='btn' onClick={() => setIsCelsius(!isCelsius)}>
              <b>°Celsius | °Fahrenheit</b></button>
          </div>
        }
      </div>

    </>

  )
}

export default App
