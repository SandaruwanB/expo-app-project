import React, { useEffect, useState,  } from 'react'
import {View, StyleSheet, FlatList, Text, ScrollView, TextInput, ToastAndroid, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FetherIcon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as SecureStorage from 'expo-secure-store'
import axios, { Axios } from 'axios'
import config from '../../../apiConfig'

const ChangeUserData = () => {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [reNewPass, setReNewPass] = useState("");
    const [oldPassErrText, setOldPassErrText] = useState("");
    const [newPassErrText, setNewPassErrText] = useState("");
    const [rePassErrText, setRePassErrText] = useState("");
    const [oldPassErr, setOldPassErr] = useState(false);
    const [newPassErr, setNewPassErr] = useState(false);
    const [rePassErr, setRePassErr] = useState(false);
    const [oldPassOpen, setOldPassOpen] = useState(true);
    const [newPassOpen, setNewPassOpen] = useState(true);
    const [rePassOpen, setRePassOpen] = useState(true);
    const [user, setUser] = useState("");

    const editEmail = ()=>{
        ToastAndroid.show("Email Cannot Edit", ToastAndroid.SHORT);
    }

    const getToken = async () =>{
        try {
            const result = await SecureStorage.getItemAsync('auth');
            setUser(result);
        } catch (error) {
            console.log(error);
        }
    }
    getToken();

    const changePassword = async ()=>{
        if(oldPass === "" && newPass === "" && reNewPass === ""){
            setNewPassErr(false);
            setRePassErr(false);
            setNewPassErrText("");
            setRePassErrText("");
            setOldPassErrText("This Field is Required");
            setOldPassErr(true);
        }
        else if(oldPass === ""){
            setNewPassErr(false);
            setRePassErr(false);
            setNewPassErrText("");
            setRePassErrText("");
            setOldPassErrText("This Field is Required");
            setOldPassErr(true);
        }
        else if(newPass === ""){
            setNewPassErr(true);
            setRePassErr(false);
            setNewPassErrText("This Field is Required");
            setRePassErrText("");
            setOldPassErrText("");
            setOldPassErr(false);
        }
        else if(reNewPass === ""){
            setNewPassErr(false);
            setRePassErr(true);
            setNewPassErrText("");
            setRePassErrText("This Field is Required");
            setOldPassErrText("");
            setOldPassErr(false);
        }
        else if(newPass !== reNewPass){
            setNewPassErr(true);
            setRePassErr(true);
            setNewPassErrText("Passwords Doesn't Match");
            setRePassErrText("Passwords Doesn't Match");
            setOldPassErrText("");
            setOldPassErr(false);
        }
        else{
            setNewPassErr(false);
            setRePassErr(false);
            setNewPassErrText("");
            setRePassErrText("");
            setOldPassErrText("");
            setOldPassErr(false);

            await axios.post(`${config.uri}/pass`, {
                oldPass : oldPass,
                email : user,
                newPass : newPass,
            }).then(res=>{
                if(res.data.result === 'pass'){
                    setNewPassErr(false);
                    setRePassErr(false);
                    setNewPassErrText("");
                    setRePassErrText("");
                    setOldPassErrText("Old Password is Wrong");
                    setOldPassErr(true);
                }
                else if(res.data.result === 'success'){
                    setNewPass("");
                    setOldPass("");
                    setReNewPass("");
                    setNewPassErr(false);
                    setRePassErr(false);
                    setNewPassErrText("");
                    setRePassErrText("");
                    setOldPassErrText("");
                    setOldPassErr(false);
                }
            })
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerFluid}>
                <Text style={styles.topText}>Personal Details</Text>
                <View style={styles.topBar}></View>
                <View style={styles.inputs}>
                    <Text style={styles.textValues}>sandaruwanbandara.dev</Text>
                    <FontAwesome style={styles.leftIcon} name='user'/>
                    <FetherIcon style={[styles.rightIcon, {color : 'green'}]} name='edit'/>
                </View>
                <View style={styles.inputs}>
                    <Text style={styles.textValues}>sandaruwanbandara.dev@gmail.com</Text>
                    <Icon style={styles.leftIcon} name='email'/>
                    <FetherIcon style={[styles.rightIcon, {color : 'red'}]} name='edit' onPress={()=>editEmail()}/>
                </View>
                <View style={styles.inputs}>
                    <Text style={styles.textValues}>Not Presented</Text>
                    <FontAwesome style={styles.leftIcon} name='address-book'/>
                    <FetherIcon style={[styles.rightIcon, {color : 'green'}]} name='edit' onPress={()=>editEmail()}/>
                </View>
                <Text style={[styles.topText, {marginTop : 50,}]}>Change Password</Text>
                <View style={styles.topBar}></View>
                <View style={styles.passField}>
                    <TextInput placeholder='Old Password' secureTextEntry={oldPassOpen} style={[styles.input, oldPassErr ? {borderWidth : 0.7,borderColor : 'red'} : '']} onChangeText={text=>setOldPass(text)} value={oldPass}/>
                    <FontAwesome name='lock' style={styles.passIcon}/>
                    <FetherIcon name={oldPassOpen ? 'eye' : 'eye-off'} style={styles.eye} onPress={()=>setOldPassOpen(!oldPassOpen)} />
                    {oldPassErrText === "" ? "" : <Text style={{textAlign : 'center', color : 'red',}}>{oldPassErrText}</Text>}                    
                </View>
                <View style={styles.passField}>
                    <TextInput placeholder='New Password' secureTextEntry={newPassOpen} style={[styles.input, newPassErr ? {borderWidth : 0.7,borderColor : 'red'} : '']} onChangeText={text=>setNewPass(text)} value={newPass}/>
                    <FontAwesome name='lock' style={styles.passIcon}/>
                    <FetherIcon name={newPassOpen ? 'eye' : 'eye-off'} style={styles.eye} onPress={()=>setNewPassOpen(!newPassOpen)} />
                    {newPassErrText === "" ? "" : <Text style={{textAlign : 'center', color : 'red',}}>{newPassErrText}</Text>}     
                </View>
                <View style={styles.passField}>
                    <TextInput placeholder='Re-Enter Password' secureTextEntry={rePassOpen} style={[styles.input, rePassErr ? {borderWidth : 0.7,borderColor : 'red'} : '']} onChangeText={text=>setReNewPass(text)} value={reNewPass}/>
                    <FontAwesome name='lock' style={styles.passIcon}/>
                    <FetherIcon name={rePassOpen ? 'eye' : 'eye-off'} style={styles.eye} onPress={()=>setOldPassOpen(!rePassOpen)} />
                    {rePassErrText === "" ? "" : <Text style={{textAlign : 'center', color : 'red',}}>{rePassErrText}</Text>}     
                </View>
                <View style={{width : '100%', marginTop : 30,}}>
                    <TouchableOpacity style={styles.btn} onPress={()=>changePassword()}>
                        <Text style={{textAlign : 'center', color : '#fff', fontSize : 15,}}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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

export default ChangeUserData;
