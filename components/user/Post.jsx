import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Post = () => {
    return (
        <View>
            <View style={styles.header}>
                <View style={styles.topbar}>
                    <View style={{marginLeft : '5%',}}>
                        <Icon name='close' style={styles.closeBtn}/>
                    </View>
                    <View style={{marginLeft: '57%',}}>
                        <TouchableOpacity style={styles.postBtn}>
                            <Text style={{color : '#fff',}}>Post</Text>
                        </TouchableOpacity>
                    </View>
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
        height : 100,
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
        padding : 5,
        backgroundColor : '#3366FF',
        paddingLeft : 20,
        paddingRight : 20,
        borderRadius : 5,
    }
})

export default Post;
