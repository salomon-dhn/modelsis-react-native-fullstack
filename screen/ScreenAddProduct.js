import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Modal, TextInput, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { postProduct, getAllType } from '../api/Backend';

var nameUpdate = "";

const ScreenAddProduct = (props) => {

  const [typeProduct, setTypeProduct] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true); // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du product
  const [selectedValue, setSelectedValue] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllType().then((results) => {
      setSelectedValue(results[0]);
      setTypeProduct(results);
      setIsLoading(false);
    })
  }, []);

  const _changeName = (text) => {
    nameUpdate = text;
    console.log(nameUpdate);
  }

  const _create = (name) => {
    postProduct(name, selectedValue.name);
    setModalVisible(true);
  }

  const renderProductList = () => {
    return typeProduct.map((type) => {
      return <Picker.Item key={type.id} label={type.name} value={type} />
    })
  }

  const _displayView = () => {

    if (typeProduct != undefined) {

      return (
        <View style={styles.change}>

          <View style={{ flex: 1 / 2, flexDirection: 'row' }}>
            <Text style={{ color: 'black', fontSize: 20, textAlignVertical: 'center', flex: 2 / 10 }}> Name: </Text>
            <TextInput
              autocomplete='tel-device'
              blurOnSubmit={true}
              onChangeText={(text) => _changeName(text)}
              style={styles.textInput} placeholder='Acer'
              placeholderTextColor='gray'
            />
          </View>

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

          <View style={{ alignItems: 'center', flex: 1 / 2 }}>
            <TouchableOpacity onPress={() => { _create(nameUpdate) }}>
              <Text style={styles.buttonPurple}>Create</Text>
            </TouchableOpacity>
          </View>

        </View>
      );
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

  return (

    <SafeAreaView style={styles.main_container}>

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
              <Text style={styles.buttonClose}><Icon name={'checkmark-outline'} size={30} color={'#12ad91'} />Validate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {_displayLoading()}

      {_displayView()}

    </SafeAreaView>);

};

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
  change: {
    marginTop: 10,
    width: 'auto',
    height: 'auto',
    minHeight: 200,
    justifyContent: 'space-evenly'
  },
  picker: {
    flexDirection: 'row',
    flex: 1 / 2,
    alignItems: 'center',
    margin: 5,
  },
  textType: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center'
  },
  textInput: {
    flex: 7 / 10,
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    marginHorizontal: 20,
    height: 50,
    padding: 10,
    color: 'black'
  }, buttonPurple: {
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
export default ScreenAddProduct;
