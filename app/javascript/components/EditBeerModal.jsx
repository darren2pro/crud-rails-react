import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

const { Option } = Select;

class EditBeerModal extends React.Component {
    formRef = React.createRef();
    state = {
        visible: false,
        currentBeerElement: {
            key: "",
            id: "",
            brand: "",
            style: "",
            country: "",
            quantity: "",
        },
    };

    loadBeer = () => {
        const url = `api/v1/beers/${this.props.beerId}`;
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
                this.setState({currentBeerElement: currentBeerElement})
            })
            .catch((err) => console.error("Error: " + err));
    };

    componentDidMount() {
        this.loadBeer();
    }

    onFinish = (values) => {
        console.log("values:", values);
        const url = `api/v1/beers/${this.props.beerId}`;
        fetch(url, {
            method: "put",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((data) => {
                if (data.ok) {
                    this.handleCancel();

                    return data.json();
                }
                console.log(data);
                throw new Error("Network error.");
            })
            .then(() => {
                this.props.reloadBeers();
            })
            .catch((err) => console.error("Error caught from the code: " + err));
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showModal}>
                    Edit this
                </Button>

                <Modal title="Edit this beer ..." visible={this.state.visible} onCancel={this.handleCancel} footer={null}>
                    <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} initialValues={{
                        brand: this.state.currentBeerElement.brand,
                        style: this.state.currentBeerElement.style,
                        quantity: this.state.currentBeerElement.quantity,
                        country: this.state.currentBeerElement.country,
                    }}>
                        <Form.Item name="brand" label="Brand" rules={[{ required: true, message: "Please input your beer brand!" }]}>
                            <Input placeholder="Input your beer brand" />
                        </Form.Item>

                        <Form.Item name="style" label="Style" rules={[{ required: true, message: "Please input your beer style!" }]}>
                            <Input placeholder="Input your beer style" />
                        </Form.Item>

                        <Form.Item
                            name="country"
                            label="Country"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the country of the beer!",
                                },
                            ]}
                        >
                            <Select showSearch placeholder="Select your beer country" optionFilterProp="children" style={{ width: "100%" }}>
                                <Option value="Finland">Finland</Option>
                                <Option value="Germany">Germany</Option>
                                <Option value="Netherlands">Netherlands</Option>
                                <Option value="UK">UK</Option>
                                <Option value="USA">USA</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Please input the quantity!" }]}>
                            <Input type="number" placeholder="How many beers you desire?" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default EditBeerModal;
