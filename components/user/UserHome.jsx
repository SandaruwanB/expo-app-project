import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
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
    
    /*const signOut = async ()=>{
        try {
            await SecureStorage.deleteItemAsync("auth");
            await SecureStorage.deleteItemAsync("role");
            navigate.navigate("Login");
        } catch (error) {
            console.log(error);
        }
    }*/

    return (
        <View style={styles.conatiner}>
            <ScrollView>
                <View style={styles.quickPost}>
                    <Text style={styles.quickText}>Quick Post</Text>

                    <TextInput placeholder='Your Post' style={styles.quickPostInput} multiline={true} numberOfLines={4}/>
                    <TouchableOpacity style={styles.postbtn}>
                        <Text style={styles.postBtnText}>Post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    conatiner : {
        paddingHorizontal : 15,
        backgroundColor : '#fff',
    },
    quickPost : {
        width : '100%',
        marginTop : 10,
        padding : 10,
        position : 'relative',
    },
    quickText : {
        marginLeft : 10,
        paddingBottom : 10,
    },
    quickPostInput : {
        width : '100%',
        padding : 8,
        borderRadius : 5,
        textAlignVertical : 'top',
        backgroundColor : '#D9E4FF',
    },
    postbtn : {
        marginTop : 5,
        backgroundColor : '#3366FF',
        width : '30%',
        padding : 4,
        borderRadius : 5,
    },
    postBtnText : {
        color : '#fff',
        textAlign : 'center',
    }
})

export default UserHome;
