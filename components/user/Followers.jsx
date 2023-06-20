import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
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
            if(res.data.result !== "notFound"){
                setFollowers(res.data.followers);
            }
        })
    })


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Text>60 Followers</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.item}>
                    <View style={{}}>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#fff',
        minHeight : '100%',
    },
    content : {
        padding : 10,
        paddingHorizontal : 30,
    },
    line : {
        width : '100%',
        height : 0.7,
        backgroundColor : '#2E3A59',
    },
    item : {
        width : '100%',
    }
})

export default Followers;
