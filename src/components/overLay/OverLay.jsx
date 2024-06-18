"use client"
import React from 'react'

const OverLay = ({handleMenuOpen}) => {
  return (
    <div onClick={handleMenuOpen} className=' overLay smT0:!block !hidden !top-[60px]'>OverLay</div>
  )
}

export default OverLay