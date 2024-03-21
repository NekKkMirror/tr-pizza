import { Header } from '@CMP'
import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC = (): ReactNode => (
  <div className='wrapper'>
    <Header />
    <div className='content'>
      <Outlet />
    </div>
  </div>
)
