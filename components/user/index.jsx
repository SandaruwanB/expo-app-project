import React, { useState } from 'react';
import {View, StyleSheet, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image} from 'react-native';
import {Text, Card, Divider} from 'react-native-paper'
import {BottomSheet} from 'react-native-btr'
import FaFa from 'react-native-vector-icons/FontAwesome5'
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Index = () => {
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

    
    return (
        <View>
            <ScrollView>
                <Card style={{backgroundColor: '#fff', borderRadius: 0, marginTop: 10,}}>
                    <Card.Content>
                        <Card.Title
                            title="Quick Post"                            
                        />
                        <TouchableWithoutFeedback onPress={()=>setBottomSheetOpen(true)}> 
                            <View style={styles.textInput}>
                                <Text>Choose Category</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View>
                            <TextInput style={[styles.textInput,{marginTop: 10,textAlignVertical : 'top'}]} placeholder='Post Content' multiline={true} numberOfLines={4}/>
                        </View>
                        <View style={{marginTop: 10,}}>
                            <TouchableOpacity style={[styles.postBtn, {marginLeft : '70%'}]}>
                                <Text style={{textAlign: 'center', color : '#fff',}}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </Card.Content>
                </Card>
                <View style={{width : '100%', marginTop : 8, backgroundColor : '#fff'}}>
                    <View style={{width : '100%', paddingVertical : 10,}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', marginTop : 5, paddingHorizontal : 20}}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/defaultUser.png')} style={{width : 50, height : 50, borderRadius : 50, paddingTop: 50 }}/>
                                <View style={{marginLeft : 15, marginTop : 2}}>
                                    <TouchableOpacity>
                                        <Text style={{fontWeight : 'bold', fontSize : 15}}>Kasun Sandaruwan</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize : 12}}>Software Engineer</Text>
                                    <Text style={{fontSize : 12}}>21th May</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <MatIcons name='dots-vertical' style={{fontSize : 35, marginTop : 5,}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomSheet
                visible={bottomSheetOpen}
                onBackButtonPress={()=>setBottomSheetOpen(false)}
                onBackdropPress={()=>setBottomSheetOpen(false)}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.sheetTopBar}></View>
                    <View style={{marginTop : 20}}></View>
                    <ScrollView>
                        <TouchableOpacity style={{width : '100%', marginBottom : 20}}>
                            <View style={{display: 'flex', flexDirection : 'row'}}>
                                <FaFa name={'plus'} size={15} style={{paddingEnd : 20, paddingTop: 4,}}/>
                                <Text style={{fontSize : 16}}>Technology</Text>
                            </View>
                        </TouchableOpacity>
                        <Divider/>
                        <TouchableOpacity style={{width : '100%'}}>
                            <View style={{display: 'flex', flexDirection : 'row'}}>
                                <FaFa name={'plus'} size={15} style={{paddingEnd : 20, paddingTop: 4,}}/>
                                <Text style={{fontSize : 16}}>Technology</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput : {
        width : '100%',
        backgroundColor : '#E4E9F2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    postBtn : {
        backgroundColor : '#3366FF',
        width : 100,
        paddingHorizontal: 10,
        paddingVertical : 5,
        borderRadius : 5,
    },
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

export default Index;
