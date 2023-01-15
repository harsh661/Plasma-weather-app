import './style.css'
import { getWeather } from './weather'
import { ICONS } from './iconsCode'
import { getCityName } from './location'

navigator.geolocation.getCurrentPosition(success, () => "Cannot get your location. Allow location access!")


function success( { coords }) {
    const cityElem = document.querySelector('[data-city]')

    getCityName(coords.latitude, coords.longitude, cityElem)

    getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then(showWeather)
    .catch(e => {
        alert("Cannot get Weather data!")
    })
}

function showWeather({ current, daily, hourly }) {
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    document.body.classList.remove('blurred')
}

function setVal(selector, value, { parent = document } = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(code) {
    return `icons/${ICONS.get(code)}.svg`
}

const currentIcon = document.querySelector('[data-current-icon]')

function renderCurrentWeather(current) {
    setVal('current-temp', current.currentTemp)
    setVal('current-high', current.highTemp)
    setVal('current-fl-high', current.highFl)
    setVal('current-wind', current.windSpeed)
    setVal('current-low', current.lowTemp)
    setVal('current-fl-low', current.lowFl)
    setVal('current-precip', current.precip)
}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday : "long" })

const dailySection = document.querySelector("[data-day-section]")
const dayCard = document.getElementById("day-card-template")
function renderDailyWeather(daily) {
    dailySection.innerHTML = ''
    daily.forEach(day => {
        const element = dayCard.content.cloneNode(true)
        setVal("temp", day.maxTemp, {parent : element})
        setVal("date", DAY_FORMATTER.format(day.timestamp), {parent : element})
        element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
        dailySection.append(element)
    })
}

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour : "numeric" })

const hourlySection = document.querySelector("[data-hour-section]")
const hourRow = document.getElementById("hour-row-template")
function renderHourlyWeather(hourly) {
    hourlySection.innerHTML = ''
    hourly.forEach(hour => {
        const element = hourRow.content.cloneNode(true)
        setVal("temp", hour.temp, {parent : element})
        setVal("fl-temp", hour.feelsLike, {parent : element})
        setVal("wind", hour.windSpeed, {parent : element})
        setVal("precip", hour.precip, {parent : element})
        setVal("day", DAY_FORMATTER.format(hour.timestamp), {parent : element})
        setVal("time", HOUR_FORMATTER.format(hour.timestamp), {parent : element})
        element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
        hourlySection.append(element)
    })
}