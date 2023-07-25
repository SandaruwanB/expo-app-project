import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Image} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FaFa from 'react-native-vector-icons/FontAwesome5'
import { BottomSheet } from 'react-native-btr'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import * as SecureStorage from 'expo-secure-store'
import config from '../../apiConfig'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Post = () => {
    const navigate = useNavigation();
    const [category, setCategory] = useState("Select the Category");
    const [changeCategory, setChangeCategory] = useState(false);
    const [image,setImage] = useState("");
    const [textPost, setTextPost] = useState("");
    const [postHeading, setPostHeading] = useState("");
    const [user,setUser] = useState("");
    const [textInput, setTextInput] = useState(false);

    const getToken = async () =>{
        try {
            const result = await SecureStorage.getItemAsync('auth');
            setUser(result);
        } catch (error) {
            console.log(error);
        }
    }
    getToken();

    const pickImageAsync = async ()=>{
        setTextPost("");
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            quality : 1,
            base64 : true,
            allowsEditing : true,
            aspect : [4,3]
        });
        if(!result.canceled){
            setImage(result.assets[0].base64);
        }
        else{
            console.log("canceled");
        }
    }

    const pickerCameraImageAsync = async ()=>{
        setTextPost("");
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            quality : 1,
            base64 : true,
            allowsEditing : true,
            aspect : [4,3]
        });
        if(!result.canceled){
            setImage(result.assets[0].base64);
        }
        else{
            console.log("canceled");
        }
    }

    const post = async ()=>{
        if(category === "Select the Category" || postHeading === ""){
            alert("You Missed Some Required Data");
        }
        else if(image === "" && textPost === ""){
            alert("You Missed the Post Body")
        }
        else{
            await axios.post(`${config.uri}/post`, { 
                image : image,
                user : user,
                category : category,
                postHeading : postHeading,
                textPost : textPost,
            }).then(res=>{
                console.log(res.data);
            })
        }
    }

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.topbar}>
                    <View style={{marginLeft : '5%',}}>
                        <Icon name='close' style={styles.closeBtn} onPress={()=>{setImage("");setCategory("Select the Category");setPostHeading("");setTextInput(false);setTextPost("");navigate.goBack();}}/>
                    </View>
                    <View style={{marginLeft: '57%',}}>
                        <TouchableOpacity style={styles.postBtn} onPress={()=>post()}>
                            <Text style={{color : '#fff', fontSize : 16}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width : '92%', marginLeft : '4%', backgroundColor : '#D9E4FF', padding : 10, paddingVertical : 12, borderRadius : 5,}}>
                    <TouchableWithoutFeedback style={{width : '100%'}} onPress={()=>setChangeCategory(true)}>
                        <Text style={styles.placeholderStyle}>{category}</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[{width : '100%'}, image !== "" || textInput === true ? {height : '10%'} : {height : '30%'}]}>
                    <TextInput numberOfLines={2} multiline={true} placeholder='What do you want to share about?' value={postHeading} style={styles.postHeadingInput} onChangeText={text=>setPostHeading(text)}/>
                </View>

                {
                    image !== "" ? 
                    <View style={{width : '100%', height : '40%', marginTop : 20, paddingHorizontal : 20, position : 'relative'}}>
                        <Image source={{uri : `data:image/png;base64,${image}`}} style={{width : '100%', height : '90%',borderRadius : 5,}}/>
                        <Icon name='close' style={{backgroundColor : '#fff', position : 'absolute', top : 15, right : 35, borderRadius : 15, padding : 3, fontSize : 15, color : 'red'}} onPress={()=>setImage("")}/>
                    </View> : ""
                }
                {
                    textInput ?
                        <View style={{width : '100%', height : '40%', marginTop : 20}}>
                            <TextInput numberOfLines={2} multiline={true} placeholder='Enter Text Post Here?' value={textPost} style={styles.postHeadingInput} onChangeText={text=>setTextPost(text)}/>
                        </View>   
                    : ""
                }

                <View style={styles.inputContent}>
                    <View style={styles.contnetInputs}>
                        <TouchableOpacity style={styles.contentMid} onPress={()=>{pickImageAsync(); setTextInput(false); setTextPost("")}}>
                            <Icon name='image' style={[styles.closeBtn, {textAlign : 'center', color : '#3366FF'}]}/>
                            <Text style={{textAlign : 'center', marginTop : 5,}}>Add Image</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contnetInputs}>
                        <TouchableOpacity style={styles.contentMid} onPress={()=>{setTextInput(true); setImage("")}}>
                            <Icon name='text' style={[styles.closeBtn, {textAlign : 'center', color : '#3366FF'}]}/>
                            <Text style={{textAlign : 'center', marginTop : 5,}}>Add Text</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contnetInputs}>
                        <TouchableOpacity style={styles.contentMid} onPress={()=>{pickerCameraImageAsync(); setTextInput(false); setTextPost("")}}>
                            <Icon name='camera' style={[styles.closeBtn, {textAlign : 'center', color : '#3366FF'}]}/>
                            <Text style={{textAlign : 'center', marginTop : 5,}}>Open Camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <BottomSheet
                visible={changeCategory}
                onBackButtonPress={()=>setChangeCategory(false)}
                onBackdropPress={()=>setChangeCategory(false)}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.sheetTopBar} ></View>
                    <TouchableWithoutFeedback style={{width : '40%',}} onPress={()=>{setCategory("computer technology");setChangeCategory(false);}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 10,}}>
                            <FaFa name='plus' style={{fontSize : 18,}}/>
                            <Text>Computer Technology</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '40%',}} onPress={()=>{setCategory("business management");setChangeCategory(false);}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 10,}}>
                            <FaFa name='plus' style={{fontSize : 18,}}/>
                            <Text>Business Management</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '40%',}} onPress={()=>{setCategory("ai inergration");setChangeCategory(false);}}>
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
    header : {
        position : 'absolute',
        top : 0,
        left : 0,
        width : '100%',
        height : height,
        backgroundColor : '#fff',
    },
    topbar : {
        marginTop : 50,
        width : '100%',
        height : 70,
        flexDirection : 'row',
        padding : 10,
    },
    closeBtn : {
        fontSize : 30,
    },
    postBtn : {
        padding : 7,
        backgroundColor : '#3366FF',
        paddingLeft : 20,
        paddingRight : 20,
        borderRadius : 5,
    },
    postHeadingInput : {
        width : '92%',
        backgroundColor : '#D9E4FF',
        marginLeft : '4%',
        height : '90%',
        padding : 15,
        marginTop : 10,
        textAlignVertical : 'top',
        borderRadius : 7,
        paddingBottom : 0,
    },
    dropdown: {
        height: 50,
        backgroundColor: '#D9E4FF',
        borderRadius: 5,
        padding: 15,
    },
    placeholderStyle: {
        fontSize: 16,
        color : '#2E3A59',
    },
    dropdownItem : {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText : {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle : {
        color : 'rgba(143, 155, 139, 0.9)',
        fontSize : 14,
    },
    inputSearchStyle : {
        fontSize : 14,
        borderRadius : 10,
        height : '100%',
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
    },
    inputContent : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 30,
    },
    contnetInputs : {
        backgroundColor : '#D9E4FF',
        borderRadius : 5,
    },
    contentMid : {
        flexDirection : 'column',
        justifyContent : 'center',
        padding : 15,
    }
})

export default Post;
