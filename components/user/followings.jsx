import React, { useEffect, useState } from 'react'
import {View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import {Text, List, Divider} from 'react-native-paper'
import {BottomSheet} from 'react-native-btr'
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FaFa from 'react-native-vector-icons/FontAwesome5'
import FaFa1 from 'react-native-vector-icons/FontAwesome'
import IonIcons from 'react-native-vector-icons/Ionicons'
import config from '../../apiConfig'
import axios from 'axios'
import * as SecureStorage from 'expo-secure-store'


const Followings = () => {
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [token,setToken] = useState("");

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
        axios.post(`${config.uri}/getFollowers`, {email : token}).then(res=>{
            setFollowers(res.data.followers);
            console.log(res.data);
        })
    })

    return (
        <View>
            <ScrollView>
                {
                    followers ?
                        followers.map((value)=>{
                            return (
                                <List.Section style={{backgroundColor: '#fff', paddingBottom: 10}}>
                                    <List.Subheader style={{backgroundColor: '#fff', fontSize : 16, fontWeight : 'bold', color : '#3366FF'}}>Followers</List.Subheader>
                                    <View style={{paddingHorizontal: 20}}>
                                        <Divider/>
                                    </View>
                                    <List.Item
                                        style={{backgroundColor: '#fff',paddingHorizontal : 20}}
                                        title={"Molaweson appochchi"}
                                        description={"@molaweson thama ithin"}
                                        left={()=><Image source={require('../../assets/images/defaultUser.png')} style={{width : 45, height : 45, borderRadius : 40}}/>}
                                        right={()=><MatIcons name='dots-vertical' size={30} style={{marginTop: 10}} onPress={()=>setBottomSheetOpen(true)}/>}
                                    />
                                    <View style={{paddingHorizontal: 20}}>
                                        <Divider/>
                                    </View>
                                </List.Section>
                            );
                        })
                    :
                     ""
                }

            </ScrollView>
            <BottomSheet
                visible={bottomSheetOpen}
                onBackButtonPress={()=>setBottomSheetOpen(false)}
                onBackdropPress={()=>setBottomSheetOpen(false)}
            >
                <View style={[styles.bottomSheet, {maxHeight : 400}]}>
                    <View style={styles.sheetTopBar}></View>
                    <View style={{marginTop : 20}}></View>
                    <TouchableOpacity style={{width : '100%', paddingBottom : 10}} >
                        <View style={{display: 'flex', flexDirection : 'row'}}>
                            <IonIcons name={'open'} size={15} style={{paddingEnd : 20, paddingTop: 4,}}/>
                            <Text style={{fontSize : 16}}>View Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity style={{width : '100%', paddingBottom : 10, marginTop : 10,}} >
                        <View style={{display: 'flex', flexDirection : 'row'}}>
                            <FaFa1 name={'wechat'} size={15} style={{paddingEnd : 20, paddingTop: 4,}}/>
                            <Text style={{fontSize : 16}}>Start Chat</Text>
                        </View>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity style={{width : '100%', paddingBottom : 10, marginTop : 10,}} >
                        <View style={{display: 'flex', flexDirection : 'row'}}>
                            <FaFa1 name={'remove'} size={18} style={{paddingEnd : 20, paddingTop: 4,}}/>
                            <Text style={{fontSize : 16, marginTop : 2,}}>Unfollow</Text>
                        </View>
                    </TouchableOpacity>
                    <Divider />
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomSheet :{
        width : '100%',
        paddingHorizontal : 50,
        paddingVertical :20,
        backgroundColor : '#fff',
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        position : 'relative',
    },
    sheetTopBar :{
        width : 60,
        height : 6,
        backgroundColor : '#222B45',
        position : 'absolute',
        top : 4,
        left : '55%',
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
    }
})

export default Followings;
