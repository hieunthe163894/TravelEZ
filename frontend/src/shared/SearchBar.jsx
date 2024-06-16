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
  const rateRef = createRef();
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current?.value || "";
    const maxGroupSize = maxGroupSizeRef.current?.value || "";
    const price = priceRef.current?.value || "";
    const searchTime = searchTimeRef.current?.value || "";
    const rate = rateRef.current?.value || "";

    try {
      const res = await fetch(
        `${BASE_URL}/tours/search/getTourBySearch?city=${location}&maxGroupSize=${maxGroupSize}&price=${price}&searchTime=${searchTime}&rate=${rate}`
      );

      if (!res.ok) throw new Error("Dữ liệu bạn nhập không tồn tại");

      const result = await res.json();
      navigate(
        `/tours/search?city=${location}&maxGroupSize=${maxGroupSize}&price=${price}&searchTime=${searchTime}&rate=${rate}`,
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
              <h6>Địa điểm</h6>
              <input
                type="text"
                placeholder="Địa điểm bạn muốn đến ?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Số người</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-money-dollar-circle-line"></i>
            </span>
            <div>
              <h6>Giá</h6>
              <input type="number" placeholder="0" ref={priceRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-star-line"></i>
            </span>
            <div>
              <h6>Đánh giá</h6>
              <input type="number" placeholder="0" ref={rateRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-time-line"></i>
            </span>
            <div>
              <h6>Đặt lịch</h6>
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
