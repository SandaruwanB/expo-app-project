import React, { useEffect, useState } from 'react'
import {View, StyleSheet, ScrollView, Text, Touchable, TouchableOpacity} from 'react-native'
import * as SecureStorage from 'expo-secure-store'
import { Dropdown } from 'react-native-element-dropdown'
import config from '../../../apiConfig'
import axios from 'axios'

const ChangeCategory = () => {
    const [user, setUser] = useState("");
    const [category, setCategory] = useState([]);
    const [cdata, setCData] = useState([]);
    const [userCategory, setUserCategory] = useState([]);

    const getToken = async () =>{
        try {
            const result = await SecureStorage.getItemAsync('auth');
            setUser(result);
        } catch (error) {
            console.log(error);
        }
    }
    getToken();

    useEffect(()=>{
        axios.get(`${config.uri}/getcategory`).then(res=>{
            setCData(res.data.category);
        });
        axios.post(`${config.uri}/getusercategory`, {
            email : user,
        }).then(res=>{
            if(res.data.result === "notFound"){
            }
            else{
                setUserCategory(res.data);
            }
        });
    }, [setCData, setUserCategory]);


    const setCategories = (item)=>{
        //console.log(item.name);
        setCategory(category.push(item.name));
        console.log(category);
    }


    return (
        <View>
            <View style={{width : '96%', marginLeft : '2%',}}>
                <Dropdown
                    style={styles.dropdown}
                    placeholder='Choose Categories?'
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={cdata}
                    search
                    onChange={ item => setCategories(item)}
                    maxHeight={300}
                    labelField="name"
                    valueField="name"
                    searchPlaceholder="Search...."
                    //value={category}
                />
            </View>
            <View style={{paddingHorizontal : 20, marginTop : 10,}}>
                {
                    userCategory.length === 0 && category.length === 0 ? 
                        <Text style={{backgroundColor : 'rgba(0, 149, 255, 0.24)', textAlign : 'center', padding: 12, borderRadius : 4,}}>You didn't choose your category</Text>
                    : 
                        ""
                }
                {
                    category.length === 0 ? 
                        "" 
                    : 
                        <View style={{alignItems : 'center',}}>
                            <TouchableOpacity style={styles.saveBtn}>
                                <Text style={{textAlign : 'center', color : '#fff',}}>Save</Text>
                            </TouchableOpacity>
                        </View>
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        height : '100%',
        width : '100%',
        backgroundColor : '#fff',
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
    inputSearchStyle : {
        fontSize : 14,
        borderRadius : 10,
    },
    saveBtn : {
        padding : 8,
        backgroundColor : '#3366FF',
        width : '35%',
        borderRadius : 10,
    }
})

export default ChangeCategory;
