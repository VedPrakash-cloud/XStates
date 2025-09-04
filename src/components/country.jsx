import {useState, useEffect} from 'react';
import axios from 'axios';

export default function CountryList(){
    const [country, setCountry] = useState([]);
    const [states, setStates] = useState([]);
    const [city, setCity] = useState([]);


    const [selectedCountry, setSelectedCountry] = useState('');
    const[selectedStates, setSelectedStates] = useState('');
    const [selectedCity, setSelectedCity] = useState('');


    useEffect(()=>{
        const fetchApi = async ()=>{
            try{
                const response = await axios.get('https://crio-location-selector.onrender.com/countries');
                setCountry(response.data);
            }catch(err){
                console.error("Error fetch data:", err);
            }
        }
        fetchApi();
    },[])

    useEffect(()=>{
        setSelectedStates('');
        setSelectedCity('');
        setStates([]);
        setCity([]);
        if(!selectedCountry)return;
        const fetchStates = async ()=>{
            try{
                const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                setStates(response.data);
            }catch(err){
                console.error("Error fetching data:",err);
            }
        }
        fetchStates()
    },[selectedCountry])

    useEffect(()=>{
        setSelectedCity('');
        setCity([]);
        if(!selectedCountry || !selectedStates)return;
        const fetchCity = async ()=>{
            try{
                const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedStates}/cities`)
                setCity(response.data);
            }catch(err){
                console.error("Error fetching data:", err);
            }
        }
        fetchCity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedStates])

    const handleChange =(e)=>{
        setSelectedCountry(e.target.value);
    }

    const handleChangeStates =(e)=>{
        setSelectedStates(e.target.value);
    }

    const handleChangeCity = (e)=>{
        setSelectedCity(e.target.value);
    }


    return(
        <div>
            <div className='flex flex-col items-center mt-8'>
                <h1 className='text-2xl font-bold'>Select Location</h1>
            <div className='flex gap-3 p-10 align-center'>
                <select className='border rounded-md' onChange={handleChange}>
                <option value="Select Country" className='text-center'> Select Country </option>
                {country.map((list,index)=>(
                    <option key={index} value={list}>{list}</option>
                ))}
            </select>
            <select key={states.name} onChange={handleChangeStates} disabled={!selectedCountry} className='border rounded-md'> 
                <option defaultChecked="Select State" > Select State </option>
                {states.map((names,index)=>(
                    <option key={index} value={names}>{names}</option>
                ))}
            </select>
            <select key={city.name} disabled={!selectedStates} onChange={handleChangeCity} className='border rounded-md'>
                <option defaultChecked="Select City" > Select City </option>
                {city.map((place,index)=>(
                    <option key={index} value={place}>{place}</option>
                ))}
            </select>
            </div>
            <div>
                {selectedCity?`You Selected ${selectedCity}, ${selectedStates}, ${selectedCountry}`:''}
            </div>
            </div>
        </div>
    )
}