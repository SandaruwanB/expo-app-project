import React, { useState } from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import * as SecureStorage from 'expo-secure-store'
import { Dropdown } from 'react-native-element-dropdown'
import config from '../../../apiConfig'

const ChangeCategory = () => {
    const [user, setUser] = useState("");

    const data = [
        { label: "PUCIT", value: "pucit" },
        { label: "UCP", value: "ucp" },
        { label: "UET", value: "uet" },
    ];

    const getToken = async () =>{
        try {
            const result = await SecureStorage.getItemAsync('auth');
            setUser(result);
        } catch (error) {
            console.log(error);
        }
    }
    getToken();


    return (
        <View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        height : '100%',
        width : '100%',
        backgroundColor : '#fff',
    },
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    inputSearchStyle : {
        fontSize : 14,
        borderRadius : 10,
    },
})

export default ChangeCategory;
