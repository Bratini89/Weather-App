import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import RingLoader from 'react-spinners/RingLoader';
import Hello from './components/Hello';



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

  const hi = () => {
    alert('Espero que te haya gustado esta App')
  }

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
            <br />
            <img className="img" src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="Weather" />
            <br />
            <div className='container'>
              <p>
                <i className="fa-solid fa-temperature-three-quarters"></i> {" "}
                <b>Temperature:</b> {isCelsius ? ((weather.main?.temp) - 273.15).toFixed() : ((weather.main?.temp) * 9 / 5 - 459.67).toFixed()}
                {" "}{isCelsius ? "°Celsius" : "°Fahrenheit"}
              </p>
              <div className='list'>
                <ul>
                  <li>
                    <i className="fa-solid fa-droplet"></i> {" "}
                    <b>Humidity:</b>{" "}{weather.main?.humidity}%</li>
                  <li>
                    <i className="fa-solid fa-wind"></i>{" "}
                    <b>Wind Speed:</b>{" "}{weather.wind?.speed} m/s</li>
                  <li>
                    <i class="fa-solid fa-poo-storm"></i>{" "}
                    <b>Pressure:</b> {weather.main?.pressure} Mb
                  </li>
                  <li>
                    <i class="fa-solid fa-temperature-arrow-up"></i> {" "}
                    <b>Temp max:</b>{" "}
                    {isCelsius ? ((weather.main?.temp_max) - 273).toFixed() : ((weather.main?.temp_max) * 9 / 5 - 459.67).toFixed()}
                    {" "}{isCelsius ? "°C" : "°F"}
                  </li>
                </ul>
                <ul>
                  <li>
                    <i class="fa-solid fa-temperature-quarter"></i> {" "}
                    <b>Feels like:</b> {isCelsius ?
                      ((weather.main?.feels_like) - 273).toFixed() : ((weather.main?.feels_like) * 9 / 5 - 459.67).toFixed()}
                    {" "}{isCelsius ? "°C" : "°F"}
                  </li>
                  <li>
                    <i class="fa-solid fa-cloud"></i>{" "}
                    "{weather.weather?.[0].main}"
                  </li>
                  <li>
                    <i class="fa-regular fa-lightbulb"></i>{" "}
                    {weather.weather?.[0].id}
                  </li>
                  <li>
                    <i class="fa-solid fa-temperature-arrow-down"></i>{" "}
                    <b>Temp Min:</b>{" "}
                    {isCelsius ? ((weather.main?.temp_min) - 273).toFixed() :
                      ((weather.main?.temp_min) * 9 / 5 - 459.67).toFixed()
                    }
                    {" "}{isCelsius ? "°C" : "°F"}
                  </li>
                </ul>
              </div>
            </div>
            <button className='btn' onClick={() => setIsCelsius(!isCelsius)}>
              Change <b>°C / °F</b></button>
            <br /><br />
            <hr /><hr /><br />
            <Hello />
            <button className="small1" onClick={hi}><i class="fa-regular fa-face-smile"></i></button>
          </div>
        }

      </div>

    </>

  )
}

export default App
