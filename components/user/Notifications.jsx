import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

const Notifications = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={{marginBottom : 100,}}>
                <TouchableOpacity style={{flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 30, paddingVertical : 7, backgroundColor : 'rgba(51, 102, 255, 0.16)'}}>
                    <View>
                        <Image source={require('../../assets/images/defaultUser.png')} style={styles.image} />
                    </View>
                    <View style={{width : '80%',}}>
                        <Text>hhhgh ghjg hjg ghghg ashjhdajs asdhashdjas ashdasdjha aashdas asdhjagdasd asdha</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.line}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        height : '100%',
        width : '100%',
        backgroundColor : '#fff',
    },
    image : {
        width : 45,
        height : 45,
        borderRadius : 50,
    },
    line : {
        width : '100%',
        height : 0.8,
        backgroundColor : '#2E3A59',
    },
})

export default Notifications;
