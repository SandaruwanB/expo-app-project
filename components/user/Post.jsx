import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BottomSheet } from 'react-native-btr';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Post = () => {
    const navigate = useNavigation();
    const [category, setCategory] = useState("Select the Category");
    const [changeCategory, setChangeCategory] = useState(false);

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.topbar}>
                    <View style={{marginLeft : '5%',}}>
                        <Icon name='close' style={styles.closeBtn} onPress={()=>navigate.goBack()}/>
                    </View>
                    <View style={{marginLeft: '57%',}}>
                        <TouchableOpacity style={styles.postBtn}>
                            <Text style={{color : '#fff', fontSize : 16}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width : '92%', marginLeft : '4%', backgroundColor : '#D9E4FF', padding : 10, paddingVertical : 12, borderRadius : 5,}}>
                    <TouchableWithoutFeedback style={{width : '100%'}}>
                        <Text style={styles.placeholderStyle}>{category}</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{width : '100%',}}>
                    <TextInput numberOfLines={2} multiline={true} placeholder='What do you want to share about?' style={styles.postHeadingInput}/>
                </View>
                
            </View>
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
        height : '50%',
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
    }
})

export default Post;
