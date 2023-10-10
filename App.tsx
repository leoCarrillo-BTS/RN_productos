import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import 'react-native-gesture-handler';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/PoductsContext';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  return (
    <AuthProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </AuthProvider>
  )
}

export const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App