import React from 'react'
import SessionsHero from '../components/Sessions/SessionsHero'
import SessionsContainer from '../components/Sessions/SessionsContainer'
import SessionActions from '../components/Sessions/SessionActions'

const Sessions = () => {
  return (
    <div>
      <SessionsHero />
      <SessionActions />
      <SessionsContainer />
    </div>
  )
}

export default Sessions
