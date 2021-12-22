import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Auth, withSSRContext } from 'aws-amplify'
import Router, { withRouter } from 'next/router'

export async function getServerSideProps ({ req }) {
  const SSR = withSSRContext({ req })
  const { user } = SSR.Auth
  console.log('User', user)

  return ({
    props: {}
  })
}

const SignIn = function SignIn () {
  const [ user, setUser ] = useState()
  const [ _isAdmin, setIsAdmin ] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        // eslint-disable-next-line no-shadow
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
        setIsAdmin(!!(user.signInUserSession.accessToken.payload[ 'cognito:groups' ]?.includes('Admin')))
      } catch (err) {
        console.error(err)
      }
    }
    getUser()
  }, [])

  return (
    <div>
      <h1>Hello!</h1>
      {user && <button type="button" onClick={
        async () => {
          await Auth.signOut()
          setUser(null)
          setIsAdmin(null)
          Router.push('/')
        }
      }>Sign Out</button>}
      {user && <div><h1 className="text-3xl font-semibold tracking-wide mt-6">Profile</h1>
        <h3 className="font-medium text-gray-500 my-2">Username: {user.username}</h3>
        <p className="text-sm text-gray-500 mb-6">Email: {user.attributes.email}</p>
      </div>}
      <Link href='/'>Home</Link>
    </div>
  )
}

export default withRouter(withAuthenticator(SignIn))