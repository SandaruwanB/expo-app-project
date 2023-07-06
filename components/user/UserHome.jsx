import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Image, TouchableWithoutFeedback} from 'react-native';
import * as SecureStorage from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { BottomSheet } from 'react-native-btr';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FaFa from 'react-native-vector-icons/FontAwesome5';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';

const UserHome = () => {
    const [ user, setUser ] = useState("");
    const navigate = useNavigation();
    const [category, setCategory] = useState("Choose category?");
    const [bottomTabOpen, setBottomTabOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);

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
                <View style={[styles.quickPost, ]}>
                    <Text style={[styles.quickText, {paddingBottom : 10,}]}>Quick Post</Text>
                    <View style={styles.categorySelection}>
                        <TouchableWithoutFeedback style={{width : '100%', height : '100%'}} onPress={()=>setCategoryOpen(true)}>
                            <Text style={{paddingLeft : 3, color : '#2E3A59'}}>{category}</Text>
                        </TouchableWithoutFeedback>
                    </View> 
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
                    <View style={styles.sheetTopBar}></View>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '30%', padding : 8,}}>
                            <FaFa name='plus' style={{fontSize : 18,}}/>
                            <Text>Follow</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '41%', padding : 8,}}>
                            <MatirialIcon name='report' style={{fontSize : 18,}}/>
                            <Text>Report Post</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </BottomSheet>
            <BottomSheet
                visible={categoryOpen}
                onBackButtonPress={()=>setCategoryOpen(false)}
                onBackdropPress={()=>setCategoryOpen(false)}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.sheetTopBar}></View>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '63%', padding : 8,}}>
                            <FaFa name='plus' style={{fontSize : 18,}}/>
                            <Text>Computer Technology</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '65%', padding : 8,}}>
                            <FaFa name='plus' style={{fontSize : 18,}}/>
                            <Text>Business Management</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '46%', padding : 8,}}>
                            <FaFa name='plus' style={{fontSize : 18,}}/>
                            <Text>AI Intregration</Text>
                        </View>
                    </TouchableWithoutFeedback>
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
    },
    categorySelection : {
        paddingVertical : 7,
        paddingHorizontal : 5,
        backgroundColor : '#D9E4FF',
        marginBottom : 10,
        borderRadius : 5,
    }
})

export default UserHome;
