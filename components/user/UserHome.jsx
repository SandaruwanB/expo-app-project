import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as SecureStorage from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const UserHome = () => {
    const [ user, setUser ] = useState("");
    const navigate = useNavigation();

    const getToken = async () =>{
        try {
            const result = await SecureStorage.getItemAsync('auth');
            setUser(result);
        } catch (error) {
            console.log(error);
        }
    }
    getToken();
    
    const signOut = async ()=>{
        try {
            await SecureStorage.deleteItemAsync("auth");
            await SecureStorage.deleteItemAsync("role");
            navigate.navigate("Login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>

        </View>
    );
}

const styles = StyleSheet.create({})

export default UserHome;
