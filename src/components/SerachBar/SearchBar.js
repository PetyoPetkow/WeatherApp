import { Input, Space, Button } from "antd";
import { useEffect, useState } from "react";
import Axios from "axios";
const { Search } = Input;

const SearchBar = ({ onSearchHandler }) => {
    const [search, setSearch] = useState();
    const [searchValue, setSearchValue] = useState("");
    const [location, setLocation] = useState("Veliko Tarnovo");

    const key = "682500PcukwQUtq1UDd6XimUfAmBA5HL";
    let URL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${location}`;

    useEffect(() => {
        {
            location &&
                Axios.get(URL).then((res) => {
                    const data = res.data;
                    setSearch({
                        city: data[0].EnglishName,
                        longitude: data[0].GeoPosition.Longitude,
                        latitude: data[0].GeoPosition.Latitude,
                    });
                });
        }
    }, [location]);

    useEffect(() => {
        if (location) onSearchHandler(search);
    }, [search]);

    const onSearch = () => {
        setLocation(searchValue);
    };

    const onChangeHandler = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div>
            <Search
                placeholder="input search text"
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
