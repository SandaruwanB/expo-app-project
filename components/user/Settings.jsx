import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const Settings = () => {
    const {width, height} = Dimensions.get('window');

    return (
        <View style={[styles.container, {maxWidth : width, maxHeight : height}]}>
            <TouchableOpacity style={styles.signOut}>
                <Icon name='right' style={styles.signOutIcon}/>
                <Text style={styles.signOutText}>Change Category</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signOut}>
                <Icon name='right' style={styles.signOutIcon}/>
                <Text style={styles.signOutText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.signOut}>
                <Icon name='logout' style={styles.signOutIcon}/>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>     
        </View>
    );
}

const styles = StyleSheet.create({
    container : {

    }, 
    signOut : {
        width : '100%',
        padding : 12,
        position : 'relative',
        backgroundColor : '#fff',
        borderBottomColor : '#8F9BB3',
        borderBottomWidth : 1,
    },
    signOutIcon : {
        position : 'absolute',
        right : 20,
        top : 15,
        fontSize : 15,
    },
    signOutText : {
        marginLeft : 10,
        fontSize : 14,
    }
});

export default Settings;
