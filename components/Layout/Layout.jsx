import Navbar from './navbar'
import React from 'react'
import PropTypes from 'prop-types'

export default function Layout ({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}