import React from 'react';
import {View, StyleSheet, FlatList, Text, ScrollView, TextInput} from 'react-native';

const ChangeUserData = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerFluid}>
                <Text style={styles.topText}>Personal Details</Text>
                <View style={styles.topBar}></View>
                <TextInput placeholder='Your Name' style={[styles.input, {marginTop : 10,}]}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#fff',
    },
    containerFluid : {
        marginHorizontal : '2%',
        width : '96%',
        marginTop : 20,
    },
    topBar : {
        width : '100%',
        height : 1,
        marginTop : 2,
        backgroundColor : '#2E3A59',
    },
    topText : {
        marginLeft : 10,
    },
    input : {
        width : '90%',
        padding : 3,
        fontSize : 16,
        backgroundColor : '#E4E9F2',
        marginLeft : '5%',
        borderWidth : 1,
        borderColor : 'red',
    }
})

export default ChangeUserData;
