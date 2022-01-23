import * as React from 'react';
import { Image, Text, ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Intro ({navigation}){
    return (
        <SafeAreaView style={styles.safe}> 
                <View style={styles.boxLogo}>
                    <Image source={require("../assets/logo.png")} style={styles.logo} />
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                        <Text style={styles.buttonBlue}>CONNEXION</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe:{
        flex:1,
        backgroundColor:'#fff'
    },
    boxLogo:{
        flex:0.8,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width: 300, 
        height: 200
    },
    buttonView:{
        flex:0.2,
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-evenly',
        alignSelf:'flex-end'
    },
    buttonBlue:{
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: '#18206f',
        paddingVertical: 20,
        paddingHorizontal:42,
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 15,
        borderColor: '#ff3366',
        color:'#ffffff'

    },
    buttonPink:{
        textAlign: 'center',
        borderRadius: 10,
        borderColor: '#ff3366',
        backgroundColor: '#ffe2d1',
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal:42,
        fontStyle: 'normal',
        fontSize: 12

    }
})
export default Intro;