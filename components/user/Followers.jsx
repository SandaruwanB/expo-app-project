import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import config from '../../apiConfig';
import * as SecureStorage from 'expo-secure-store';
import FaFa from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { BottomSheet } from 'react-native-btr';

const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const [user, setUser] = useState("");
    const [bottonSheetOpen, setBottomSheetOpen] = useState(false);

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
                            <TouchableOpacity onPress={()=>setBottomSheetOpen(true)}>
                                <MatIcon name='dots-vertical' style={{fontSize : 30, marginTop : 5,}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.line, {width : '82%', marginLeft : '18%',}]}></View>
                </View>
            </ScrollView>
            <BottomSheet
                visible={bottonSheetOpen}
                onBackButtonPress={()=>setBottomSheetOpen(false)}
                onBackdropPress={()=>setBottomSheetOpen(false)}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.sheetTopBar}></View>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '35%', padding : 8,}}>
                            <FaFa name='remove' style={{fontSize : 18,}}/>
                            <Text>Unfollow</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '26%', padding : 8,}}>
                            <MatirialIcon name='chat' style={{fontSize : 18,}}/>
                            <Text>Chat</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '30%', padding : 8,}}>
                            <MatirialIcon name='report' style={{fontSize : 18,}}/>
                            <Text>Report</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '41%', padding : 8,}}>
                            <IonIcon name='md-open' style={{fontSize : 18,}}/>
                            <Text>View Profile</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </BottomSheet>
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
    },
    bottomSheet : {
        width : '100%',
        paddingHorizontal : 50,
        paddingVertical :20,
        backgroundColor : '#fff',
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        position : 'relative',
    },
    sheetTopBar : {
        width : 60,
        height : 6,
        backgroundColor : '#222B45',
        position : 'absolute',
        top : 4,
        left : '55%',
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
    },
    bottomSheetOpenIcon : {
        fontSize : 30,
        marginTop : 2,
    }
})

export default Followers;
