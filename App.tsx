/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { ProductPage } from './src/product/presentation/ui/ProductPage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()
export const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen name="ProductPage" component={ProductPage} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  )
}
