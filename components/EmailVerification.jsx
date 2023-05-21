import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/core'

const EmailVerification = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/emailVerification.png')} />
            <Text style={styles.heading}>We will Send you a Verification Code to Your Email, Please Use the Code for Verify Your Account</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("FinalVerification")}>
                <Text style={styles.btnText}>Send Verification Code</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
    },
    image : {
        width : 350,
        height : 350,
    },
    heading : {
        paddingHorizontal : 18, 
        textAlign : 'center',
        fontSize : 17,
        marginTop : 30,
    },
    button : {
        marginTop : 60,
        backgroundColor : '#3366FF',
        padding : 10,
        borderRadius : 10,
    },
    btnText : {
        color : '#ffffff',
        fontSize : 16,
        fontWeight : 'bold',
    }
})

export default EmailVerification;
