import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DeletionScreen from '../screens/DeletionScreen';

const Stack = createStackNavigator();

interface AppNavigatorProps {
  onLogout: () => void;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ onLogout }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: {
            backgroundColor: '#0a0a0a',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ title: 'Redact Clone' }}
        >
          {(props) => <HomeScreen {...props} onLogout={onLogout} />}
        </Stack.Screen>
        <Stack.Screen
          name="Deletion"
          component={DeletionScreen}
          options={{ title: 'Suppression' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
