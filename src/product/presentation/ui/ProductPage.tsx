import React from 'react'
import { useProduct } from '../useProduct'
import { ProductItem } from './ProductItem'
import { Product } from '../../domain/product.interface'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useCart, useCartGet } from '../../../cart/presentation/useCart'
import { rupiahFormatter } from '../../../common/currency'

export const ProductPage = () => {

  const navigation = useNavigation()
  
  const { data } = useProduct()

  const { totalItems, totalPrice } = useCartGet()
  const { isItemExists } = useCart()

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ 
            ...styles.cartWrapper,
            width: totalItems > 0 ? 150 : 55
          }}>
            <Text>Cart</Text>
            <Text style={styles.cartText}>{totalItems}</Text>
            {totalPrice > 0 && <Text>  - {rupiahFormatter(totalPrice)}</Text>}
          </View>
        )
      }
    })
  }, [navigation, totalItems])
  
  const renderItem = ({ item }: { item: Product }) => {
    return (
      <ProductItem
        key={item.id}
        id={item.id}
        price={item.price}
        title={item.title}
        isExists={isItemExists(item.id)}
      />
    )
  }

  const keyExtractor = (item: Product) => item.id.toString()

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartWrapper: { 
    marginRight: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-around' 
  },
  cartText: {
    color: 'white', 
    backgroundColor: 'red', 
    borderRadius: 20, 
    paddingHorizontal: 5, 
    marginLeft: 5
  }
});