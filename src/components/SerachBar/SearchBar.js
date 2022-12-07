import { Input, Space, Button } from "antd";
import { useEffect, useState } from "react";
import Axios from "axios";
import { CitiesContext } from "../../CitiesContext";
import { useContext } from "react";
const { Search } = Input;

const SearchBar = ({ onSearchHandler }) => {
    const { location } = useContext(CitiesContext);
    const [locationValue, setLocationValue] = location;

    const [search, setSearch] = useState();
    const [searchValue, setSearchValue] = useState("");

    const key = "682500PcukwQUtq1UDd6XimUfAmBA5HL";
    let URL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${locationValue}`;

    useEffect(() => {
        {
            locationValue &&
                Axios.get(URL).then((res) => {
                    const data = res.data;
                    setSearch({
                        city: data[0].EnglishName,
                        longitude: data[0].GeoPosition.Longitude,
                        latitude: data[0].GeoPosition.Latitude,
                    });
                });
        }
    }, [locationValue]);

    useEffect(() => {
        if (locationValue) onSearchHandler(search);
    }, [search]);

    const onSearch = () => {
        setLocationValue(searchValue);
    };

    const onChangeHandler = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <Search
            placeholder="Search fo a city"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            value={searchValue}
            onChange={onChangeHandler}
        />
    );
};

export default SearchBar;
