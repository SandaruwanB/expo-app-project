import React, { useEffect, useState } from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import { Text, Divider, TextInput, Card, List } from 'react-native-paper';
import FaFa from 'react-native-vector-icons/FontAwesome5'
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import * as SecureStorage from 'expo-secure-store'
import axios from 'axios';
import config from '../../../apiConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const UserPost = ({route}) => {
    const navigate = useNavigation();
    const {postid} = route.params;
    const [token, setToken] = useState("");
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [comment, setComment] = useState("");

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
        axios.get(`${config.uri}/post/:`+postid).then(res=>{
            setPost(res.data.post);
            setUser(res.data.user);
        });
    },[setPost,setUser]);


    const addComment = async ()=>{
        if(comment === ""){}else{
            await axios.post(`${config.uri}/comment`, {
                post : post._id,
                comment : comment,
                by : token,
            }).then((res)=>{
                setComment("");
                console.log(res.data);
            })
        }
    }

    const setReactedOrNot = ()=>{
        const reactIndex = post.starred.find((value)=>{
            if( value === token){
                return true;
            }
            else{
                return false;
            }
        });

        return (
                <View>
                {
                    !reactIndex ?
                    <TouchableOpacity onPress={()=>addStar(postid)}>
                        <IonIcons name='star-outline'  style={{textAlign : 'center', fontSize : 16 }}/>
                        <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13,}}>Star</Text>
                    </TouchableOpacity>
                    
                    :
                    <TouchableOpacity onPress={()=>removeStar(postid)}>
                        <IonIcons name='star' style={{ color : '#FFC94D',fontSize : 16, textAlign : 'center'}}/>
                        <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 13,}}>Starred</Text>
                    </TouchableOpacity>
                    
                }
            </View>
        );
    }


    return (
            <View style={{flex : 1}}>
                <ScrollView style={{paddingBottom : 100}}>
                {
                    post.userid ? 
                    post.post[0].image ? 
                
                <View style={{width : '100%', paddingVertical : 10,}}>
                    <View style={{width : '100%'}}>
                        <View style={{flexDirection: 'row', justifyContent : 'space-between', paddingHorizontal: 15}}>
                            <View>
                                <View style={{flexDirection: 'row'}}>
                                    {
                                        user ? 
                                            <Image source={user.image ? {uri : `data:image/jpeg;base64,${user.image}`} : require('../../../assets/images/defaultUser.png')} style={{width : 50, height : 50, borderRadius : 50, paddingTop: 50 }}/>
                                        : ""

                                    }
                                    
                                    <View style={{marginLeft : 15, marginTop : 2}}>
                                        <TouchableOpacity onPress={()=>navigate.navigate('userProfile',{userid : token})}>
                                            <Text style={{fontWeight : 'bold', fontSize : 15}}>{user.name}</Text>
                                        </TouchableOpacity>
                                        <Text style={{fontSize : 12}}>{user.jobTitle ? user.jobTitle : '@'+token}</Text>
                                        <Text style={{fontSize : 12}}>{post.postDate}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={{paddingVertical : 8, marginLeft : 5, paddingHorizontal : 15, marginTop : 10,}}>asdasd</Text>
                    <Image  source={{uri : `data:image/png;base64,${post.post[0].image}`}} style={{height : 300, width : '100%'}}/>
                    <View style={{paddingVertical : 10, flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 20,}}>
                        <View style={{flexDirection : 'row'}}>
                            <IonIcons name='star' style={{color : '#FFC94D', fontSize : 16, }}/>
                            <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>{(post.starred).length} persons starred</Text>
                        </View> 
                        <View>
                            <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>{(post.comments).length} comments</Text>
                        </View>
                    </View>
                    <Divider/>
                    <View style={{paddingHorizontal : 12,}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between',  paddingVertical : 10,}}>
                            <View></View>
                            <View>
                                {setReactedOrNot()}
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
                            <View>
                                <View style={{flexDirection: 'row'}}>
                                    {
                                        user ? 
                                            <Image source={user.image ? {uri : `data:image/jpeg;base64,${user.image}`} : require('../../../assets/images/defaultUser.png')} style={{width : 50, height : 50, borderRadius : 50, paddingTop: 50 }}/>
                                        : ""

                                    }
                                    
                                    <View style={{marginLeft : 15, marginTop : 2}}>
                                        <TouchableOpacity onPress={()=>navigate.navigate('userProfile',{userid : token})}>
                                            <Text style={{fontWeight : 'bold', fontSize : 15}}>{user.name}</Text>
                                        </TouchableOpacity>
                                        <Text style={{fontSize : 12}}>{user.jobTitle ? user.jobTitle : '@'+token}</Text>
                                        <Text style={{fontSize : 12}}>{post.postDate}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {post.post[0].title ? <Text style={{paddingVertical : 8, marginLeft : 5, paddingHorizontal : 15, marginTop : 10,}}>{post.post[0].title}</Text> : ""}                      
                    <View style={[{padding : 20, backgroundColor : '#94CBFF'},]}>
                        <Text style={{fontSize : 18, textAlign : 'justify',}}>{post.post[0].text}</Text>
                    </View>
                    <View style={{paddingVertical : 10, flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 20,}}>
                        <View style={{flexDirection : 'row'}}>
                            <IonIcons name='star' style={{color : '#FFC94D', fontSize : 16, }}/>
                            <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>{(post.starred).length} persons starred</Text>
                        </View> 
                        <View>
                            <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>{(post.comments).length} comments</Text>
                        </View>
                    </View>
                    <Divider/>
                    <View style={{paddingHorizontal : 12,}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between',  paddingVertical : 10,}}>
                            <View></View>
                            <View>
                                {setReactedOrNot()}
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
            : "" }
            <View style={{backgroundColor : '#fff'}}>
                <Divider/>
                <View>
                    <List.Section style={{paddingHorizontal : 20}}>
                        <List.Subheader>Comments</List.Subheader>
                        {
                            (post.comments) ?
                                (post.comments).length > 0 ?
                                    (post.comments).map((comment)=>{
                                        return (
                                            <List.Item 
                                                title={comment.userName}
                                                description={comment.comment}
                                            />
                                        );
                                    })
                                :
                                <List.Item
                                    style={{backgroundColor: '#fff',paddingHorizontal : 20}}
                                    title={"No Comments Available"}
                                    left={()=><List.Icon icon={'progress-question'}/>}
                                />
                            : ""
                        }
                    </List.Section>
                </View>
            </View>
            </ScrollView>
            <View style={{position : 'absolute', bottom : 0,}}>
                <View style={{width : windowWidth, position : 'relative', flex : 1, flexDirection : 'row'}}>
                    <View style={{width : '85%'}}>
                        <TextInput value={comment} style={{backgroundColor : '#E4E9F2', paddingHorizontal : 20, width : '100%', height : 50,}} placeholder='Post Comment....' onChangeText={(text)=>setComment(text)}/>
                    </View>
                    <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : '#E4E9F2'}}>
                        <TouchableOpacity onPress={()=>addComment()}>
                            <MatIcons name='send' size={30} color={'#3366FF'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>    
    );

}

const styles = StyleSheet.create({})

export default UserPost;
