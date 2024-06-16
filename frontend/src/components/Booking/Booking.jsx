import React, { useState, useEffect, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import { formatInTimeZone } from "date-fns-tz";

const Booking = ({ tour, avgRating, start, end }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [timeBooking, setTimeBooking] = useState("");
  const [timeOptions, setTimeOptions] = useState([]);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
    timeBooking: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    bookAt: "",
    guestSize: "",
    timeBooking: "",
  });

  const formatTime = (timeString) => {
    if (!timeString || typeof timeString !== "string") {
      return null;
    }
    const timeParts = timeString.split("T")[1].split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    return hours;
  };

  useEffect(() => {
    const startTime = formatTime(start);
    const endTime = formatTime(end);
    const options = [];
    for (let i = startTime; i <= endTime; i++) {
      const timeString = `${i}:00`;
      options.push(timeString);
    }
    setTimeOptions(options);
    console.log("Updated time options:", options);
  }, [start, end]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "bookAt") {
      const bookingDate = new Date(value);
      const hours = bookingDate.getHours();
      const minutes = "00";
      const bookingTime = `${hours}:${minutes}`;
      setTimeBooking(bookingTime);
      setBooking((prevState) => ({
        ...prevState,
        [id]: value,
        timeBooking: bookingTime,
      }));
    } else {
      setBooking((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
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
      newErrors.guestSize =
        "The number of guests must be within the allowed limit";
      valid = false;
    }

    const bookingTime = new Date(timeBooking);
    const startTime = new Date(start);
    const endTime = new Date(end);

    if (bookingTime < startTime || bookingTime > endTime) {
      newErrors.timeBooking = `The booking time must be between ${start} and ${end}`;
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
      console.log(booking);
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
            <select
              id="timeBooking"
              value={booking.timeBooking}
              onChange={handleChange}
              className={errors.timeBooking ? "is-invalid" : ""}
            >
              <option value="" disabled>
                Open: {formatTime(start)}:00{" "}
                {formatTime(start) > 12 ? "PM" : "AM"} - Close:{" "}
                {formatTime(end) > 12 ? formatTime(end) - 12 : formatTime(end)}
                :00 {formatTime(end) > 12 ? "PM" : "AM"}
              </option>
              {timeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {parseInt(option.split(":")[0]) > 12
                    ? parseInt(option.split(":")[0]) - 12
                    : parseInt(option.split(":")[0])}
                  :{option.split(":")[1]}{" "}
                  {parseInt(option.split(":")[0]) > 12 ? "PM" : "AM"}
                </option>
              ))}
            </select>
            {errors.timeBooking && (
              <div className="invalid-feedback">{errors.timeBooking}</div>
            )}
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
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
          {totalAmount >= 11 && (
            <ListGroupItem className="border-0 px-0 total">
              <h5>Total</h5>
              <span>{totalAmount} VND</span>
            </ListGroupItem>
          )}
          {totalAmount < 11 && (
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
