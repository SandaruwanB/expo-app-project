import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Image} from 'react-native';
import * as SecureStorage from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { BottomSheet } from 'react-native-btr';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FaFa from 'react-native-vector-icons/FontAwesome5';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserHome = () => {
    const [ user, setUser ] = useState("");
    const navigate = useNavigation();
    const [category, setCategory] = useState("");
    const [bottomTabOpen, setBottomTabOpen] = useState(false);

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
            <ScrollView style={{height : '100%', marginBottom : 100,}}>
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
                    <View style={[styles.iconContentList, { paddingHorizontal : 20, paddingBottom : 15, paddingTop : 10,}]}>
                        <View style={{flexDirection : 'row', position : 'relative',}}>
                            <TouchableOpacity style={{flexDirection : 'row'}}>
                                <Image source={require('../../assets/images/defaultUser.png')} style={styles.userImage}/>
                                <View style={{marginLeft : 10,}}>
                                    <Text style={{fontSize : 15, fontWeight : 'bold', color : '#222B45',}}>Kasun Nimantha</Text>
                                    <Text style={{fontSize : 12, color : '#8F9BB3',}}>Software Engineer</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection : 'row', position : 'relative',}}>
                            <TouchableOpacity style={{flexDirection : 'row',}} onPress={()=>setBottomTabOpen(true)}>
                                <MatIcons name='dots-vertical' style={styles.bottomSheetOpenIcon}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{padding : 20, backgroundColor : '#F2F8FF',}}>
                        <Text style={{fontSize : 18, textAlign : 'justify',}}>test test test test test test test test test test test test test test test test test test test test test test ?</Text>
                    </View>
                    <View style={[styles.iconContentList, {paddingHorizontal : 25, paddingBottom : 4, marginTop : 15,}]}>
                        <View style={{flexDirection : 'row'}}>
                            <IonIcons name='star' style={[styles.starIcon, { color : '#FFC94D',}]}/>
                            <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>112 persons starred this</Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={{color : '#2E3A59', fontSize : 13,}}>36 comments</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.topLine}></View>
                    <View style={styles.iconContent}>
                        <View style={styles.iconContentList}>
                            <View></View>
                            <View>
                                <IonIcons name='star' style={[styles.starIcon, { color : '#FFC94D', display : 'none',}]}/>
                                <IonIcons name='star-outline'  style={[styles.starIcon, {textAlign : 'center', }]}/>
                                <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 12, display : 'none',}}>Starred</Text>
                                <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 12,}}>Star</Text>
                            </View>
                            <View>
                                <FaFa name='comment-dots' style={[styles.starIcon, {textAlign : 'center'}]}/>
                                <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 12,}}>Comment</Text>
                            </View>
                            <View></View>
                        </View>
                    </View>
                </View>                
            </ScrollView>
            <BottomSheet
                visible={bottomTabOpen}
                onBackButtonPress={()=>setBottomTabOpen(false)}
                onBackdropPress={()=>setBottomTabOpen(false)}
            >
                <View style={styles.bottomSheet}>
                    <Text>ashdghagshjd</Text>
                    <View style={styles.sheetTopBar}></View>
                </View>
            </BottomSheet>
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
        marginTop : 3,
    },
    quickText : {
        marginLeft : 10,
        paddingBottom : 5,
        fontWeight : 'bold',
        fontSize : 17,
        color : '#222B45',
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
        height : 0.6,
        backgroundColor : '#8F9BB3',
        marginLeft : '2%',
    },
    iconContent : {
        padding : 3,
        flex : 6,
        flexDirection : 'column',
    },
    iconContentList:{
        marginTop : 2,
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    starIcon : {
        fontSize : 18,
        color : '#2E3A59',
        textAlign : 'center',
    },
    userImage : {
        width : 45,
        height : 45,
        borderRadius : 45,
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
        height : 8,
        backgroundColor : '#222B45',
        position : 'absolute',
        top : 0,
        left : '55%',
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
    },
    bottomSheetOpenIcon : {
        fontSize : 30,
        marginTop : 4,
    }
})

export default UserHome;
