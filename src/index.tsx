import { store } from '@RX'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { App } from './App'

const rootElement: HTMLElement | null = document.getElementById('root')

if (rootElement) {
  const root: ReactDOM.Root = ReactDOM.createRoot(rootElement)

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  )
}
