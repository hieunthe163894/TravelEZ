import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          Trang web đặt bàn này thực sự là một cứu cánh cho cuộc sống bận rộn
          của tôi. Tôi đã dùng nó để đặt bàn cho bữa tối gia đình và không thể
          tin được đơn giản và hiệu quả như vậy. Chỉ cần vài phút để chọn nhà
          hàng yêu thích
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Quang Hùng</h6>
            <p>Khách hàng</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Tôi đã thử nhiều trang web đặt bàn nhưng chỉ có trang này thực sự gây
          ấn tượng với tôi. Các tùy chọn đặt bàn linh hoạt, thời gian, cho đến
          yêu cầu đặc biệt, đều được giải quyết một cách dễ dàng. Tôi đã trải
          nghiệm dịch vụ nhanh chóng và chuyên nghiệp.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Hải Anh</h6>
            <p>Khách hàng</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Trang web đặt bàn này mang lại sự tiện lợi và tin cậy. Tôi đã dùng nó
          cho nhóm bạn vào một cuối tuần và trải nghiệm vô cùng suôn sẻ. Tính
          năng đặt bàn nhanh chóng và thông tin chi tiết về từng nhà hàng giúp
          chúng tôi có quyết định đúng đắn.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Hương Giang</h6>
            <p>Khách hàng</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Đã dùng dịch vụ đặt bàn này và thấy rất hài lòng. Nhân viên phục vụ
          nhanh nhẹn và chu đáo, giúp mình có một bữa tối thật đáng nhớ. Tôi
          thực sự ấn tượng với cách thức đặt bàn trực tuyến của trang web này.
          Không chỉ dễ dàng mà còn đảm bảo được chỗ ngồi theo ý muốn.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-dep-nu-001.jpg" className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Hà Linh</h6>
            <p>Khách hàng</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
