import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dropdown } from 'react-native-element-dropdown'

const Post = () => {
    const navigate = useNavigation();
    const [category, setCategory] = useState("");

    const data = [
        { label: "PUCIT", value: "pucit" },
        { label: "UCP", value: "ucp" },
        { label: "UET", value: "uet" },
    ];

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
                <View style={{width : '96%', marginLeft : '2%',}}>
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
        marginTop : 10,
    },
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
    },
    placeholderStyle: {
        fontSize: 16,
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
