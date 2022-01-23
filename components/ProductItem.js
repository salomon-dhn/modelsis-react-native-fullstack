import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const ProductItem = (props) => {

    const { product, displayDetailForProduct } = props;

    const _image = () => {
        if (product.type === "Smartphone") return <Image resizeMode='center' source={require('../assets/phone.png')} style={styles.imageContainer} />;
        else if (product.type == 'Laptop') return <Image resizeMode='center' source={require('../assets/laptop.png')} style={styles.imageContainer} />;
        else if (product.type == 'Télévision') return <Image resizeMode='center' source={require('../assets/tv.png')} style={styles.imageContainer} />;
        else return <Image resizeMode='center' source={require('../assets/ico-product.png')} style={styles.imageContainer} />;
    }

    return (

        <TouchableOpacity 
            style={styles.mainContainer} 
            onPress={() => displayDetailForProduct(product.id)}>

            {_image()}

            <View style={styles.box}>
                <View style={styles.header}>
                    <View style={styles.top}>
                        <Text style={styles.title}>Identifier : {product.id}</Text>
                    </View>
                    <Text style={styles.typeText}>Type : {product.type}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.descText} numberOfLines={2}>Name : {product.name}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.date}>Created Date : {product.createdDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: 150,
        flexDirection: 'row',
    },
    box: {
        height: 180,
        margin: 5,
        flex: 1,
    },
    title: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: 'black',

    },
    imageContainer:{
        height:180,
        width:120,
        margin:5
    },
    typeText: {
        fontStyle: 'italic',
        alignItems: 'flex-end',
        flex: 4,
        color: 'black',
    },
    descText: {
        textAlign: 'justify',
        flexWrap: 'wrap',
        color: 'black',
    },
    date: {
        fontStyle: 'italic',
        color: 'black',
    },
    header: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',

    },
    top: {
        flexDirection: 'row',
        flex: 6,
        justifyContent: 'flex-start',

    },
    body: {
        flex: 1,

    },
    footer: {
        flex: 1,
        alignItems: 'flex-end',
    },
});

export default ProductItem;