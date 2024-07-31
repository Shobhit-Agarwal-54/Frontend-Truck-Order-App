import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from './context/authContext'
import ScreenMenu from './components/Menus/ScreenMenu'
import { OrderProvider } from './context/orderContext'

const RootNavigation = () => {
  return (
    <AuthProvider>
      <OrderProvider>
      <ScreenMenu/>
      </OrderProvider>
    </AuthProvider>
  )
}

export default RootNavigation