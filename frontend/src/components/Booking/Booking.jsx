import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    bookAt: "",
    guestSize: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();
    const { fullName, phone, bookAt, guestSize } = booking;
    let valid = true;
    let newErrors = {
      fullName: "",
      phone: "",
      bookAt: "",
      guestSize: "",
    };

    if (!fullName) {
      newErrors.fullName = "Please enter your full name";
      valid = false;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
      newErrors.phone = "Invalid phone number";
      valid = false;
    }
    if (!bookAt) {
      newErrors.bookAt = "Please select a booking date";
      valid = false;
    }
    if (guestSize > tour.maxGroupSize || guestSize <= 0) {
      newErrors.guestSize = "The number of guests must be within the allowed limit";
      valid = false;
    }

    const bookingDate = new Date(bookAt);
    const currentDate = new Date();
    if (bookingDate <= currentDate) {
      newErrors.bookAt = "The booking date must be in the future";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }

      const res = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      navigate("/thank-you");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          {price} VND<span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i
            className="ri-star-fill"
            style={{ color: "var(--secondary-color)" }}
          ></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* =============== BOOKING FORM START ============== */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              value={booking.fullName}
              onChange={handleChange}
              className={errors.fullName ? "is-invalid" : ""}
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName}</div>
            )}
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              value={booking.phone}
              onChange={handleChange}
              className={errors.phone ? "is-invalid" : ""}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              value={booking.bookAt}
              onChange={handleChange}
              className={errors.bookAt ? "is-invalid" : ""}
            />
            {errors.bookAt && (
              <div className="invalid-feedback">{errors.bookAt}</div>
            )}
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              value={booking.guestSize}
              onChange={handleChange}
              className={errors.guestSize ? "is-invalid" : ""}
            />
            {errors.guestSize && (
              <div className="invalid-feedback">{errors.guestSize}</div>
            )}
          </FormGroup>
        </Form>
      </div>
      {/* =============== BOOKING FORM END ================ */}

      {/* =============== BOOKING BOTTOM ================ */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              {price}VND <i className="ri-close-line"></i> 1 person
            </h5>
            <span> {price}VND</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>{serviceFee}VND</span>
          </ListGroupItem>
          {totalAmount >= 0 && (
            <ListGroupItem className="border-0 px-0 total">
              <h5>Total</h5>
              <span>{totalAmount} VND</span>
            </ListGroupItem>
          )}
          {totalAmount < 10 && (
            <ListGroupItem className="border-0 px-0 total">
              <h5>Total</h5>
              <span>Invalid total amount</span>
            </ListGroupItem>
          )}
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
