import React from 'react'
import { Desktop, Mobile, Tablet } from '../../HOC/Responsive'
import FooterDesktop from './FooterDesktop'
import FooterMobile from './FooterMobile'
import FooterTablet from './FooterTablet'

export default function Footer() {
  return (
    <div className='bottom-0 w-full '>
        <Desktop><FooterDesktop/></Desktop>
        <Tablet><FooterTablet/></Tablet>
        <Mobile><FooterMobile/></Mobile>
    </div>
  )
}
