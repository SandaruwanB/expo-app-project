import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native'
import axios from 'axios';
import config from '../apiConfig'

const EmailVerification = () => {
    const route = useRoute();
    const { userId } = route.params;
    const [ err, setErr ] = useState(false);
    const [ errText, setErrText ] = useState("");
    const [ userToken, setUserToken ] = useState("");

    const submitToken = async ()=>{
        if(userToken === ""){
            setErr(true);
            setErrText("Enter Token Before Submit");
        }
        else{
            setErr(false);
            setErrText("");
            await axios.post(`${config.uri}/verify`, {
                token : userToken,
                user : userId,
            }).then(res=>{
                if(res.data.result === "invalid"){
                    setErr(true);
                    setErrText("Verification Code Missmatched");
                }
                else{
                    
                }
            })
        }
    }

    const resendSubmit = async ()=>{
        console.log(userToken);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/emailVerifyToken.png')} />
            <Text style={styles.text}>We sent your verification key to your {userId} email address. please verify your account. </Text>
            <View style={styles.inputField}>
                <TextInput placeholder='Verification Key' style={[styles.input, err ? styles.inputError : '']} onChangeText={(text)=>setUserToken(text)} value={userToken}/>
                <Text style={{textAlign : 'center', color : '#B81D5B'}}>{errText}</Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={()=>submitToken()}>
                    <Text style={styles.btnText}>Verify</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btnText}>Resend Key</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        marginHorizontal : 20,
        flexDirection : 'column',
    },
    image : {
        width : 400,
        height : 350,
    },
    text : {
        textAlign : "center",
        fontSize : 17,
        marginTop : 10,
    },
    input : {
        width : '100%',
        marginTop : 30,
        padding : 10,
        paddingLeft : 15,
        fontSize : 16,
        backgroundColor : '#E4E9F2',
        borderRadius : 5,
    },
    button : {
        marginTop : 30,
        backgroundColor : '#3366FF',
        borderRadius : 10,
        paddingLeft : 20,
        paddingRight : 20,
        paddingTop : 8,
        paddingBottom : 8,
    },
    btnText : {
        color : '#ffffff',
        fontSize : 16,
        fontWeight : 'bold',
        textAlign : 'center',
    },
    inputError : {
        borderWidth : 1,
        borderColor : '#B81D5B',
    },
    inputField : {
        width : '80%',
    },
    buttons : {
        width : '70%',
        justifyContent : 'space-around',
    }
})

export default EmailVerification;
