import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductScreen from './screens/ProductScreen';
import BasketScreen from './screens/BasketScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { useAppSelector } from './hooks';
import { selectTotalQuantity } from './store/reducers/basket';

type RootStackParamList = {
  ProductScreen: undefined;
  BasketScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();


const BasketButton: React.FC<{ navigation: any }> = ({ navigation }) => {
  const totalQuantity = useAppSelector(selectTotalQuantity);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('BasketScreen')}>
      <>      
      <Ionicons
        name="basket"
        size={24}
        color="black"
        style={{ marginRight: 10 }}
        
      />
      {totalQuantity > 0 && (
        <View style={{ 
          position: 'absolute', 
          right: 0, 
          top: 0, 
          backgroundColor: 'red', 
          borderRadius: 10, 
          width: 20, 
          height: 20, 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <Text style={{ color: 'white', fontSize: 12 }}>{totalQuantity}</Text>
        </View>
      )}
      </>
    </TouchableOpacity>
  );
};


const App: React.FC = () => {
  
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={({ navigation }) => ({
              title: 'Products',
              headerRight: () => <BasketButton navigation={navigation} />,
            })}
          />
          <Stack.Screen name="BasketScreen" component={BasketScreen} options={{title: 'Basket'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
    </Provider>
  );
};

export default App;
