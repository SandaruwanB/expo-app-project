import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaFa from 'react-native-vector-icons/FontAwesome5';
import FaFaW from 'react-native-vector-icons/FontAwesome';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';

const Notifications = () => {
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView style={{marginBottom : 100,}}>
                <TouchableOpacity style={{flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 25, paddingVertical : 8, backgroundColor : 'rgba(51, 102, 255, 0.16)'}}>
                    <View>
                        <Image source={require('../../assets/images/defaultUser.png')} style={styles.image} />
                    </View>
                    <View style={{width : '80%', paddingLeft : 10,}}>
                        <Text style={{fontSize : 16, fontWeight : 'bold'}}>sandaruwan Bandara</Text>
                        <Text>Commented on your photo</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>setBottomSheetOpen(true)}>
                            <MatIcons name='dots-vertical' style={styles.bottomSheetOpenIcon}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View style={styles.line}></View>
            </ScrollView>
            <BottomSheet
                visible={bottomSheetOpen}
                onBackButtonPress={()=>setBottomSheetOpen(false)}
                onBackdropPress={()=>setBottomSheetOpen(false)}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.sheetTopBar}></View>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '32%', padding : 8,}}>
                            <MatIcons name='delete' style={{fontSize : 18,}}/>
                            <Text>Remove</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{width : '100%',}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '44%', padding : 8,}}>
                            <MatIcons name='read' style={{fontSize : 18,}}/>
                            <Text>Mark as Read</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </BottomSheet>
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
    }
})

export default Notifications;
