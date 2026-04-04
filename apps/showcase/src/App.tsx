import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@mui-native';
import { LayoutPreferenceProvider } from './context/LayoutPreferenceContext';
import HomeScreen from './screens/HomeScreen';
import CategoryListScreen from './screens/CategoryListScreen';
import ComponentDetailScreen from './screens/ComponentDetailScreen';
import type { RootStackParamList } from './catalogue/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <LayoutPreferenceProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'MUI Native' }}
            />
            <Stack.Screen
              name="CategoryList"
              component={CategoryListScreen}
              options={({ route }) => ({ title: route.params.categoryId })}
            />
            <Stack.Screen
              name="ComponentDetail"
              component={ComponentDetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LayoutPreferenceProvider>
    </ThemeProvider>
  );
}
