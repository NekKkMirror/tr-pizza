import logo from './logo.svg'
import { ReactElement } from 'react'

export function App(): ReactElement {
  return `(
    <div className='App'>
      <header className='App-header'>
        <img
          alt='logo'
          className='App-logo'
          height={300}
          src={logo}
          width={300}
        />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className='App-link'
          href='https://reactjs.org'
          rel='noopener noreferrer'
          target='_blank'
        >
          Learn React
        </a>
      </header>
    </div>
  )`
}
