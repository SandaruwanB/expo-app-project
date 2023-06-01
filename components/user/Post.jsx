import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Post = () => {
    const navigate = useNavigation();

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
                <View style={{width : '100%',}}>
                    <TextInput numberOfLines={1} placeholder='What do you want to share?' style={styles.postHeadingInput}/>
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
        height : 110,
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
        width : '96%',
        backgroundColor : '#fff',
        marginLeft : '2%',
        padding : 15,
        borderRadius : 5,
    }
})

export default Post;
