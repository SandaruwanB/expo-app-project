import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Text, List, Divider} from 'react-native-paper'
import * as SecureStorage from 'expo-secure-store'
import axios from 'axios';
import config from '../../apiConfig'

const Notifications = () => {
    const [token, setToken] = useState("");
    const [notifications, setNotifications] = useState([]);

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
        axios.get(`${config.uri}/getnotifications/:`+token).then(res=>{
            setNotifications(res.data.notifications);
        })
    })


    return (
        <View>
            <ScrollView>
                {notifications.length > 0 ? 

                notifications.map((value)=>{
                    return (
                        <View>
                        { value.readFlag ?
                            <List.Section style={{backgroundColor: '#fff', paddingBottom: 10}}>
                                <List.Subheader style={{backgroundColor: '#fff', fontSize : 16, fontWeight : 'bold', color : '#3366FF'}}>Notifications</List.Subheader>
                                <View style={{paddingHorizontal: 20}}>
                                    <Divider/>
                                </View>
                                <List.Item
                                    style={{backgroundColor: '#fff',paddingHorizontal : 20}}
                                    title={"Molaweson appochchi"}
                                    description={"@molaweson thama ithin"}
                                    left={()=><Image source={require('../../assets/images/defaultUser.png')} style={{width : 45, height : 45, borderRadius : 40}}/>}
                                />
                                <View style={{paddingHorizontal: 20}}>
                                    <Divider/>
                                </View>
                            </List.Section>                         
                        :
                            ""
                        }
                        </View>
                    );
                })
                : 
                <List.Section style={{backgroundColor: '#fff', paddingBottom: 10}}>
                    <List.Subheader style={{backgroundColor: '#fff', fontSize : 16, fontWeight : 'bold', color : '#3366FF'}}>Notifications</List.Subheader>
                    <View style={{paddingHorizontal: 20}}>
                        <Divider/>
                    </View>
                    <List.Item
                        style={{backgroundColor: '#fff',paddingHorizontal : 20}}
                        title={"No Notifications Found"}
                        description={"you dont have notifications"}
                        left={()=><List.Icon icon={'progress-question'}/>}
                    />
                    <View style={{paddingHorizontal: 20}}>
                        <Divider/>
                    </View>
                </List.Section>
            }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Notifications;
