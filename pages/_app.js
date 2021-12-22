import '../styles/globals.css'

import '@aws-amplify/ui-react/styles.css';

import React from 'react'
import Amplify, { AuthModeStrategyType } from 'aws-amplify'
import awsconfig from '../src/aws-exports'


Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  },
  ssr: true
}) // default theme

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
