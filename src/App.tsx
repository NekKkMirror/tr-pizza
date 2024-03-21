import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Home } from '@/pages/Home'
import { MainLayout } from '@/layout/main.layout'

import './scss/app.scss'

export function App(): ReactElement {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
      </Route>
    </Routes>
  )
}
