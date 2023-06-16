import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import * as SecureStorage from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import IonIcons from 'react-native-vector-icons/Ionicons';

const UserHome = () => {
    const [ user, setUser ] = useState("");
    const navigate = useNavigation();
    const [category, setCategory] = useState("");

    const getToken = async () =>{
        try {
            const result = await SecureStorage.getItemAsync('auth');
            setUser(result);
        } catch (error) {
            console.log(error);
        }
    }
    getToken();

    const data = [
        { label: "PUCIT", value: "pucit" },
        { label: "UCP", value: "ucp" },
        { label: "UET", value: "uet" },
    ];
    
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
                    <Dropdown 
                        style={styles.dropdown}
                        placeholder='What is the Category?'
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        onChange={ item => {
                            setCategory(item.value);
                        }}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search...."
                        value={category}
                    />
                    <TextInput placeholder='Your Post' style={styles.quickPostInput} multiline={true} numberOfLines={3}/>
                    <TouchableOpacity style={styles.postbtn}>
                        <Text style={styles.postBtnText}>Post</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <View style={styles.topLine}></View>
                    <View style={styles.iconContent}>
                        <IonIcons name='star' style={styles.starIcon}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    conatiner : {
        backgroundColor : '#E0E0E0',
        minHeight : '100%',
    },
    quickPost : {
        width : '100%',
        padding : 10,
        position : 'relative',
        paddingHorizontal : 20,
        backgroundColor : '#fff',
        marginTop : 8,
    },
    quickText : {
        marginLeft : 10,
        paddingBottom : 5,
        fontWeight : 'bold',
        fontSize : 17,
    },
    quickPostInput : {
        width : '100%',
        padding : 8,
        borderRadius : 5,
        textAlignVertical : 'top',
        backgroundColor : '#D9E4FF',
        fontSize : 15,
    },
    postbtn : {
        marginTop : 10,
        backgroundColor : '#3366FF',
        width : '30%',
        padding : 4,
        borderRadius : 5,
    },
    postBtnText : {
        color : '#fff',
        textAlign : 'center',
        fontSize : 15,
    },
    dropdown : {
        backgroundColor : '#D9E4FF',
        paddingHorizontal : 10,
        marginBottom : 10,
        borderRadius : 5,
        fontSize : 15,
    },
    placeholderStyle : {
        fontSize : 15,
        color : '#2E3A59',
    },
    content : {
        marginTop : 6,
        backgroundColor : '#fff',
        padding : 8,
    },
    topLine : {
        width : '96%',
        height : 0.7,
        backgroundColor : '#636363',
        marginLeft : '2%',
    },
    iconContent : {
        padding : 5,
    },
    starIcon : {
        fontSize : 22,
        color : 'green',
    }
})

export default UserHome;
