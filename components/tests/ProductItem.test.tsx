import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import  ProductItem  from '../ProductItem';
import { Product } from '../../types';

const mockProduct: Product = {
  id: 1,
  colour: 'Black',
  name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
  price: 10,
  img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
};

describe('ProductItem', () => {
  it('renders correctly', () => {
    const { getByText } = render(<ProductItem product={mockProduct} onAddToBasket={() => {}} />);
    expect(getByText(mockProduct.name)).toBeDefined();
    expect(getByText(`£${mockProduct.price.toFixed(2)}`)).toBeDefined();
  });
  
  it('calls handleAddToBasket prop when the button is pressed', () => {
    const handleAddToBasket = jest.fn();
    
    const { getByText } = render(<ProductItem product={mockProduct} onAddToBasket={handleAddToBasket} />);
    
    const button = getByText('Add to Basket');
    fireEvent.press(button);
    
    expect(handleAddToBasket).toHaveBeenCalledTimes(1);
  });
  
 

  
});
