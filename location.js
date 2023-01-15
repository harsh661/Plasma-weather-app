import axios from "axios"

export function getCityName(lat, lng, elem) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`

    return axios.get(url)
    .then(({data}) => {
        elem.innerHTML = (data.address.city)
    })
    .catch(error => {
        console.log(error)
    });
}