import React, { useState } from "react";

import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const geoApiOptions = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "esGbwrm390mshS2BCl0RALxQRtZTp1W7sFMjsnyJlJzDXVkW0H", // enter your rapid api key here
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
    };
    const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`, geoApiOptions)
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.longitude} ${city.latitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            });
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
