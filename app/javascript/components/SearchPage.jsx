import {Layout, message} from "antd";
import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import Header from "./Header";
import BeerList from "./BeerList";
import Beers from "./Beers";

const { Content, Footer } = Layout;

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [allBeers, setAllBeers] = useState([skeletonBeerInformation]);
    const [filteredBeers, setFilteredBeers] = useState([skeletonBeerInformation]);
    const skeletonBeerInformation = {
        key: "",
        id: "",
        brand: "",
        style: "",
        country: "",
        quantity: "",
    };
    const loadAllBeers = () => {
        const url = "api/v1/beers/index";
        const allBeers = [];
        fetch(url)
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .then((data) => {
                data.forEach((beer) => {
                    const newEl = {
                        key: beer.id,
                        id: beer.id,
                        brand: beer.brand,
                        style: beer.style,
                        country: beer.country,
                        quantity: beer.quantity,
                    };
                    allBeers.push(newEl);
                });
            })
            .catch((err) => message.error("Error: " + err));
        // Now we set to the useState variables we have
        setAllBeers(allBeers);
    };

    const updateInput = (input) => {
        // This only filters by the brand, but we can filter by many other fields. It is a simple modification.
        const filteredBeersTmp = allBeers.filter((beer) => {
            return beer.brand.toLowerCase().includes(input.toLowerCase());
        });
        setSearchQuery(input);
        setFilteredBeers(filteredBeersTmp);
    }

    // This is called whenever the SearchPage is re-rendered.
    useEffect(() => {
        loadAllBeers();
    }, []);

    console.log("re-rendered");
    console.log(filteredBeers);
    return (
        <Layout className="layout">
            <Header />
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content" style={{ margin: "100px auto" }}>
                    <h1>Beer-Searching Catalog</h1>
                    <SearchBar input={searchQuery} onSearch={updateInput} />
                    <BeerList userFacingBeerList={filteredBeers} />
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Honeybadger ©2020.</Footer>
        </Layout>
    );
};

export default SearchPage;
