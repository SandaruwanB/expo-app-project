import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';
import {Text, Divider} from 'react-native-paper'
import {BottomSheet} from 'react-native-btr'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStorage from 'expo-secure-store'
import config from '../../apiConfig' 
import FaFa from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SetPost = () => {
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [token, setToken] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [image,setImage] = useState("");
    const [textInput, setTextInput] = useState(false);
    const [postHeading, setPostHeading] = useState("");
    const [textPost, setTextPost] = useState("");

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
        axios.get(`${config.uri}/getcategory`).then(res=>{
            setCategories(res.data.category);
        })
    },[setCategories])

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
            console.log(token);
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
            alert("You Missed Some Required Fields");
        }
        else if(image === "" && textPost === ""){
            alert("You Missed the Post Body")
        }
        else{
            await axios.post(`${config.uri}/post`, { 
                image : image,
                user : token,
                category : category,
                postHeading : postHeading,
                textPost : textPost,
            }).then(res=>{
                console.log(res.data);
            })
        }
    }

    return (
        <View style={{marginTop : 10}}>
            <View style={styles.header}>
                <View style={{width : '92%', marginLeft : '4%', backgroundColor : '#D9E4FF', padding : 10, paddingVertical : 12, borderRadius : 5,}}>
                    <TouchableOpacity style={{width : '100%'}} onPress={()=>setBottomSheetOpen(true)}>
                        <Text style={styles.placeholderStyle}>{category == "" ? "Choose Category" : category}</Text>
                    </TouchableOpacity>
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
                <View style={styles.topbar}>
                    <View style={{marginLeft: '60%',}}>
                        <TouchableOpacity style={styles.postBtn} onPress={()=>post()}>
                            <Text style={{color : '#fff', fontSize : 16}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <BottomSheet
                visible={bottomSheetOpen}
                onBackButtonPress={()=>setBottomSheetOpen(false)}
                onBackdropPress={()=>setBottomSheetOpen(false)}
            >
                <View style={[styles.bottomSheet, {maxHeight : 400}]}>
                    <View style={styles.sheetTopBar}></View>
                    <View style={{marginTop : 20}}></View>
                    <ScrollView>
                        {categories.length > 0 ? 
                            categories.map((value)=>{
                                return (
                                    <View key={value._id}>
                                        <TouchableOpacity style={{width : '100%', marginBottom : 10}} onPress={()=>{setCategory(value.name); setBottomSheetOpen(false)}}>
                                            <View style={{display: 'flex', flexDirection : 'row'}}>
                                                <FaFa name={'plus'} size={15} style={{paddingEnd : 20, paddingTop: 4,}}/>
                                                <Text style={{fontSize : 16}}>{value.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <Divider />
                                    </View>
                                );
                            })
                            : 
                            ""
                        }
                    </ScrollView>
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
        marginTop : 10,
        width : '100%',
        height : 70,
        flexDirection : 'row',
        padding : 10,
    },
    bottomSheet :{
        width : '100%',
        paddingHorizontal : 50,
        paddingVertical :20,
        backgroundColor : '#fff',
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        position : 'relative',
    },
    postBtn : {
        padding : 12,
        backgroundColor : '#3366FF',
        paddingLeft : 50,
        paddingRight : 50,
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
    placeholderStyle : {
        color : 'rgba(143, 155, 139, 0.9)',
        fontSize : 14,
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
    },
    categorySelection : {
        paddingVertical : 7,
        paddingHorizontal : 5,
        backgroundColor : '#D9E4FF',
        marginBottom : 10,
        borderRadius : 5,
    },
    closeBtn : {
        fontSize : 30,
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

export default SetPost;
