import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Divider} from 'react-native-paper'
import config from '../../../apiConfig'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FaFa from 'react-native-vector-icons/FontAwesome5'



const Posts = ({route}) => {
    const {user} = route.params;
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        axios.get(`${config.uri}/getpost/`+user).then(res=>{
            setPosts(res.data.posts);
        })
    })


    return (
        <View>
            <ScrollView>
                <View>
                    <Text>Total {posts.length} Posts are Awailable</Text>
                </View>
            {posts.length > 0 ? 
                posts.map((post)=>{
                    return (
                        <View style={{width : '100%', backgroundColor : '#F2F8FF'}} key={post.post[0]._id}>
                                {post.post[0].image ?
                                    <View style={{width : '100%', paddingVertical : 10,}}>
                                        <View style={{width : '100%'}}>
                                            <View style={{paddingHorizontal : 20}}>
                                                <Text>{post.post[0].category}</Text>
                                                <Text>{(post.postDate).substring(0,post.postDate.indexOf('T'))}</Text>
                                            </View>
                                        </View>
                                        <Text style={{paddingVertical : 8, marginLeft : 5, paddingHorizontal : 15, marginTop : 10,}}>{post.post[0].title}</Text>
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
                                    
                                    <View style={{width : '100%', paddingVertical : 10, marginTop : 10}}>
                                        <View style={{width : '100%'}}>
                                            <View style={{paddingHorizontal : 20}}>
                                                <Text>{post.post[0].category}</Text>
                                                <Text>{(post.postDate).substring(0,post.postDate.indexOf('T'))}</Text>
                                            </View>
                                        </View>
                                        {post.post[0].title ? <Text style={{paddingVertical : 8, marginLeft : 5, paddingHorizontal : 15, marginTop : 10,}}>{post.post[0].title}</Text> : ""}
                                        
                                        <View style={[{padding : 20, backgroundColor : '#94CBFF'},post.post[0].title ? "" : {marginTop : 10}]}>
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
                    );
                })
            :
                ""
            }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Posts;
