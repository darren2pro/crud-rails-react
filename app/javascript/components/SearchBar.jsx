import React from "react";
import { Input } from 'antd';
const { Search } = Input;

const SearchBar = (props) => {

    const onSearch = (event) => {
        props.onSearch(event.target.value);
    };

    return (
        <Search placeholder="input search text" enterButton="Search" size="middle" loading={true}
                onSearch={onSearch} onChange={onSearch} onPressEnter={onSearch}
                value={props.input ? props.input : ""} />
    );
};

export default SearchBar;
