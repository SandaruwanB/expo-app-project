import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import * as SecureStorage from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const navigate = useNavigation();
    const {width, height} = Dimensions.get('window');

    const signOut = async ()=>{
        try {
            await SecureStorage.deleteItemAsync("auth");
            await SecureStorage.deleteItemAsync("role");
            navigate.navigate("Login");
        } catch (error) {
            console.log(error);
        }
    }

    const changeCategory = ()=>{
        navigate.navigate("Change Category");
    }

    const changePassword = ()=>{
        navigate.navigate("Change Password");
    }

    return (
        <View style={[styles.container, {maxWidth : width, maxHeight : height}]}>
            <View style={{height : 250, width : '100%', marginTop : 30, position : 'relative',}}>
                <View style={{width : '100%', flex : 1, alignItems : 'center'}}>
                    <View style={{width : 140, height : 140, backgroundColor : 'red', borderRadius : 100,}}>
                        
                    </View>
                    <View style={{marginTop : 15,}}>
                        <Text style={{textAlign : 'center', fontSize : 20,}}>Sandaruwan Bandara</Text>
                        <Text style={{textAlign : 'center', fontSize : 14,}}>sandarusbandara110@gmail.com</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.signOut} onPress={()=>changeCategory()}>
                <Icon name='right' style={styles.signOutIcon}/>
                <Text style={styles.signOutText}>Change Category</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signOut} onPress={()=>changePassword()}>
                <Icon name='right' style={styles.signOutIcon}/>
                <Text style={styles.signOutText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.signOut} onPress={()=>signOut()}>
                <Icon name='logout' style={styles.signOutIcon}/>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {

    }, 
    signOut : {
        width : '100%',
        padding : 12,
        position : 'relative',
        backgroundColor : '#fff',
        borderBottomColor : '#8F9BB3',
        borderBottomWidth : 1,
    },
    signOutIcon : {
        position : 'absolute',
        right : 20,
        top : 15,
        fontSize : 15,
    },
    signOutText : {
        marginLeft : 10,
        fontSize : 14,
    },

});

export default Settings;
