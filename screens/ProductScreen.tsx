
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api';
import { Product } from '../types';
import { useAppDispatch } from '../hooks';
import { addToBasket } from '../store/reducers/basket';
import ProductItem from '../components/ProductItem';

function ProductScreen() {
  const dispatch = useAppDispatch();
  const { data: products, isLoading } = useQuery<Product[], Error>(['products'], fetchProducts);
  
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  

  
const renderItem = ({ item }: { item: Product }) => {
    const onAddToBasket = () => {
        dispatch(addToBasket({ ...item, qty: 1 }));
    };

    return <ProductItem product={item} onAddToBasket={onAddToBasket} />;
  };
  
  return (
    <View style={styles.container}>
      <FlatList 
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    }   
  });
  
  export default ProductScreen;
