import { HeaderComponent } from '@CMP'
import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC = (): ReactNode => (
  <div className='wrapper'>
    <HeaderComponent />
    <div className='content'>
      <Outlet />
    </div>
  </div>
)
