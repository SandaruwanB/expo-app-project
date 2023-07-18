import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FaFa from 'react-native-vector-icons/FontAwesome5';
import { BottomSheet } from 'react-native-btr';
import * as ImagePicker from 'expo-image-picker';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Post = () => {
    const navigate = useNavigation();
    const [category, setCategory] = useState("Select the Category");
    const [changeCategory, setChangeCategory] = useState(false);
    const [image,setImage] = useState([]);

    const pickImageAsync = async ()=>{
        /*const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }*/
        //setImage(null);
        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
          console.log(result.uri);
        }
    }

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.topbar}>
                    <View style={{marginLeft : '5%',}}>
                        <Icon name='close' style={styles.closeBtn} onPress={()=>navigate.goBack()}/>
                    </View>
                    <View style={{marginLeft: '57%',}}>
                        <TouchableOpacity style={styles.postBtn} onPress={pickImageAsync}>
                            <Text style={{color : '#fff', fontSize : 16}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width : '92%', marginLeft : '4%', backgroundColor : '#D9E4FF', padding : 10, paddingVertical : 12, borderRadius : 5,}}>
                    <TouchableWithoutFeedback style={{width : '100%'}} onPress={()=>setChangeCategory(true)}>
                        <Text style={styles.placeholderStyle}>{category}</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{width : '100%',}}>
                    <TextInput numberOfLines={2} multiline={true} placeholder='What do you want to share about?' style={styles.postHeadingInput}/>
                </View>
                <View style={{marginTop : 0,}}>
                    <Image source={{uri : image}} style={{ width: 400, height: 400 }}/>
                </View>
            </View>
            <BottomSheet
                visible={changeCategory}
                onBackButtonPress={()=>setChangeCategory(false)}
                onBackdropPress={()=>setChangeCategory(false)}
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
        padding : 15,
        marginTop : 10,
        textAlignVertical : 'top',
        height : '30%',
        borderRadius : 7,
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
})

export default Post;
