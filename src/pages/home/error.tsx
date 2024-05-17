import React, { type JSX } from 'react'
import RefreshSVG from '../../assets/svgs/refresh.svg'

const ErrorPage: React.FC = (): JSX.Element => {
  return (
    <div className='error'>
      <p>
        Error loading books.
        <br /> Try refreshing the page. The Postgres DB on Vercel stops after 5
        minutes of inactivity.
      </p>
      <img
        width='40px'
        height='40px'
        src={RefreshSVG}
        onClick={() => {
          window.location.reload()
        }}
      />
    </div>
  )
}
export default ErrorPage
