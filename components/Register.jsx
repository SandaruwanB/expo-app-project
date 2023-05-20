import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/FontAwesome'
import MatIcon from 'react-native-vector-icons/MaterialIcons'

const Register = () => {
    const navigate = useNavigation();
    const [userErr, setUserErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [userErrMsg, setUserErrMsg] = useState("");
    const [passErrMsg, setPassErrMsg] = useState("");
    const [isPassword, setIsPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.heading}>Create Account</Text>
                <Text style={styles.subHeading}>Create an Acoount.after creating account you can post your problem and get answers from others.</Text>
            </View>
            <View style={{width : '80%', marginTop : 30}}>
                <View style={{position : 'relative'}}>
                    <TextInput style={[styles.input, userErr ? styles.inputError : '']} placeholder='email address' value={email} onChangeText={(text)=>setEmail(text)}/>
                    <MatIcon name='email' size={20} style={{position: 'absolute', top: 15, left : 6, color : '#3366FF'}}/>
                    <Text style={{textAlign : 'center', color : '#B81D5B'}}>{userErrMsg}</Text>
                </View>
                <View style={{marginTop : 20, position : 'relative'}}>
                    <TextInput placeholder='password' style={[styles.input, passErr ? styles.inputError : '']} value={password} secureTextEntry={isPassword} onChangeText={(text)=>setPassword(text)}/>
                    <Icon name='lock' size={20} style={{position : 'absolute', top: 16, left : 10, color : '#3366FF'}}/>
                    {isPassword ? 
                        <Icon name='eye' size={20} style={{position : 'absolute', top : 15, right : 10}} onPress={()=>setIsPassword(false)}/>
                    : 
                        <Icon name='eye-slash' size={20} style={{position : 'absolute', top : 15, right : 10}} onPress={()=>setIsPassword(true)}/>
                    }
                    <Text style={{textAlign : 'center', color : '#B81D5B'}}>{passErrMsg}</Text>
                </View>
            </View>
            <View style={{marginTop : 20, width : '65%'}}>
                <TouchableOpacity style={styles.signBtn} onPress={()=>registerNow()}>
                    <Text style={{color : '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 18}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{marginTop: 15, padding : 5}} onPress={()=>navigate.navigate('Login')}>
                    <Text style={{fontWeight: '700'}}>Already Have an Account</Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 15, fontWeight: '500', color : '#3366FF', marginTop: 40}}>Or Continue With</Text>
            <View style={{width: '65%', marginTop: 15}}>
                <TouchableOpacity style={{backgroundColor: '#E4E9F2',padding: 8, borderRadius: 5, width : '100%'}} onPress={()=>navigate.navigate('Bottom Nav')}>
                    <Icon name='google' size={30} color={'#00B383'} style={{textAlign : 'center'}}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    heading : {
        textAlign : 'center',
        color : '#3366FF',
        fontWeight : 'bold',
        fontSize : 35,
    },
    subHeading : {
        textAlign : 'center',
        fontSize : 16,
        padding : 10,
        marginTop : 10,
    },
    input : {
        width : '100%',
        padding : 10,
        paddingLeft : 30,
        fontSize : 16,
        backgroundColor : '#E4E9F2',
        borderRadius : 5,
    },
    signBtn:{
        backgroundColor : '#3366FF',
        padding : 10,
        width : '100%',
        borderRadius : 5,
    },
    inputError : {
        borderWidth : 1,
        borderColor : '#B81D5B',
    }
});

export default Register;
