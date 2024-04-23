import { HomePage } from '@/pages'
import { MainLayout } from '@/layout/main.layout'
import {
  type FC,
  lazy,
  type LazyExoticComponent,
  type ReactElement,
  Suspense,
} from 'react'
import { Routes, Route } from 'react-router-dom'

import './scss/app.scss'

const CartPage: LazyExoticComponent<FC> = lazy(
  () => import('./pages/Cart.page'),
)
const FullPizzaPage: LazyExoticComponent<FC> = lazy(
  () => import('./pages/FullPizza.page'),
)
const NotFoundPage: LazyExoticComponent<FC> = lazy(
  () => import('./pages/NotFound.page'),
)

export function App(): ReactElement {
  return (
    <Routes>
      <Route element={<MainLayout />} path='/'>
        <Route element={<HomePage />} path='' />

        <Route
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <CartPage />
            </Suspense>
          }
          path='cart'
        />

        <Route
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <FullPizzaPage />
            </Suspense>
          }
          path='pizza/:id'
        />
      </Route>

      <Route
        element={
          <Suspense fallback={<div>Идёт загрузка...</div>}>
            <NotFoundPage />
          </Suspense>
        }
        path='*'
      ></Route>
    </Routes>
  )
}
