import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import config from '../../apiConfig';
import * as SecureStorage from 'expo-secure-store';

const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const [user, setUser] = useState("");

    const getToken = async () =>{
        try {
            const result = await SecureStorage.getItemAsync('auth');
            setUser(result);
        } catch (error) {
            console.log(error);
        }
    }
    getToken();

    useEffect(()=>{
        axios.post(`${config.uri}/getFollowers`, {
            email : user,
        }).then(res=>{
            console.log(res.data);
        })
    })


    return (
        <View>
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default Followers;
