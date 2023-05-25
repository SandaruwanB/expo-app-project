import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import * as SecureStorage from 'expo-secure-store';

const UserHome = () => {
    
    const getToken = async () =>{
       const token = await SecureStorage.getItemAsync("auth");
       if(token){
        return "available";
       }
       else{
        return "not available";
       }
    }
    console.log(getToken());

    return (
        <View>
            <Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default UserHome;
