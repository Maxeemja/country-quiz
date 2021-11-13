import { useHttp } from "../hooks/http.hook"
import { v4 as uuidv4 } from 'uuid';

export const useCountryService = () => {
    const {request} = useHttp();

    const randIndx = Math.floor(Math.random() * 249);
    const _apiBase = 'https://restcountries.com/v3.1/';
    const getRandomCountry = async () => {
        const res = await request(`${_apiBase}all`);
        const name = _transformData(res[randIndx]).name;
        return [_transformData(res[randIndx]), ...res.sort(() => Math.random() - Math.random()).filter(el => el.name !== name).slice(0, 3).map(_transformData)]
    }
    
    const _transformData = (country) => {
        return {
            name: country.name.common,
            capital: country.capital,
            flag: country.flags.png,
            subregion: country.subregion,
            continent: country.continents[0],
            id: uuidv4()
        }
    }

    return {getRandomCountry}
}
