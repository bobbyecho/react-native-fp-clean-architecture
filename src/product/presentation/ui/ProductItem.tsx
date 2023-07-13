import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useCart, useCartGet } from '../../../cart/presentation/useCart'
import { rupiahFormatter } from '../../../common/currency'

type ProductItemProps = {
  id: number
  price: string
  title: string
  isExists: boolean
}

export const ProductItem = React.memo((props: ProductItemProps) => {
  
  console.log("render", props.id)

  const { addTocart, deleteFromCart } = useCart()
  
  const addItem = () => {
    addTocart({
      amount: 1,
      ...props
    })
  }

  const deleteItem = () => {
    deleteFromCart(props.id)
  } 
  
  return (
    <View style={styles.item}>
      <View style={styles.innerColumn}>
        <View style={styles.detailProductColumn}>
          <Text style={styles.title}>{props.title}</Text>
          <Text>{rupiahFormatter(props.price)}</Text>
        </View>
        {!props.isExists && (
          <Pressable style={styles.addCart} onPress={addItem}>
            <Text style={styles.textAddToCart}>add to cart</Text>
          </Pressable>
        )}
        {props.isExists && (
          <Pressable style={styles.addCart} onPress={deleteItem}>
            <Text style={styles.textDeleteFromCart}>delete form cart</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#eeeeee',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginBottom: 5    
  },
  innerColumn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  detailProductColumn: {
    flex: 1,
    paddingRight: 20
  },
  addCart: {
    alignItems: "center",
    justifyContent: "center"
  },
  textAddToCart: {
    backgroundColor: "#78a1a7",
    padding: 8,
    borderRadius: 5,
    color: "white"
  },
  textDeleteFromCart: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    color: "white"
  }
})