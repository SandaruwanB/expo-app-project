import React, { useEffect, useState } from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FetherIcon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import * as SecureStorage from 'expo-secure-store'
import config from '../../../apiConfig';

const AccountSettings = () => {
    const [oldPassOpen, setOldPassOpen] = useState(true);
    const [newPassOpen, setNewPassOpen] = useState(true);
    const [rePassOpen, setRePassOpen] = useState(true);
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [reNewPass, setReNewPass] = useState("");
    const [token, setToken] = useState("");
    const [userDetails, setUserDetails] = useState([]);


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
            setUserDetails(res.data.details);
            console.log(res.data);
        })
    }, [setUserDetails])

    const changePassword = async ()=>{
        if(oldPass === "" || newPass === "" || reNewPass === ""){
            Alert.alert("All Fields are Required.", "Plese notice that if you change password all fields are required");
        }
        else if(newPass !== reNewPass){
            Alert.alert("Passwords doesn't Match", "Both new password and re entered password needs to equal.");
        }
        else{
            await axios.post(`${config.uri}/pass`, {
                oldPass : oldPass,
                email : token,
                newPass : newPass,
            }).then(res=>{
                if(res.data.result === 'pass'){
                    Alert.alert("Incorrect Old Password.", "You entered old password is incorrect.please check again before submit.");
                }
                else if(res.data.result === 'success'){
                    setNewPass("");
                    setOldPass("");
                    setReNewPass("");
                    Alert.alert("Success.", "Your Password is Changed.");
                }
            })
        }
    }

    return (
        <View>
            <ScrollView style={[styles.container, {paddingBottom : 20}]}>
                <View style={styles.containerFluid}>
                    <Text style={styles.topText}>Personal Details</Text>
                    <View style={styles.topBar}></View>
                    <View style={styles.inputs}>
                        <Text style={styles.textValues}>{userDetails.name}</Text>
                        <FontAwesome style={styles.leftIcon} name='user'/>
                        <FetherIcon style={[styles.rightIcon, {color : 'green'}]} name='edit'/>
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.textValues}>{token}</Text>
                        <Icon style={styles.leftIcon} name='email'/>
                        <FetherIcon style={[styles.rightIcon, {color : 'red'}]} name='edit'/>
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.textValues}></Text>
                        <FontAwesome style={styles.leftIcon} name='user'/>
                        <FetherIcon style={[styles.rightIcon, {color : 'green'}]} name='edit'/>
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.textValues}>sandaruwanbandara.dev</Text>
                        <FontAwesome style={styles.leftIcon} name='user'/>
                        <FetherIcon style={[styles.rightIcon, {color : 'green'}]} name='edit'/>
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.textValues}>{userDetails.contact ? userDetails.contact : "Not Found"}</Text>
                        <FontAwesome style={styles.leftIcon} name='address-book'/>
                        <FetherIcon style={[styles.rightIcon, {color : 'green'}]} name='edit'/>
                    </View>
                    <Text style={[styles.topText, {marginTop : 50,}]}>Change Password</Text>
                    <View style={styles.topBar}></View>
                    <View style={styles.passField}>
                        <TextInput placeholder='Old Password' secureTextEntry={oldPassOpen} style={[styles.input,]} onChangeText={text=>setOldPass(text)} value={oldPass}/>
                        <FontAwesome name='lock' style={styles.passIcon}/>
                        <FetherIcon name={oldPassOpen ? 'eye' : 'eye-off'} style={styles.eye}  onPress={()=>setOldPassOpen(!oldPassOpen)}/>                  
                    </View>
                    <View style={styles.passField}>
                        <TextInput placeholder='New Password' secureTextEntry={newPassOpen} style={[styles.input,]} onChangeText={text=>setNewPass(text)} value={newPass}/>
                        <FontAwesome name='lock' style={styles.passIcon}/>
                        <FetherIcon name={newPassOpen ? 'eye' : 'eye-off'} style={styles.eye}  onPress={()=>setNewPassOpen(!newPassOpen)}/>
                    </View>
                    <View style={styles.passField}>
                        <TextInput placeholder='Re-Enter Password' secureTextEntry={rePassOpen} style={[styles.input,]} onChangeText={text=>setReNewPass(text)} value={reNewPass}/>
                        <FontAwesome name='lock' style={styles.passIcon}/>
                        <FetherIcon name={rePassOpen ? 'eye' : 'eye-off'} style={styles.eye}  onPress={()=>setRePassOpen(!rePassOpen)}/>  
                    </View>
                    <View style={{width : '100%', marginTop : 30,}}>
                        <TouchableOpacity style={styles.btn} onPress={()=>changePassword()}>
                            <Text style={{textAlign : 'center', color : '#fff', fontSize : 15,}}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#fff',
    },
    containerFluid : {
        marginHorizontal : '2%',
        width : '96%',
        marginTop : 20,
    },
    topBar : {
        width : '100%',
        height : 1,
        marginTop : 2,
        backgroundColor : '#2E3A59',
    },
    topText : {
        marginLeft : 10,
    },
    heading : {
        fontSize : 15,
        marginTop : 5,
        marginLeft : '10%',
    },
    inputs : {
        position : 'relative',
        paddingLeft : 20,
        marginTop : 15,
    },
    textValues : {
        paddingLeft : 30,
        fontSize : 14,
        padding : 3,
        paddingTop : 5,
    },
    leftIcon : {
        fontSize : 22,
        position : 'absolute',
        top : 5,
        left : 20,
        color : '#274BDB',
    },
    rightIcon : {
        fontSize : 18,
        position : 'absolute',
        top : 5,
        right : 15,
    },
    input : {
        width : '100%',
        backgroundColor : '#D9E4FF',
        padding : 3,
        paddingLeft : 30,
    },
    passField :{
        marginTop : 20,
        width : '80%',
        marginLeft : '10%',
        position : 'relative',
    },
    passIcon : {
        position : 'absolute',
        top : 6,
        left : 10,
        fontSize : 20,
    },
    btn : {
        backgroundColor : '#3366FF',
        width : '40%',
        padding : 7,
        marginLeft : '30%',
        height : '100%',
    },
    eye : {
        position : 'absolute',
        right : 8,
        top : 6,
        fontSize : 18,
    }
})

export default AccountSettings;
