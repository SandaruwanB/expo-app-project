import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import config from '../../apiConfig';
import * as SecureStorage from 'expo-secure-store';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';

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
            <ScrollView style={{marginBottom : 120,}}>
                <View style={styles.content}>
                    <Text>60 Followers</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.item}>
                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14, }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14 }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14, }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14, }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14 }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14, }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14, }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14 }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14, }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14, }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14,  }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>

                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 12, }}>
                        <View style={{ width : '10%', }}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={{ width : 45, height : 45, borderRadius : 45, }} />
                        </View>
                        <View style={{ width : '50%', }}>
                            <Text style={{ fontWeight : 'bold', fontSize : 15, marginTop : 2, }}>Sandaruwan Bandara</Text>
                            <Text style={{ fontSize : 13, }}>Software Engineer</Text>
                        </View>
                        <View>
                            <SimpleLine style={{ fontSize : 22, color : 'red', marginTop : 14, }} name='user-unfollow' />
                        </View>
                        <View>
                            <Feather style={{ fontSize : 22, color : '#3366FF', marginTop : 15, marginRight : 5, }} name='send' />
                        </View>
                    </View>
                    <View style={[styles.line, {width : '80%', marginLeft : '20%',}]}></View>
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
        paddingHorizontal : 15,
        width : '100%',
        marginTop : 5,
    }
})

export default Followers;
