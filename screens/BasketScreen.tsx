// BasketScreen.tsx

import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectBasketItems,selectBasketTotal, removeFromBasket, updateQuantity } from '../store/reducers/basket';
import { BasketItem as BasketItemType } from '../types';
import BasketItem from '../components/BasketItem';

const BasketScreen = () => {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(selectBasketItems);
  const basketTotal = useAppSelector(selectBasketTotal);

  const renderItem = ({ item }: { item: BasketItemType }) => {
    const onRemove = () => dispatch(removeFromBasket(item.id));
    const onIncrease = () => dispatch(updateQuantity({ id: item.id, qty: item.qty + 1 }));
    const onDecrease = () => dispatch(updateQuantity({ id: item.id, qty: item.qty - 1 }));
  
    return <BasketItem item={item} onRemove={onRemove} onIncrease={onIncrease} onDecrease={onDecrease} />;
  };

  return (
    <View>
      <FlatList
        data={basketItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={
            <View style={styles.itemContainer}>           
              <Text style={styles.price}>{`Total: £${(basketTotal).toFixed(2)}`}</Text>
            </View>
          }        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productName: {
    flex: 1,
    fontSize: 16,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BasketScreen;
