import React, { createRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = createRef();
  const maxGroupSizeRef = createRef();
  const priceRef = createRef();
  const searchTimeRef = createRef();
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current?.value || "";
    const maxGroupSize = maxGroupSizeRef.current?.value || 0;
    const price = priceRef.current?.value || 0;
    const searchTime = searchTimeRef.current?.value || "";

    if (!location || !maxGroupSize || !price || !searchTime) {
      return alert("All fields are required!");
    }

    try {
      const res = await fetch(
        `${BASE_URL}/tours/search/getTourBySearch?city=${location}&maxGroupSize=${maxGroupSize}&price=${price}&searchTime=${searchTime}`
      );

      if (!res.ok) throw new Error("Something went wrong");

      const result = await res.json();
      navigate(
        `/tours/search?city=${location}&maxGroupSize=${maxGroupSize}&price=${price}&searchTime=${searchTime}`,
        { state: result.data }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-money-dollar-circle-line"></i>
            </span>
            <div>
              <h6>Price</h6>
              <input type="number" placeholder="Price" ref={priceRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-time-line"></i>
            </span>
            <div>
              <h6>Search Time</h6>
              <input type="datetime-local" ref={searchTimeRef} />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
