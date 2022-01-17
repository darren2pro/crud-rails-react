import React from "react";
import {message, Popconfirm, Table} from "antd";
import AddBeerModal from "./AddBeerModal";
import {Link} from "react-router-dom";
import EditBeerModal from "./EditBeerModal";

class BeerList extends React.Component {
    columns = [
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Style",
            dataIndex: "style",
            key: "style",
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "",
            key: "actions",
            render: (_text, record) => (
                <>
                    <Popconfirm title="Are you sure to delete this beer?" onConfirm={() => this.deleteBeer(record.id)} okText="Yes" cancelText="No">
                        <a href="#" type="danger">
                            Delete{" "}
                        </a>
                    </Popconfirm>
                    <Link to={`/${record.id}`}>Show</Link>
                    <br/>
                    <EditBeerModal reloadBeers={() => this.reloadBeers()} beerId={record.id} />
                </>
            ),
        },
    ];
    state = {
        beers: [],
    };
    loadBeers = () => {
        const url = "api/v1/beers/index";
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

                    this.setState((prevState) => ({
                        beers: [...prevState.beers, newEl],
                    }));
                });
            })
            .catch((err) => message.error("Error: " + err));
    };
    componentDidMount() {
        this.loadBeers();
    }
    reloadBeers = () => {
        this.setState({ beers: [] });
        this.loadBeers();
    };

    deleteBeer = (id) => {
        const url = `api/v1/beers/${id}`;

        fetch(url, {
            method: "delete",
        })
            .then((data) => {
                if (data.ok) {
                    this.reloadBeers();
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .catch((err) => message.error("Error: " + err));
    };

    render() {
        const toDisplay = typeof this.props.userFacingBeerList[0] == "undefined" ? this.state.beers: this.props.userFacingBeerList;
        return (
            <>
                <Table className="table-striped-rows" dataSource={toDisplay} columns={this.columns} pagination={{ pageSize: 5 }} />

                <AddBeerModal reloadBeers={this.reloadBeers} />
            </>
        )
    }
}

export default BeerList;
