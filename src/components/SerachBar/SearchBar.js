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
    // const [location, setLocation] = useState("Veliko Tarnovo");

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
        <div>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                value={searchValue}
                onChange={onChangeHandler}
                style={{
                    width: 300,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 30,
                    display: "block",
                }}
            />
        </div>
    );
};

export default SearchBar;
