import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

const quick__links = [
   {
      path: '/home',
      display: 'Trang chủ'
   },
   {
      path: '/about',
      display: 'Về chúng tôi'
   },
   {
      path: '/tours',
      display: 'Nhà hàng'
   },
]

// const quick__links2 = [
//    {
//       path: '/gallery',
//       display: 'Gallery'
//    },
//    {
//       path: '/login',
//       display: 'Login'
//    },
//    {
//       path: '/register',
//       display: 'Register'
//    },
// ]

const Footer = () => {
   const year = new Date().getFullYear()

   return (
      <footer className='footer'>
         <Container>
            <Row>
               <Col lg='3'>
                  <div className="logo">
                     <img src={logo} alt="" />
                     <p style={{fontSize: "14px"}}>
                     TravelEZ là Mạng lưới nhà hàng uy tín và chất lượng. Giúp thực khách đặt bàn dễ dàng, được tặng kèm ưu đãi mà không cần mua Deal, Voucher. Giải pháp đột phá mới cho câu chuyện ăn gì, ở đâu!</p>
                   
                  </div>
               </Col>

               <Col lg='2'>
                  <h5 className="footer__link-title">Khám phá</h5>

                  <ListGroup className='footer__quick-links'>
                     {
                        quick__links.map((item, index) => (
                           <ListGroupItem key={index} className='ps-0 border-0'>
                              <Link to={item.path}>{item.display}</Link>
                           </ListGroupItem>
                        ))
                     }
                  </ListGroup>
               </Col>
               {/* <Col lg='3'>
                  <h5 className="footer__link-title">Quick Links</h5>

                  <ListGroup className='footer__quick-links'>
                     {
                        quick__links2.map((item, index) => (
                           <ListGroupItem key={index} className='ps-0 border-0'>
                              <Link to={item.path}>{item.display}</Link>
                           </ListGroupItem>
                        ))
                     }
                  </ListGroup>
               </Col> */}
               <Col lg='5'>
                  <h5 className="footer__link-title">Liên hệ</h5>

                  <ListGroup className='footer__quick-links'>
                     <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                        <h6 className='mb-0 d-flex align-items-center gap-2'>
                           <span><i class='ri-map-pin-line'></i></span>
                           Địa chỉ:
                        </h6>
                        <p  className='mb-0'>Đại học FPT, Thạch Hoà, Thạch Thất, Hà Nội, Vietnam</p>
                     </ListGroupItem>

                     <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                        <h6 className='mb-0 d-flex align-items-center gap-2'>
                           <span><i class='ri-mail-line'></i></span>
                           Email:
                        </h6>

                        <p className='mb-0'>TravelEZ@gmail.com</p>
                     </ListGroupItem>

                     <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                        <h6 className='mb-0 d-flex align-items-center gap-2'>
                           <span><i class='ri-phone-fill'></i></span>
                           Điện thoại:
                        </h6>

                        <p className='mb-0'>035 595 0292</p>
                     </ListGroupItem>
                  </ListGroup>
               </Col>
                <Col lg='2'>
                <h5 className="footer__link-title">Tham gia qua</h5>
                <div className="social__link d-flex align-items-center gap-4">
                        <span>
                           <Link to='/'>
                              <i class='ri-youtube-line'></i>
                           </Link>
                        </span>
                        {/* <span>
                           <Link to='#'>
                              <i class='ri-github-fill'></i>
                           </Link>
                        </span> */}
                        <span>
                           {/* <Link to=''> */}
                             <a target='_blank' href="https://www.facebook.com/travelez.fpt"> <i class='ri-facebook-circle-line'></i></a>
                           {/* </Link> */}
                        </span>
                        <span>
                           <Link to='/'>
                              <i class='ri-instagram-line' ></i>
                           </Link>
                        </span>
                     </div>
               </Col>
            </Row>
         </Container>
      </footer>
   )
}

export default Footer