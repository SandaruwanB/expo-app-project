import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'react-native-paper'
import {BottomSheet} from 'react-native-btr'
import axios from 'axios'
import apiConfig from '../../apiConfig' 

const SetPost = () => {
    const [bottomSheetOpen, setBottomSheetOpen] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        axios.get(`${apiConfig.uri}/getcategory`).then(res=>{
            setCategories(res.data.category);
        })
    },[setCategories])

    return (
        <View>
            <Text>Set Post</Text>

            <BottomSheet
                visible={bottomSheetOpen}
                onBackButtonPress={()=>setBottomSheetOpen(false)}
                onBackdropPress={()=>setBottomSheetOpen(false)}
            >
                <View style={[styles.bottomSheet, {maxHeight : 400}]}>
                    <View style={styles.sheetTopBar}></View>
                    <View style={{marginTop : 20}}></View>
                    <ScrollView>

                    </ScrollView>
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomSheet :{
        width : '100%',
        paddingHorizontal : 50,
        paddingVertical :20,
        backgroundColor : '#fff',
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        position : 'relative',
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
