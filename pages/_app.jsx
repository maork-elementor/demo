import Layout from '../components/Layout/Layout'
import './globals.scss'
import React from 'react'
import PropTypes from 'prop-types';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};



