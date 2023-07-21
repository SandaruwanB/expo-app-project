import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Image, TouchableWithoutFeedback} from 'react-native';
import * as SecureStorage from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { BottomSheet } from 'react-native-btr';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FaFa from 'react-native-vector-icons/FontAwesome5';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import config from '../../apiConfig'

const UserHome = () => {
    const [ user, setUser ] = useState("");
    const navigate = useNavigation();
    const [category, setCategory] = useState("Select the Category");
    const [bottomTabOpen, setBottomTabOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [postContent, setPostContent] = useState("");
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState([]);

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
        axios.get(`${config.uri}/posts`).then(res=>{
            setImage(res.data.result[1].post[0].image);
            setPosts(res.data.resultrs);
        });
    },[setPosts]);


    const quickPost = async ()=>{
        if(category === "Select the Category" && postContent === ""){
            alert("All Fields are Required");
        }
        else if(category === "Select the Category"){
            alert("Please Choose the Category");
        }
        else if(postContent === ""){
            alert("Post Body Cannot Empty");
        }
        else{
            await axios.post(`${config.uri}/quickPost`, {
                user : user,
                category : category,
                postContent : postContent,
            }).then(res=>{
                console.log(res.data);
            })
        }
    }
    
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
            <ScrollView style={{height : '100%', marginBottom : 200,}}>
                <View style={[styles.quickPost, ]}>
                    <Text style={[styles.quickText]}>Quick Post</Text>
                    <View style={[styles.categorySelection]}>
                        <TouchableWithoutFeedback style={{width : '100%', height : '100%',}} onPress={()=>setCategoryOpen(true)}>
                            <Text style={{paddingLeft : 3, color : '#2E3A59'}}>{category}</Text>
                        </TouchableWithoutFeedback>                         
                    </View>
                    <TextInput placeholder='Your Post' style={[styles.quickPostInput]} onChangeText={text=>setPostContent(text)} multiline={true} numberOfLines={3}/>
                    <TouchableOpacity style={styles.postbtn} onPress={()=>quickPost()}>
                        <Text style={styles.postBtnText}>Post</Text>
                    </TouchableOpacity>                    
                </View>

                <View style={{width : '100%', marginTop : 8, backgroundColor : '#fff'}}>
                    <View style={{width : '100%', paddingVertical : 10,}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', marginTop : 5, paddingHorizontal : 20}}>
                            <TouchableOpacity style={{flexDirection : 'row'}} onPress={()=>console.log(posts)}>
                                    <Image source={require('../../assets/images/defaultUser.png')} style={{width : 45, height : 45, borderRadius : 45,}}/>
                                    <View style={{marginLeft : 15, marginTop : 2}}>
                                        <Text style={{fontWeight : 'bold', fontSize : 16,}}>Chathuka Perera</Text>
                                        <Text style={{fontSize : 13}}>Graphic Designer</Text>
                                    </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setBottomTabOpen(true)}>
                                <MatIcons name='dots-vertical' style={{fontSize : 35, marginTop : 5,}}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{paddingVertical : 8, marginLeft : 5, paddingHorizontal : 15, marginTop : 10,}}>dasdhashj aghs adsh</Text>
                        <Image  source={{uri : `data:image/png;base64,${image}`}} style={{height : 300, width : '100%'}}/>
                        <View style={{paddingVertical : 10, flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 20,}}>
                            <View style={{flexDirection : 'row'}}>
                                <IonIcons name='star' style={{color : '#FFC94D', fontSize : 16, }}/>
                                <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>116 persons starred</Text>
                            </View> 
                            <View>
                                <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>35. comments</Text>
                            </View>
                        </View>
                        <View style={{paddingHorizontal : 12,}}>
                            <View style={{width : '100%', height : 0.9, backgroundColor : '#2E3A59', marginTop : 10,}}></View>
                            <View style={{flexDirection : 'row', justifyContent : 'space-between',  paddingVertical : 10,}}>
                                <View></View>
                                <View>
                                    <IonIcons name='star' style={{ color : '#FFC94D', display : 'none', fontSize : 16}}/>
                                    <IonIcons name='star-outline'  style={{textAlign : 'center', fontSize : 16 }}/>
                                    <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13, display : 'none',}}>Starred</Text>
                                    <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13,}}>Star</Text>
                                </View>
                                <View>
                                    <FaFa name='comment-dots' style={{textAlign : 'center', fontSize : 16}}/>
                                    <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13,}}>Comment</Text>
                                </View>
                                <View></View>
                            </View>
                        </View>                        
                    </View>
                </View> 
                <View style={{width : '100%', marginTop : 8, backgroundColor : '#fff'}}>
                    <View style={{width : '100%', paddingVertical : 10,}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', marginTop : 5, paddingHorizontal : 20}}>
                            <TouchableOpacity style={{flexDirection : 'row'}}>
                                    <Image source={require('../../assets/images/defaultUser.png')} style={{width : 45, height : 45, borderRadius : 45,}}/>
                                    <View style={{marginLeft : 15, marginTop : 2}}>
                                        <Text style={{fontWeight : 'bold', fontSize : 16,}}>Sandaruwan Bandara</Text>
                                        <Text style={{fontSize : 13}}>Software Engineer</Text>
                                    </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setBottomTabOpen(true)}>
                                <MatIcons name='dots-vertical' style={{fontSize : 35, marginTop : 5,}}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{paddingVertical : 8, marginLeft : 5, paddingHorizontal : 15, marginTop : 10,}}>dasdhashj aghs adsh</Text>
                        <View style={{padding : 20, backgroundColor : '#F2F8FF',}}>
                            <Text style={{fontSize : 18, textAlign : 'justify',}}>test test test test test test test test test test test test test test test test test test test test test test ?</Text>
                        </View>
                        <View style={{paddingVertical : 10, flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 20,}}>
                            <View style={{flexDirection : 'row'}}>
                                <IonIcons name='star' style={{color : '#FFC94D', fontSize : 16, }}/>
                                <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>516 persons starred</Text>
                            </View> 
                            <View>
                                <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>335. comments</Text>
                            </View>
                        </View>
                        <View style={{paddingHorizontal : 12,}}>
                            <View style={{width : '100%', height : 0.9, backgroundColor : '#2E3A59', marginTop : 10,}}></View>
                            <View style={{flexDirection : 'row', justifyContent : 'space-between',  paddingVertical : 10,}}>
                                <View></View>
                                <View>
                                    <IonIcons name='star' style={{ color : '#FFC94D', display : 'none', fontSize : 16}}/>
                                    <IonIcons name='star-outline'  style={{textAlign : 'center', fontSize : 16 }}/>
                                    <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13, display : 'none',}}>Starred</Text>
                                    <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13,}}>Star</Text>
                                </View>
                                <View>
                                    <FaFa name='comment-dots' style={{textAlign : 'center', fontSize : 16}}/>
                                    <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13,}}>Comment</Text>
                                </View>
                                <View></View>
                            </View>
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
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '37%', padding : 8,}}>
                            <IonIcon name='md-open' style={{fontSize : 18,}}/>
                            <Text>View Post</Text>
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
                    <View style={styles.sheetTopBar} ></View>
                    <TouchableWithoutFeedback style={{width : '40%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 10,}}>
                            <FaFa name='plus' style={{fontSize : 18,}}/>
                            <Text>Computer Technology</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '40%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 10,}}>
                            <FaFa name='plus' style={{fontSize : 18,}}/>
                            <Text>Business Management</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '40%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 10,}}>
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
    categorySelection : {
        paddingVertical : 7,
        paddingHorizontal : 5,
        backgroundColor : '#D9E4FF',
        marginBottom : 10,
        borderRadius : 5,
    },
    errorInput : {
        borderWidth : 1,
        borderColor : 'red',
    }
})

export default UserHome;
