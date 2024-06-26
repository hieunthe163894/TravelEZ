import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/tour-details.css";
// import tourData from '../assets/data/tours'
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { formatInTimeZone } from "date-fns-tz";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  // fetch data from database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  const {
    photo = [],
    title,
    desc,
    price,
    city,
    address,
    maxGroupSize,
    srcMap,
    opentime,
  } = tour || {};

  const [reviews, setData] = useState([]);

  const fetchReviewData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tours/reviews/${id}`);
      const result = await res.json();
      setData(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchReviewData();
  }, []);

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
      }
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      fetchReviewData();
      reviewMsgRef.current.value = "";
      // alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photo.length);
  };
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photo.length) % photo.length
    );
  };
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const formatTime = (timeString, timeZone) => {
    return;
  };

  const getStarClass = (rating) => {
    return tourRating >= rating ? "text-warning" : "";
  };

  return (
    <section>
      <Container>
        {loading && <h4 className="text-center pt-5">LOADING.........</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {!loading && !error && (
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <div className="image-container">
                  <img
                    src={photo[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                  />
                  <div className="button-container">
                    <button onClick={prevImage} className="icon-button">
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button onClick={nextImage} className="icon-button">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        class="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>{" "}
                      {avgRating === 0 ? null : avgRating}
                      {avgRating === 0 ? (
                        "Not rated"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span>
                      <i class="ri-map-pin-fill"></i> {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i class="ri-map-pin-2-line"></i> {city}
                    </span>
                    <span>
                      <i class="ri-money-dollar-circle-line"></i>{" "}
                      {formatCurrency(price)}.000 VND/ người
                    </span>
                    <span>
                      <i className="ri-timer-line"></i>
                      {opentime
                        ? `Open: ${formatTime(opentime.start)} - ${formatTime(
                            opentime.end
                          )}`
                        : "Open time not available"}
                    </span>
                    <span>
                      <i class="ri-group-line"></i> {maxGroupSize} người
                    </span>
                  </div>
                  <h5>Mô tả</h5>
                  <p>{desc}</p>
                </div>

                {/* ============ TOUR REVIEWS SECTION START ============ */}
                <div className="tour__reviews mt-4">
                  <h4>Đánh giá({reviews?.length} đánh giá)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span
                        onClick={() => setTourRating(1)}
                        className={getStarClass(1)}
                      >
                        1 <i className="ri-star-s-fill"></i>
                      </span>
                      <span
                        onClick={() => setTourRating(2)}
                        className={getStarClass(2)}
                      >
                        2 <i className="ri-star-s-fill"></i>
                      </span>
                      <span
                        onClick={() => setTourRating(3)}
                        className={getStarClass(3)}
                      >
                        3 <i className="ri-star-s-fill"></i>
                      </span>
                      <span
                        onClick={() => setTourRating(4)}
                        className={getStarClass(4)}
                      >
                        4 <i className="ri-star-s-fill"></i>
                      </span>
                      <span
                        onClick={() => setTourRating(5)}
                        className={getStarClass(5)}
                      >
                        5 <i className="ri-star-s-fill"></i>
                      </span>
                    </div>
                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Đánh giá của bạn"
                        required
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Gửi
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item">
                        <img src={avatar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>

                            <span className="d-flex align-items-center">
                              {review.rating}
                              <i class="ri-star-s-fill"></i>
                            </span>
                          </div>

                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>

                <div className="mt-3">
                  <iframe
                    src={srcMap}
                    width="100%"
                    height="360"
                    style={{
                      border: "1px solid #85ccdd",
                      borderRadius: "0.6rem",
                    }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                {/* ============ TOUR REVIEWS SECTION END ============== */}
              </div>
            </Col>

            <Col lg="4">
              <div className="image-carousel">
                {photo.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>

              <Booking
                tour={tour}
                avgRating={avgRating}
                start={opentime?.start}
                end={opentime?.end}
              />
            </Col>
          </Row>
        )}
      </Container>
      <Newsletter />
    </section>
  );
};

export default TourDetails;
