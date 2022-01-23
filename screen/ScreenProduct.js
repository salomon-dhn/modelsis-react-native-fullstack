import React from 'react';
import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllProduct } from '../api/Backend';
import ProductList from '../components/ProductList';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';


const ScreenProduct = gestureHandlerRootHOC((props) => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function _loadProducts() {
        setIsLoading(true);
        setProducts([]);
        getAllProduct().then(data => {
            setProducts(data);
            console.log(products);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        _loadProducts();
    }, [])

    function _displayLoading() {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color='#12ad91' />
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.boxView}>
                <TouchableOpacity onPress={() => _loadProducts()}>
                    <Text style={styles.purpleButton}>Recharger</Text>
                </TouchableOpacity>
            </View>

            <ProductList
                products={products}
                navigation={props.navigation}
            />

            {_displayLoading()}
            
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    safeView: {
        flex: 1
    },
    boxView: {
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    purpleButton: {
        padding: 15,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#12ad91',
        borderWidth: 1,
        marginTop: 10,
        marginHorizontal: 20,
        textAlign: 'center'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 180,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ScreenProduct;
