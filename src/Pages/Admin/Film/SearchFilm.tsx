import Search from "antd/lib/input/Search";
import React from "react";
import { useDispatch } from "react-redux";
import { MovieManament } from "../../../slices/manamentMovie";

const SearchFilm = () => {
  const dispatch = useDispatch<any>();
  const onSearch = (value: any) => {
    console.log(value);
    dispatch(MovieManament(value.target));
  };
  const handleSearch = (evt: any) => {
    if (evt.key !== "Enter") return;
    dispatch(MovieManament(evt.target.value));
    console.log(evt);
  };
  return (
    <Search
      className="mb-5"
      placeholder="input search text"
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      onKeyDown={handleSearch}
    />
  );
};

export default SearchFilm;
