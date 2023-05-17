import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import  ProductScreen  from '../ProductScreen';
import { fetchProducts } from '../../api';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Product } from '../../types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

const mockProduct: Product = {
    id: 1,
    colour: 'Black',
    name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
    price: 10,
    img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
  };

const mockProducts: Product[] = [
    {
      id: 1,
      colour: 'Black',
      name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
      price: 10,
      img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
    },
    {
      id: 2,
      colour: 'Stone',
      name: 'Stone Ribbed Strappy Cut Out Detail Bodycon Dress',
      price: 4,
      img: 'https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024',
    },
    {
      id: 3,
      colour: 'Black',
      name: 'Black Frill Tie Shoulder Bodycon Dress',
      price: 7.99,
      img: 'https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024',
    },
    {
      id: 5,
      colour: 'Red',
      name: 'Red Pin Stripe Belt T Shirt Dress',
      price: 17,
      img: 'https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024',
    },
  ];


jest.mock('../../api', () => ({
  fetchProducts: jest.fn(),
}));

describe('<ProductScreen />', () => {
  
    it('renders without crashing', () => {
        const screen = render(
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <ProductScreen />
            </Provider>
          </QueryClientProvider>
        );

    expect(screen).toBeTruthy();
  });

  it('renders the list of products', async () => {
    // Mock the API response
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

    // Render the component
    const { findByText } = render(<QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ProductScreen />
        </Provider>
      </QueryClientProvider>);

    // Check that the product name is displayed
    const productName = await findByText(mockProduct.name);
    expect(productName).toBeTruthy();
  });

  it('calls addToBasket when the "Add to Basket" button is pressed', async () => {
    // Mock the API response
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  
    // Render the component
    const { getAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ProductScreen />
        </Provider>
      </QueryClientProvider>
    );
  
    // Press the "Add to Basket" button
    const buttons = getAllByText('Add to Basket');
    fireEvent.press(buttons[0]);
  
    // Check that the basket now contains the product
    const state = store.getState();
    expect(state.basket.items).toContainEqual({...mockProducts[0], qty: 1});
  });
});
