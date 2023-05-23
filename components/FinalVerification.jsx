import React from 'react';
import {View, StyleSheet, Image, Text, TextInput, TouchableOpacity} from 'react-native';

const FinalVerification = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/emailVerifyToken.png')} />
            <Text style={styles.text}>We sended a Verification Code to Your Email. Check Your Email and Enter it to Verify your Account</Text>
            <TextInput  style={styles.input} placeholder='Verification Code'/>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>Done</Text>
            </TouchableOpacity>
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
    },
    input : {
        width : '80%',
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
    }
})

export default FinalVerification;
