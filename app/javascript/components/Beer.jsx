import React, {useEffect, useState} from "react";
import { Descriptions } from 'antd';
import { useParams } from "react-router-dom";

const Beer = () => {
    const beerId = useParams().id;
    const skeletonBeerInformation = {
        key: "",
        id: "",
        brand: "",
        style: "",
        country: "",
        quantity: "",
    };
    const [beerInformation, setBeerInformation] = useState(skeletonBeerInformation);

    const loadBeer = () => {
        if (beerInformation != skeletonBeerInformation) {
            return;
        }
        const url = `api/v1/beers/${beerId}`;
        fetch(url)
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
                throw new Error("Network error while getting the particular beer data.");
            })
            .then((beer) => {
                const currentBeerElement = {
                    key: beer.id,
                    id: beer.id,
                    brand: beer.brand,
                    style: beer.style,
                    country: beer.country,
                    quantity: beer.quantity,
                }
                setBeerInformation(currentBeerElement);
            })
            .catch((err) => console.error("Error: " + err));
    };

    loadBeer();

    return (
        <Descriptions title="Beer Info">
            <Descriptions.Item label="brand">{beerInformation.brand}</Descriptions.Item>
            <Descriptions.Item label="style">{beerInformation.style}</Descriptions.Item>
            <Descriptions.Item label="country">{beerInformation.country}</Descriptions.Item>
            <Descriptions.Item label="quantity">{beerInformation.quantity}</Descriptions.Item>
        </Descriptions>
    );
};

export default Beer;
