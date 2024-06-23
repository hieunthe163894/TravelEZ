import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Dự báo thời tiết`,
      desc: `Thông tin về thời tiết trong thời gian đặt bàn.`,
   },
   {
      imgUrl: guideImg,
      title: `Hưỡng dẫn đặt bàn chi tiết`,
      desc: `Đem lại trải nghiệm tốt nhất cho người dùng.`,
   },
   {
      imgUrl: customizationImg,
      title: 'Tùy chỉnh',
      desc: `Tùy chỉnh ứng dụng theo cách của bạn.`,
   },
]

const ServiceList = () => {
   return <>
      {
         servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>))
      }
   </>

}

export default ServiceList