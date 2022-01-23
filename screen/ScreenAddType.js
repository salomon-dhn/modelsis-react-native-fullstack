import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { postType } from '../api/Backend';
import Icon from 'react-native-vector-icons/Ionicons';

var changeType = "";

function ScreenAddType(props) {

  const [modalVisible, setModalVisible] = useState(false);

  const _changeType = (text) => {
    changeType = text;
  }

  const _addType = () => {
    console.log('error')
    postType(changeType);//.then((status)=>{console.log(status) ; s}).catch((error)=> console.log(error));
    setModalVisible(true);
  }

  return (

    <SafeAreaView style={styles.container}>

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
              <Text style={styles.buttonClose}><Icon name={'checkmark-outline'} size={30} color={'green'} />Validate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.box}>
        <Text style={styles.text}>
          You can put your new type in this input !!
        </Text>

        <TextInput
          style={styles.input}
          placeholder='Laptop'
          placeholderTextColor='gray'
          onChangeText={(text) => _changeType(text)}
        />

        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { _addType() }}>
            <Text style={styles.button}>
              Add
            </Text>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>);

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  box: {
    flex: 1 / 3,
  }, 
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'black'
  }, 
  input: {
    color: '#12ad91',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 0,
    height: 50,
    marginVertical: 20
  }, 
  button: {
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

});
export default ScreenAddType;
