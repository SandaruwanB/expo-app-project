import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Image} from 'react-native';
import * as SecureStorage from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FaFa from 'react-native-vector-icons/FontAwesome5';

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
                            <Image source={require('../../assets/images/defaultUser.png')} style={styles.userImage}/>
                            <View style={{marginLeft : 10,}}>
                                <Text style={{fontSize : 15, fontWeight : 'bold',}}>Kasun Nimantha</Text>
                                <Text style={{fontSize : 12, color : '#8F9BB3',}}>Software Engineer</Text>
                            </View>
                        </View>
                        <View style={{flexDirection : 'row', position : 'relative',}}>
                            <IonIcons name='add-sharp' style={{fontSize : 25, color : '#3366FF',}}/>
                            <Text style={{marginLeft : 6, fontSize : 15, marginTop : 2, fontWeight : 'bold', color : '#3366FF'}}>Follow</Text>
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
                            <Text style={{color : '#2E3A59', fontSize : 13,}}>36 comments</Text>
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

                <View style={styles.content}>
                    <View style={[styles.iconContentList, { paddingHorizontal : 20, paddingBottom : 15, paddingTop : 10,}]}>
                        <View style={{flexDirection : 'row', position : 'relative',}}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={styles.userImage}/>
                            <View style={{marginLeft : 10,}}>
                                <Text style={{fontSize : 15, fontWeight : 'bold',}}>Kasun Nimantha</Text>
                                <Text style={{fontSize : 12, color : '#8F9BB3',}}>Software Engineer</Text>
                            </View>
                        </View>
                        <View style={{flexDirection : 'row', position : 'relative',}}>
                            <IonIcons name='add-sharp' style={{fontSize : 25, color : '#3366FF',}}/>
                            <Text style={{marginLeft : 6, fontSize : 15, marginTop : 2, fontWeight : 'bold', color : '#3366FF'}}>Follow</Text>
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
                            <Text style={{color : '#2E3A59', fontSize : 13,}}>36 comments</Text>
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

                <View style={styles.content}>
                    <View style={[styles.iconContentList, { paddingHorizontal : 20, paddingBottom : 15, paddingTop : 10,}]}>
                        <View style={{flexDirection : 'row', position : 'relative',}}>
                            <Image source={require('../../assets/images/defaultUser.png')} style={styles.userImage}/>
                            <View style={{marginLeft : 10,}}>
                                <Text style={{fontSize : 15, fontWeight : 'bold',}}>Kasun Nimantha</Text>
                                <Text style={{fontSize : 12, color : '#8F9BB3',}}>Software Engineer</Text>
                            </View>
                        </View>
                        <View style={{flexDirection : 'row', position : 'relative',}}>
                            <IonIcons name='add-sharp' style={{fontSize : 25, color : '#3366FF',}}/>
                            <Text style={{marginLeft : 6, fontSize : 15, marginTop : 2, fontWeight : 'bold', color : '#3366FF'}}>Follow</Text>
                        </View>
                    </View>
                    <View style={{padding : 20, backgroundColor : '#F2F8FF',}}>
                        <Text style={{fontSize : 18, textAlign : 'center',}}>test test test test test test test test test test test test test test test test test test test test test test ?</Text>
                    </View>
                    <View style={[styles.iconContentList, {paddingHorizontal : 25, paddingBottom : 4, marginTop : 15,}]}>
                        <View style={{flexDirection : 'row'}}>
                            <IonIcons name='star' style={[styles.starIcon, { color : '#FFC94D',}]}/>
                            <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>112 persons starred this</Text>
                        </View>
                        <View>
                            <Text style={{color : '#2E3A59', fontSize : 13,}}>36 comments</Text>
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
    }
})

export default UserHome;
