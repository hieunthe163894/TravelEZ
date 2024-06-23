import React from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from '../shared/CommonSection';
import guideToBooking from '../assets/images/huongdan.png';
import '../styles/about.css';

const About = () => {
  return (
    <>
    <CommonSection title={"Thông tin về TravelEZ"} />
    <Container>
    <div className="about-content">
      <Row className="my-5">
        <Col lg="12">
          <h1 className="text-center" >Về TravelEZ</h1>
          <p>
            TravelEZ là một dự án được xây dựng bắt nguồn từ bộ môn khởi nghiệp (EXE101) tại trường Đại Học FPT. Và được thiết kế để cung cấp trải nghiệm đặt bàn trực tuyến tốt nhất cho người dùng. Chúng tôi hợp tác với các nhà hàng hàng đầu để đảm bảo bạn luôn có được chỗ ngồi tốt nhất cùng với trải nghiệm ẩm thực đáng nhớ.
          </p>
        </Col>
      </Row>
      <Row  >
        <Col lg="12">
          <h3 style={{marginTop: '20px'}}>Mục tiêu của chúng tôi</h3>
          <p>
            Mục tiêu của TravelEZ là làm cho việc đặt bàn trở nên dễ dàng và tiện lợi hơn bao giờ hết. Chúng tôi muốn tạo ra một nền tảng mà tại đó, mỗi khách hàng có thể dễ dàng tìm thấy và đặt bàn tại nhà hàng yêu thích của mình mà không gặp bất kỳ rắc rối nào.
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <h3 style={{marginTop: '20px'}}>Đội ngũ của chúng tôi</h3>
          <p>
            Đội ngũ phát triển TravelEZ bao gồm các chuyên gia về công nghệ thông tin và kinh doanh đều có niềm đam mê về ẩm thực và du lịch, luôn sẵn sàng đón nhận phản hồi và cải thiện dịch vụ để mang lại trải nghiệm tốt nhất cho người dùng.
          </p>
        </Col>
      </Row>  
      <Row>
        <Col lg="12">
          <h3 style={{marginTop: '20px'}}>Thông tin liên hệ đến chúng tôi</h3>
          <p>Bộ phận Chăm Sóc Khách Hàng </p>
          <p><b>Email: </b>TravelEZ@gmail.com</p> 
          <p><b>Điện thoại: </b>035 595 0292</p>
          <p><b>Fanpage Facebook: </b> <a href="https://www.facebook.com/travelez.fpt">https://www.facebook.com/travelez.fpt</a></p>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <h3 style={{marginTop: '20px'}}>Các bước đặt bàn qua TravelEZ</h3>
          <img src={guideToBooking}></img>
        </Col>
      </Row>
      {/* <Row>
        <Col lg="12">
          <h3 style={{marginTop: '20px'}}>Hỗ trợ TravelEZ</h3>
          <p>Nếu bạn cảm thấy thấy TravelEZ hữu ích hãy giúp chúng tôi để có thể phát triển và đem lại nhiều ưu đãi khi đặt bàn cùng với đó là những tính năng, hỗ trợ giúp người dùng có những trải nghiệm tốt nhất.</p>
          <br></br>
          <p><b>Ngân hàng: </b>Vietinbank</p>
          <p><b>Số tài khoản: </b>101871395719</p>
          <p><b>Tên: </b> Nguyễn Minh Quang</p>
          <br></br>
          <p><b>Hoặc quét mã QR sau: </b></p>
          <img src="https://cdn.tgdd.vn/hoi-dap/1309185/ma-qr-code-la-gi-dung-de-lam-gi-cach-tao-ma-qr-nhanh-chong%20(1).jpg"></img>
        </Col>
      </Row> */}
      </div>
    </Container>
    </>
  );
};

export default About;