// BasketItem.tsx

import React from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BasketItem as BasketItemType } from '../types';

type BasketItemProps = {
  item: BasketItemType;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

const BasketItem: React.FC<BasketItemProps> = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (   
    <View style={styles.itemContainer}>
    <Image source={{ uri: item.img }} style={styles.productImage} resizeMode='contain'/>
    <Text style={styles.productName}>{item.name}</Text>
    <View style={styles.qtyContainer}>
      <Button title="-" onPress={onDecrease}  disabled={item.qty <= 1} />
      <Text>{`${item.qty}`}</Text>
      <Button title="+" onPress={onIncrease}   />        
    </View>
    <Ionicons
      testID={"Remove"}
      name="trash"
      size={24}
      color="red"
      onPress={onRemove}
    />
    <Text style={styles.price}>{`£${(item.price * item.qty).toFixed(2)}`}</Text>
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

export default BasketItem;
