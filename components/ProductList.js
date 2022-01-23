import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';


const ProductList = (props) => {

    console.log(props.navigation.navigate);

    _displayDetailForProduct = (idProduct) => {
        props.navigation.navigate("ProductDetails", { idProduct: idProduct });
    }

    return (

        <FlatList
            data={props.products}
            keyExtractor={(item) => item.id.toString()}
            style={styles.flat}
            renderItem={({ item }) =>
                <ProductItem
                    product={item}
                    displayDetailForProduct={_displayDetailForProduct}
                />}

        />

    );
}
const styles = StyleSheet.create({
    flat: {
        marginTop: 5
    }
})


export default ProductList;
