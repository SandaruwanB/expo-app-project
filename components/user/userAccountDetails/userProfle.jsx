import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Text, Avatar, Card, List, Divider } from 'react-native-paper';
import axios from 'axios'
import config from '../../../apiConfig'
import MatIcons from 'react-native-vector-icons/MaterialIcons'
import FaFa from 'react-native-vector-icons/FontAwesome5'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import IonIcons from 'react-native-vector-icons/Ionicons'


const UserProfle = ({route}) => {
    const {userid} = route.params;
    const [userDetails, setUserDetails] = useState([]);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(()=>{
        axios.get(`${config.uri}/userdetails/:`+userid).then(res=>{
            setUserDetails(res.data.user);
            setUserPosts(res.data.posts);
        })
    },[setUserDetails,setUserPosts]);

    return (
        <View>
            <ScrollView>
                <View style={{backgroundColor : '#F2F8FF', paddingTop : 20}}>
                    <View style={{width : '100%', flex : 1, justifyContent : 'center', alignItems : 'center',}}>
                        <View>
                            <View>
                                {
                                    userDetails.image ? <Avatar.Image size={110} source={{uri : `data:image/jpeg;base64,${userDetails.image}`}}/> : <Avatar.Image size={110} source={require('../../../assets/images/defaultUser.png')}/>
                                }
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{textAlign : 'center', fontSize : 20}}>{userDetails.name}</Text>
                        { userDetails.jobTitle ? <Text style={{textAlign : 'center', fontSize : 15, marginTop : 2}}>{userDetails.jobTitle}</Text> : "" }
                        <Text style={{textAlign : 'center', fontSize : 12, marginTop : 2}}>@{userid}</Text>
                        <Text style={{textAlign : 'center', marginTop : 2, color : '#00B383'}}><MatIcons name={'verified-user'}/> Verified User</Text>
                    </View>
                    <View style={{flex : 1, }}>

                    </View>
                    <View style={{paddingHorizontal : 10,marginTop : 15,}}>
                        <Text style={{color : '#3366FF', fontSize : 14}}>Followed by {userDetails.email ? userDetails.followers.length : "0"} Members</Text>
                    </View>
                    <Card style={{backgroundColor : '#F2F8FF', borderRadius : 0, marginTop : 15}}>
                        <Card.Title 
                            title={"Personal Info"}
                        />
                        <Card.Content>
                            <List.Item
                                style={{paddingTop : 0}}
                                title={userDetails.name}
                                left={()=><MatIcons name='alternate-email' size={22} color={'#3366FF'}/>}
                            />
                            <List.Item 
                                style={{marginTop : 0, paddingTop : 0}}
                                title={userid}
                                left={()=><MatIcons name='email' size={22} color={'#3366FF'}/>}
                            />
                            {userDetails.contact ? 
                                <List.Item 
                                    style={{marginTop : 0, paddingTop : 0}}
                                    title={userDetails.contact}
                                    left={()=><MatIcons name='phone' size={22} color={'#3366FF'}/>}
                                /> : "" 
                            }
                            {userDetails.sex ? 
                                <List.Item 
                                    style={{marginTop : 0, paddingTop : 0}}
                                    title={'male'}
                                    left={()=><FoundationIcon name='torsos-male-female' size={22} color={'#3366FF'}/>}
                                /> : "" 
                            }
                            {userDetails.industry ?
                                <List.Item 
                                    style={{marginTop : 0, paddingTop : 0}}
                                    title={'Educational'}
                                    left={()=><FaFa name='industry' size={22} color={'#3366FF'}/>}
                                /> : ""
                            }
                        </Card.Content>
                    </Card>
                </View>
                <Card style={{ borderRadius : 0, marginTop : 20}}>
                    <Card.Title
                        style={{backgroundColor : '#F2F8FF'}}
                        title={"Posts"}
                    />
                    {userPosts.map((post)=>{
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
                    })}
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default UserProfle;
