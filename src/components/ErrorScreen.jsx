import React from 'react'
import { ErrorStyled } from './styled/ErrorScreen.styled'
import notfound from '../media/img/notfound.png'
import { Link } from 'react-router-dom'

export default function ErrorScreen({style, p1, p2, p3, linkOrA, url}) {
  return (
    <ErrorStyled>
        <div className="error-container" style={{ display: `${style}`, backgroundColor: '#1c1c1e' }}>
            <div className="error">
                <h1>Error has occured.</h1>
                <p>{p1}</p>
                <p>{p2}</p>
                <p>{p3}</p>
                <img src={notfound} width='300' alt="not found" />
                <br />
                {linkOrA === 'link' ? 
                  <Link to={`${url}`} className='link'>Go home</Link>
                  : <a className='link' href={`${url}`}>Try again</a>
                }
            </div>
        </div>
    </ErrorStyled>
  )
}
