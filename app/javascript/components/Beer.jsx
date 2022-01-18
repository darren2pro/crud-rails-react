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
    const [tagInformation, setTagInformation] = useState([{}]);

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
                console.log("beer beer:", beer);
                const currentBeerElement = {
                    key: beer.id,
                    id: beer.id,
                    brand: beer.brand,
                    style: beer.style,
                    country: beer.country,
                    quantity: beer.quantity,
                }
                let tags = [];
                for (let tagIdx in beer.tags) {
                    const currTag = beer.tags[tagIdx];
                    const polishedTag = {
                        key: currTag.id,
                        id: currTag.id,
                        title: currTag.title,
                    };
                    tags.push(polishedTag);
                }
                setBeerInformation(currentBeerElement);
                setTagInformation(tags);
            })
            .catch((err) => console.error("Error: " + err));
    };

    useEffect( () => {
        loadBeer();
    }, []);

    return (
        <Descriptions title="Beer Info">
            <Descriptions.Item label="brand">{beerInformation.brand}</Descriptions.Item>
            <Descriptions.Item label="style">{beerInformation.style}</Descriptions.Item>
            <Descriptions.Item label="country">{beerInformation.country}</Descriptions.Item>
            <Descriptions.Item label="quantity">{beerInformation.quantity}</Descriptions.Item>
            <Descriptions.Item label="tags">{"This shows the number of tags, but you can easily display all the tags too: " + tagInformation.length}</Descriptions.Item>
        </Descriptions>
    );
};

export default Beer;
