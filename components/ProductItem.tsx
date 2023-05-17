import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { Product } from '../types';

interface Props {
    product: Product;
    onAddToBasket: () => void;
  }
  
  const ProductItem: React.FC<Props> = ({ product, onAddToBasket }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: product.img }} style={styles.productImage} resizeMode='contain'/>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={[styles.colorSwatch, {backgroundColor:product.colour.toLowerCase()}]}/>
      <Text>{`£${product.price.toFixed(2)}`}</Text>
      <Button title="Add to Basket" onPress={onAddToBasket} />
    </View>
  );
  
  // styles ...
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    itemContainer: {
      flex: 1,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'space-between',         
      backgroundColor:'white',
      overflow:'hidden',
    },
    productName: {
      fontSize:12
    }, 
    colorSwatch: {
      width: 20,
      height: 20,
      margin: 5,
    },
    productImage: {
      backgroundColor:'#E8E7E3',
      width: 200,
      height: 200,
    },
  });
  
  export default ProductItem;
  