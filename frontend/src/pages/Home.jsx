import React from "react";
import "../styles/home.css";
import { Container, Row, Col, CardSubtitle } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";

import Subtitle from "./../shared/subtitle";
import SearchBar from "./../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import NewsLetter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <div style={{ marginLeft: "75px", marginRight: "75px" }}>
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <div className="hero__content">
                  <div className="hero__subtitle d-flex align-items-center">
                    <Subtitle subtitle={"Biết trước khi bạn đặt bàn"} />
                    <img src={worldImg} alt="" />
                  </div>
                  <h2>
                    Thưởng thức hương vị tinh tế và không gian sang trọng tại
                    các nhà hàng hàng đầu Nhà hàng hàng đầu
                  </h2>
                  <p>
                    Bắt tay vào hành trình ẩm thực của bạn với chúng tôi! Tại
                    đây, bạn sẽ khám phá những hương vị mới và độc đáo, cùng với
                    bầu không khí thoải mái và dịch vụ chuyên nghiệp. Hãy đặt
                    bàn ngay hôm nay và chuẩn bị cho trải nghiệm ẩm thực đặc
                    biệt cùng bạn bè và gia đình.
                  </p>
                </div>
              </Col>

              <Col lg="2">
                <div className="hero__img-box">
                  <img src={heroImg} alt="" />
                </div>
              </Col>
              <Col lg="2">
                <div className="hero__img-box hero__video-box mt-4">
                  <video src={heroVideo} alt="" controls />
                </div>
              </Col>
              <Col lg="2">
                <div className="hero__img-box mt-5">
                  <img src={heroImg02} alt="" />
                </div>
              </Col>

              <SearchBar />
            </Row>
          </Container>
        </section>
        {/* ============================================================== */}

        {/* ==================== HERO SECTION START ====================== */}
        <section>
          <Container>
            <Row>
              <Col lg="3">
                <h5 className="services__subtitle">
                  Những gì chúng tôi phục vụ
                </h5>
                <h2 className="services__title">
                  Chúng tôi cung cấp dịch vụ tốt nhất của chúng tôi
                </h2>
              </Col>
              <ServiceList />
            </Row>
          </Container>
        </section>

        {/* ========== FEATURED TOUR SECTION START ========== */}
        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5">
                <Subtitle subtitle={"Explore"} />
                <h2 className="featured__tour-title">Nhà hàng nổi bật</h2>
              </Col>
              <FeaturedTourList />
            </Row>
          </Container>
        </section>
        {/* ========== FEATURED TOUR SECTION END =========== */}

        {/* ========== EXPERIENCE SECTION START ============ */}
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <div className="experience__content">
                  <Subtitle subtitle={"Kinh nghiệm"} />
                  <h2>
                    Với tất cả kinh nghiệm của chúng tôi <br /> Chúng tôi sẽ
                    phục vụ bạn
                  </h2>
                  <p>
                    Trang web đặt bàn của chúng tôi là địa chỉ tin cậy để bạn
                    đặt chỗ tại nhà hàng một cách thuận tiện và nhanh chóng, đảm
                    bảo dịch vụ chất lượng.
                  </p>
                </div>

                <div className="counter__wrapper d-flex align-items-center gap-5">
                  <div className="counter__box">
                    <span>12k+</span>
                    <h6>Đặt bàn thành công</h6>
                  </div>
                  <div className="counter__box">
                    <span>2k+</span>
                    <h6>Khách hàng thường xuyên</h6>
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="experience__img">
                  <img src={experienceImg} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* ========== EXPERIENCE SECTION END ============== */}

        {/* ========== GALLERY SECTION START ============== */}
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <Subtitle subtitle={"Phòng trưng bày"} />
                <h2 className="gallery__title">
                  Ghé thăm đánh giá của khách hàng của chúng tôi
                </h2>
              </Col>
              <Col lg="12">
                <MasonryImagesGallery />
              </Col>
            </Row>
          </Container>
        </section>
        {/* ========== GALLERY SECTION END ================ */}

        {/* ========== TESTIMONIAL SECTION START ================ */}
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <Subtitle subtitle={"Người hâm mộ yêu thích"} />
                <h2 className="testimonial__title">
                  Người hâm mộ nói gì về chúng tôi
                </h2>
              </Col>
              <Col lg="12">
                <Testimonials />
              </Col>
            </Row>
          </Container>
        </section>
        {/* ========== TESTIMONIAL SECTION END ================== */}
        <NewsLetter />
      </div>
    </>
  );
};

export default Home;
