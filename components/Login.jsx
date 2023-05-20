import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity , SafeAreaView, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/FontAwesome'
import MatIcon from 'react-native-vector-icons/MaterialIcons'

const Login = () => {
    const navigate = useNavigation();
    const [isPassword, setIsPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passErr, setPassErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passErrText, setPassErrText] = useState("");
    const [emailErrText, setEmailErrText] = useState("");


    const signIn = ()=>{
        if(email === "" && password === ""){
            setPassErr(true);
            setEmailErr(true);
            setEmailErrText("Email is Required");
            setPassErrText("Password is Required");
        }
        else if(email === ""){
            setPassErr(false);
            setEmailErr(true);
            setEmailErrText("Email is Required");
            setPassErrText("");
        }
        else if(password === ""){
            setPassErr(true);
            setEmailErr(false);
            setEmailErrText("");
            setPassErrText("Password is Required");
        }
        else{
            if(email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                setPassErr(false);
                setEmailErr(false);
                setEmailErrText("");
                setPassErrText("");
            }
            else{
                setPassErr(false);
                setEmailErr(true);
                setEmailErrText("Invalid Email Address");
                setPassErrText("");
            }

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.heading}>Welcome Back</Text>
                <Text style={styles.subHeading}>Welcome back, Please Log in to Post Your Problems and Any Other Discussions</Text>
            </View>
            <View style={{width : '80%', marginTop : 30}}>
                <View style={{position : 'relative'}}>
                    <TextInput style={[styles.input, emailErr ? styles.inputErr : '']} placeholder='email address' onChangeText={(text)=>setEmail(text)} value={email}/>
                    <MatIcon name='email' size={20} style={{position: 'absolute', top: 15, left : 6, color : '#3366FF'}}/>
                    <Text style={{textAlign : 'center', color : '#B81D5B'}}>{emailErrText}</Text>
                </View>
                <View style={{marginTop : 30, position : 'relative'}}>
                    <TextInput placeholder='password' style={[styles.input, passErr ? styles.inputErr : '']} secureTextEntry={isPassword} onChangeText={(text)=>setPassword(text)} value={password}/>
                    <Icon name='lock' size={20} style={{position : 'absolute', top: 16, left : 10, color : '#3366FF'}}/>
                    {isPassword ? 
                        <Icon name='eye' size={20} style={{position : 'absolute', top : 15, right : 10}} onPress={()=>setIsPassword(false)}/>
                    : 
                        <Icon name='eye-slash' size={20} style={{position : 'absolute', top : 15, right : 10}} onPress={()=>setIsPassword(true)}/>
                    }
                    <Text style={{textAlign : 'center', color : '#B81D5B'}}>{passErrText}</Text>
                </View> 
                <TouchableOpacity style={{marginTop: 8,  width: '95%'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14, textAlign: 'right'}}>Forget Password</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop : 20, width : '65%'}}>
                <TouchableOpacity style={styles.signBtn} onPress={()=>signIn()}>
                    <Text style={{color : '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 18}}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{marginTop: 15, padding : 5}} onPress={()=>navigate.navigate('Register')}>
                    <Text style={{fontWeight: '700'}}>I do not Have an Account</Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 15, fontWeight: '500', color : '#3366FF', marginTop: 40}}>Or Continue With</Text>
            <View style={{width: '65%', marginTop: 15}}>
                <TouchableOpacity style={{backgroundColor: '#E4E9F2',padding: 8, borderRadius: 5, width : '100%'}} onPress={()=>navigate.navigate('adminPages')}>
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
    inputErr : {
        borderWidth : 1,
        borderColor : '#B81D5B',
    }
})

export default Login;
