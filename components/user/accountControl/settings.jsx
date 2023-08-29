import React, { useEffect, useState } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import FaFa5 from 'react-native-vector-icons/FontAwesome5'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios';
import config from '../../../apiConfig';
import * as SecureStorage from 'expo-secure-store'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const Settings = () => {
    const navigate = useNavigation();
    const [token, setToken] = useState("");
    const [image, setImage] = useState("");
    const [user, setUser] = useState("");

    const getToken = async () =>{
        try {
            const result = await SecureStorage.getItemAsync('auth');
            setToken(result);
        } catch (error) {
            console.log(error);
        }
    }
    getToken();

    useEffect(()=>{
        axios.get(`${config.uri}/user/:`+token).then(res=>{
            setImage(res.data.details.image);
            setUser(res.data.details.name);
        })
    });

    const signOut = async ()=>{
        try {
            await SecureStorage.deleteItemAsync("auth");
            await SecureStorage.deleteItemAsync("role");
            navigate.navigate("Login");
        } catch (error) {
            console.log(error);
        }
    }

    const changeDP = async ()=>{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            quality : 1,
            base64 : true,
            allowsEditing : true,
            aspect : [4,4]
        });
        if(!result.canceled){
            setImage(result.assets[0].base64);
        }
        else{
            console.log("cancelled");
        }
        await axios.post(`${config.uri}/setdp`,{
            user : token,
            image : image
        }).then(res=>{
            console.log(res.data);
        });
    }



    return (
        <View>
            <ScrollView style={{height : '100%'}}>
                <View style={{width : '100%', paddingBottom : 30}}>
                    <View style={{ alignItems : 'center', marginTop : 20}}>
                        {image === "" ? 
                            <Avatar.Image 
                                source={require('../../../assets/images/defaultUser.png')}
                                size={120}
                            />
                            :
                            <Avatar.Image 
                                source={{uri : `data:image/jpeg;base64,${image}`}}
                                size={120}
                            />
                        }

                        <Text style={{fontSize : 22}}>{user}</Text>
                        <Text>@{token}</Text>
                        <FaFa5 name='edit' size={25} style={{position : 'absolute', top : 88, left : 230, color : '#3366FF'}} onPress={()=>changeDP()}/>
                    </View>
                    <TouchableOpacity style={[styles.signOut, {marginTop : '10%',}]} onPress={()=>navigate.navigate('accountSettings')}>
                    <Icon name='right' style={styles.signOutIcon}/>
                    <Text style={styles.signOutText}>Account Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signOut} onPress={()=>navigate.navigate('about')}>
                        <Icon name='right' style={styles.signOutIcon}/>
                        <Text style={styles.signOutText}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signOut}>
                        <Icon name='right' style={styles.signOutIcon}/>
                        <Text style={styles.signOutText}>Legal Notices</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.signOut} onPress={()=>signOut()}>
                        <Icon name='logout' style={styles.signOutIcon}/>
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                    <View style={{width : '100%', height : '100%', backgroundColor : '#fff', paddingBottom : 20}}></View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
})

export default Settings;
