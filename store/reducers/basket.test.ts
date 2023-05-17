import basketReducer, { addToBasket, removeFromBasket, updateQuantity } from '../reducers/basket';
import { selectBasketItems, selectBasketTotal, selectTotalQuantity } from '../reducers/basket';
import { BasketItem } from '../../types'

const mockBasketItem1: BasketItem   = {
    id: 1,
    colour: 'Black',
    name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
    price: 10,
    img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
    qty: 1,
}

const mockBasketItem2 : BasketItem  = {
    id: 2,
    colour: 'Black',
    name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
    price: 20,
    img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
    qty: 2,
}

describe('basket reducer', () => {
  it('should handle initial state', () => {
    expect(basketReducer(undefined, { type: 'unknown' })).toEqual({ items: [] });
  });

  it('should handle addToBasket', () => {
    const initialState = { items: [] };
    const expectedState = { items: [mockBasketItem1] };
    expect(basketReducer(initialState, addToBasket(mockBasketItem1))).toEqual(expectedState);
  });

  it('should handle removeFromBasket', () => {
    const initialState = { items: [mockBasketItem1] };
    const expectedState = { items: [] };
    expect(basketReducer(initialState, removeFromBasket(mockBasketItem1.id))).toEqual(expectedState);
  });

  it('should handle updateQuantity', () => {
    const initialState = { items: [mockBasketItem1] };
    const updatedItem = { ...mockBasketItem1, qty: 2 };
    const expectedState = { items: [updatedItem] };
    expect(basketReducer(initialState, updateQuantity({ id: mockBasketItem1.id, qty: 2 }))).toEqual(expectedState);
  });
});

describe('basket selectors', () => {
  const state = { basket: { items: [mockBasketItem1, mockBasketItem2] } };

  it('selectBasketItems should return all items', () => {
    expect(selectBasketItems(state)).toEqual([mockBasketItem1, mockBasketItem2]);
  });

  it('selectBasketTotal should return the total cost', () => {
    expect(selectBasketTotal(state)).toEqual(50);
  });

  it('selectTotalQuantity should return the total quantity', () => {
    expect(selectTotalQuantity(state)).toEqual(3);
  });
});
