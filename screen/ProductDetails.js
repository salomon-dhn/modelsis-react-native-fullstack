import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Modal, TextInput, View, ActivityIndicator, Text, ScrollView, Image, TouchableOpacity, Platform, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { getProductById, putUpdate, getAllType } from '../api/Backend';

var nameUpdate = "";

const ProductDetails = (props) => {

  const [product, setProduct] = useState(undefined); // Pour l'instant on n'a pas les infos du product, on initialise donc le product à undefined.
  const [typeProduct, setTypeProduct] = useState(undefined);
  const [isLoading, SetIsLoading] = useState(true); // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du product
  const navigation = props.navigation;
  const [selectedValue, setSelectedValue] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    if (product != undefined && Platform.OS === 'ios') {

      navigation.setOptions({
        headerRight: () => (<TouchableOpacity
          style={styles.share_touchable_headerrightbutton}
          onPress={() => _shareProduct()}>
          <Image
            style={styles.share_image}
            source={require('../assets/ic-share.ios.png')} />
        </TouchableOpacity>
        )
      });
    }
  });

  useEffect(() => {

    Promise.all([getProductById(props.route.params.idProduct), getAllType()]).then((results) => {
      let productResult = results[0];
      let typeResult = results[1];
      typeResult.map((t) => { if (productResult.type === t.name) setSelectedValue(t); });
      setTypeProduct(typeResult);
      setProduct(productResult);
      nameUpdate = productResult.name;
      SetIsLoading(false);
    })

  }, []);

  const _changeName = (text) => {
    nameUpdate = text;
  }

  const _update = (name) => {
    putUpdate(product.id, name, selectedValue.id);
    setModalVisible(true);
  }

  const renderProductList = () => {
    return typeProduct.map((type) => {
      return <Picker.Item key={type.id} label={type.name} value={type} />
    })
  }

  const _displayProduct = () => {
    if (product != undefined) {
      console.log(selectedValue)
      return (
        <ScrollView style={styles.scrollview_container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ marginBottom: 15, textAlign: 'center', color: 'black', fontSize: 20 }}>Your insertion is successful</Text>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.buttonClose}>
                    <Icon name={'checkmark-outline'} size={30} color={'#12ad91'} />
                    Validate
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.info}>
            <Text style={styles.title_text}>{product.id}</Text>
            <Text style={styles.description_text}>Name : {product.name}</Text>
            <Text style={styles.default_text}>Créez le {product.createdDate}</Text>
            <Text style={styles.default_text}>Type : {product.type}</Text>
          </View>
          <View style={styles.change}>
            <TextInput autocomplete='tel-device' blurOnSubmit={true} onChangeText={(text) => _changeName(text)} style={styles.textInput} defaultValue={product.name} />
            <View style={styles.picker}>
              <Text style={styles.textType}>Type : </Text>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 200, color: '#12ad91' }}
                mode='dropdown'
                prompt="Type"
                dropdownIconColor='black'
                dropdownIconRippleColor='12ad91'
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >

                {renderProductList()}

              </Picker>
            </View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { _update(nameUpdate) }}>
              <Text style={styles.buttonPurple}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    }
  }

  function _displayLoading() {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color='#12ad91' />
        </View>
      )
    }
  }
  function _shareProduct() {
    Share.share({ title: 'Product ModelSIS', message: 'Name: ' + product.name + ', Type: ' + product.type });
  }

  function _displayFloatingActionButton() {
    if (product != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => _shareProduct()}>
          <Image
            style={styles.share_image}
            source={require('../assets/ic-share.android.png')} />
        </TouchableOpacity>
      );
    }
  }

  return (
    <SafeAreaView style={styles.main_container}>
      {_displayLoading()}
      {_displayProduct()}
      {_displayFloatingActionButton()}
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5
  },
  info: {
    flex: 1,

  },
  change: {
    flex: 2,
    marginTop: 50
  },
  picker: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  textType: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center'
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    marginHorizontal: 20,
    height: 50,
    padding: 10,
    color: 'black'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    color: 'green',
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#12ad91',
    justifyContent: 'center',
    alignItems: 'center',
  },
  share_image: {
    width: 30,
    height: 30
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  buttonPurple: {
    textAlign: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    backgroundColor: '#12ad91',
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 42,
    fontStyle: 'normal',
    fontSize: 12,
    color: '#ffffff',
    height: 55,
    width: 200
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3"
    , borderRadius: 20,
    padding: 10,
    elevation: 2
  }
})


export default ProductDetails;