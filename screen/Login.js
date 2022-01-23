import * as React from 'react';
import { StyleSheet, View, Text,TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Login ({navigation}) {
    const signin= "Se connecter";
    const info= "Vous êtes un nouvel utilisateur? ";
    const create = "Créez un compte";
    
    return(
        <SafeAreaView style={styles.safe}>
            <View>
                <Text style={styles.title}>
                    {signin}
                </Text>
                <Text style={{color:'black'}}>
                    {info}
                    <TouchableOpacity>
                        <Text style={styles.textBlue}>{create}</Text>
                    </TouchableOpacity>
                    
                </Text>
            </View>
            <View>
                <TextInput secureTextEntry={true} textContentType='password' style={styles.textInput} placeholder='Mot de passe' placeholderTextColor='black'/>
            </View>
            <View style={styles.boxButton}>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('BottomNavigator')}} >
                    <Text style={{color:'white'}}>
                        Se connecter
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

}

const styles=StyleSheet.create({
    safe:{
        flex:1,
        justifyContent:'center',
        marginHorizontal: 10
    },
    title:{
        fontWeight:'bold',
        fontSize: 40,
        color: 'black'
    },
    textBlue:{
        color:'blue'
    },
    textInput:{
        borderColor: 'gray', 
        borderWidth: 0.5,
        borderRadius:10,
        marginHorizontal:10,
        marginTop:30,
        height: 50,
        padding:10,
        borderRightWidth:0,
        borderTopWidth:0,
        borderLeftWidth:0,
        color:'black'
        
    },
    button:{
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
    boxButton:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop: 30,
        marginHorizontal:10
    }
});

export default Login;