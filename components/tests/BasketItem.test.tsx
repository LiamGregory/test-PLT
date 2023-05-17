import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import BasketItem from '../BasketItem';
import { BasketItem as BasketItemType } from '../..types';

const mockBasketItem: BasketItemType = {
  id: 1,
  colour: 'Blue',
  name: 'Test Product',
  price: 10.00,
  img: 'https://via.placeholder.com/150',
  qty: 1,
};

describe('BasketItem', () => {
  it('renders correctly', () => {
    const { getByText } = render(<BasketItem item={mockBasketItem} onIncrease={() => {}} onDecrease={() => {}} onRemove={() => {}} />);

    expect(getByText(mockBasketItem.name)).toBeTruthy();
    expect(getByText(`£${mockBasketItem.price.toFixed(2)}`)).toBeTruthy();
    expect(getByText(`${mockBasketItem.qty}`)).toBeTruthy();
  });

  it('calls onIncrease prop when the Increase Qty button is pressed', () => {
    const handleIncreaseQty = jest.fn();

    const { getByText } = render(<BasketItem item={mockBasketItem} onIncrease={handleIncreaseQty} onDecrease={() => {}} onRemove={() => {}} />);

    const button = getByText('+');
    fireEvent.press(button);

    expect(handleIncreaseQty).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrease prop when the Decrease Qty button is pressed', () => {
    const handleDecreaseQty = jest.fn();
    const itemWithMoreQty = {...mockBasketItem, qty: 2};

    const { getByText } = render(<BasketItem item={itemWithMoreQty} onIncrease={() => {}} onDecrease={handleDecreaseQty} onRemove={() => {}} />);

    const button = getByText('-');
    fireEvent.press(button);

    expect(handleDecreaseQty).toHaveBeenCalledTimes(1);
  });

  it('does not call onDecrease prop when the "Decrease Qty" button is disabled', () => {
    const handleDecreaseQty = jest.fn();
  
    const { getByText } = render(<BasketItem item={mockBasketItem} onIncrease={() => {}} onDecrease={handleDecreaseQty} onRemove={() => {}} />);
  
    const button = getByText('-');
    fireEvent.press(button);
  
    expect(handleDecreaseQty).not.toHaveBeenCalled();
  });


  it('calls onRemove prop when the Remove button is pressed', () => {
    const handleRemove = jest.fn();

    const { getByTestId } = render(<BasketItem item={mockBasketItem} onIncrease={() => {}} onDecronDecreaseeaseQty={() => {}} onRemove={handleRemove} />);
    
    const button = getByTestId('Remove');
    fireEvent.press(button);

    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
