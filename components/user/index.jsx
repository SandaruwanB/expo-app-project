import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, RefreshControl} from 'react-native';
import {Text, Card, Divider} from 'react-native-paper'
import {BottomSheet} from 'react-native-btr'
import FaFa from 'react-native-vector-icons/FontAwesome5'
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import * as SecureStorage from 'expo-secure-store'
import axios from 'axios'
import config from '../../apiConfig'

const Index = () => {
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
    const [opendBottomSheetPost, setOpendBottomSheetPost] = useState("");
    const [category, setCategory] = useState("");
    const [postBody, setPostBody] = useState("");
    const [token, setToken] = useState("");
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [categoris, setCagories] = useState([]);


    const getToken = async () =>{
        try {
            const result = await SecureStorage.getItemAsync('auth');
            setToken(result);
        } catch (error) {
            console.log(error);
        }
    }
    getToken();

    useEffect(()=>{
        axios.get(`${config.uri}/posts`).then(res=>{
            setPosts(res.data.posts);
            setUsers(res.data.users);
        },[setUsers,setPosts,setCagories]);
    });

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            axios.get(`${config.uri}/posts`).then(res=>{
                setPosts(res.data.posts);
                setUsers(res.data.users);
                setPostBody("");
            });
            setRefreshing(false);
        }, 2000);
    }, [setRefreshing, setPosts, setUsers, setPostBody]);


    const setUserNamesEtc = (userid, date)=>{
        const index = users.findIndex((item, i)=>{
            return item.id === userid;
        });
        const day = date.substring(0, date.indexOf('T'));
        return (
            <View style={{flexDirection: 'row'}}>
                <Image source={require('../../assets/images/defaultUser.png')} style={{width : 50, height : 50, borderRadius : 50, paddingTop: 50 }}/>
                <View style={{marginLeft : 15, marginTop : 2}}>
                    <TouchableOpacity key={userid}>
                        <Text style={{fontWeight : 'bold', fontSize : 15}}>{users.length > 0 ? users[index].name : ""}</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize : 12}}>{users.length > 0 ? users[index].jobTitle ? users[index].jobTitle : '@'+userid : ""}</Text>
                    <Text style={{fontSize : 12}}>{day}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={{backgroundColor : '#8F9BB3'}}>
            <ScrollView style={{height : '100%', marginBottom : 200,}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {(posts.length) > 0 ? 
            <View>
                <Card style={{backgroundColor: '#F2F8FF', borderRadius: 0, marginTop: 10,}}>
                    <Card.Content>
                        <Card.Title
                            title="Quick Post"                            
                        />
                        <TouchableWithoutFeedback onPress={()=>setBottomSheetOpen(true)}>
                            <View style={styles.textInput}>
                                <Text>{category == "" ? "Choose Category" : category}</Text>
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

                {
                    posts.map((post)=>{
                        return <View style={{width : '100%', marginTop : 12, backgroundColor : '#F2F8FF'}} key={post.post[0]._id}>
                                {post.post[0].image ?
                                    <View style={{width : '100%', paddingVertical : 10,}}>
                                        <View style={{width : '100%'}}>
                                            <View style={{flexDirection: 'row', justifyContent : 'space-between', paddingHorizontal: 15}}>
                                                {setUserNamesEtc(post.userid, post.postDate)}
                                                <View>
                                                    <TouchableOpacity key={post.post[0]._id} onPress={(e)=>setOpendBottomSheetPost(post.post[0]._id)}>
                                                        <MatIcons name='dots-vertical' style={{fontSize : 35, marginTop : 5,}}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={{paddingVertical : 8, marginLeft : 5, paddingHorizontal : 15, marginTop : 10,}}>dsajas asdhgash asdjhgasjd asdhashd</Text>
                                        <Image  source={{uri : `data:image/png;base64,${post.post[0].image}`}} style={{height : 300, width : '100%'}}/>
                                        <View style={{paddingVertical : 10, flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 20,}}>
                                            <View style={{flexDirection : 'row'}}>
                                                <IonIcons name='star' style={{color : '#FFC94D', fontSize : 16, }}/>
                                                <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>10 persons starred</Text>
                                            </View> 
                                            <View>
                                                <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>1 comments</Text>
                                            </View>
                                        </View>
                                        <Divider/>
                                        <View style={{paddingHorizontal : 12,}}>
                                            <View style={{flexDirection : 'row', justifyContent : 'space-between',  paddingVertical : 10,}}>
                                                <View></View>
                                                <View>
                                                    <TouchableOpacity>
                                                        <IonIcons name='star' style={{ color : '#FFC94D', display : 'none', fontSize : 16}}/>
                                                        <IonIcons name='star-outline'  style={{textAlign : 'center', fontSize : 16 }}/>
                                                        <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13, display : 'none',}}></Text>
                                                        <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13,}}>Star</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <TouchableOpacity>
                                                    <FaFa name='comment-dots' style={{textAlign : 'center', fontSize : 16}}/>
                                                    <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13,}}>Comment</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View></View>
                                            </View>
                                        </View>
                                    </View>
                                
                                    : 
                                    <View style={{width : '100%', paddingVertical : 10,}}>
                                        <View style={{width : '100%'}}>
                                            <View style={{flexDirection: 'row', justifyContent : 'space-between', paddingHorizontal: 15}}>
                                                {setUserNamesEtc(post.userid, post.postDate)}
                                                <View>
                                                    <TouchableOpacity key={post.post[0]._id} onPress={(e)=>setOpendBottomSheetPost(post.post[0]._id)}>
                                                        <MatIcons name='dots-vertical' style={{fontSize : 35, marginTop : 5,}}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={{paddingVertical : 8, marginLeft : 5, paddingHorizontal : 15, marginTop : 10,}}>asdsadsa sadasd</Text>
                                        <View style={[{padding : 20, backgroundColor : '#94CBFF',}]}>
                                            <Text style={{fontSize : 18, textAlign : 'justify',}}>asdasghd sadashd sahdgh asdgsajd sagdj</Text>
                                        </View>
                                        <View style={{paddingVertical : 10, flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 20,}}>
                                            <View style={{flexDirection : 'row'}}>
                                                <IonIcons name='star' style={{color : '#FFC94D', fontSize : 16, }}/>
                                                <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>10 persons starred</Text>
                                            </View> 
                                            <View>
                                                <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>1 comments</Text>
                                            </View>
                                        </View>
                                        <Divider/>
                                        <View style={{paddingHorizontal : 12,}}>
                                            <View style={{flexDirection : 'row', justifyContent : 'space-between',  paddingVertical : 10,}}>
                                                <View></View>
                                                <View>
                                                    <TouchableOpacity>
                                                        <IonIcons name='star' style={{ color : '#FFC94D', display : 'none', fontSize : 16}}/>
                                                        <IonIcons name='star-outline'  style={{textAlign : 'center', fontSize : 16 }}/>
                                                        <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13, display : 'none',}}></Text>
                                                        <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13,}}>Star</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <TouchableOpacity>
                                                    <FaFa name='comment-dots' style={{textAlign : 'center', fontSize : 16}}/>
                                                    <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13,}}>Comment</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View></View>
                                            </View>
                                        </View>
                                    </View>

                                }
                            </View>
                    })
                }
                </View>
            : "" }
                </ScrollView>
            <BottomSheet
                visible={bottomSheetOpen}
                onBackButtonPress={()=>setBottomSheetOpen(false)}
                onBackdropPress={()=>setBottomSheetOpen(false)}
            >
                <View style={[styles.bottomSheet, {maxHeight : 400}]}>
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
