import React from 'react'
import './newsletter.css'
import { Container, Row, Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'

const NewsLetter = () => {
   return (
      <section className='newsletter'>
         <Container>
            <Row>
               <Col lg='6'>
                  <div className="newsletter__content">
                     <h2>Đăng ký ngay để nhận được những thông tin quán ăn hữu ích</h2>

                     <div className="newsletter__input">
                        <input type="email" placeholder='Nhập gmail cuả bạn' />
                        <button className="btn newsletter__btn">Hoàn thành</button>
                     </div>
                     <p>Nếu có bất cứ thắc mắc gì hãy để lại thông tin cho chúng tôi
                     </p>
                  </div>
               </Col>
               <Col lg='6'>
                  <div className="newsletter__img">
                     <img src={maleTourist} alt="" />
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default NewsLetter