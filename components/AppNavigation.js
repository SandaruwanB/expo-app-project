
import { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { Avatar, Title, Caption, Paragraph, Drawer, Text, Appbar } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as SecureStorage from 'expo-secure-store'
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MatIcons2 from 'react-native-vector-icons/MaterialIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FaFa5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import config, { uri } from '../apiConfig'

// common
import Home from './Home'
import Login from './Login'
import Register from './Register'
import EmailVerification from './EmailVerification'

// common user
import Index from './user/index'
import Search from './user/search'
import Followings from './user/followings'
import Messaging from './user/messaging'
import SetPost from './user/setPost'
import Notifications from './user/notifications'
import Settings from './user/accountControl/settings'
import Post from './user/accountControl/posts'
import Profile from './user/accountControl/profile'
import UserProfle from './user/userAccountDetails/userProfle'
import UserPost from './user/userAccountDetails/userPost';


function AppBarHeader (){
    const navigate = useNavigation();
    return (
        <Appbar.Header style={{width : '100%', justifyContent : 'space-between', paddingHorizontal : 20}}>
            <View>
                <TouchableOpacity onPress={()=>navigate.openDrawer()} style={{marginStart : 10,}}>
                    <Avatar.Image size={40} source={require('../assets/images/defaultUser.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{position : 'relative'}}>
                <TextInput style={{backgroundColor : '#E4E9F2', width : 220, padding : 4, borderRadius: 6, paddingLeft:30}} placeholder='Search...' onChangeText={(text)=>{navigate.navigate('search',{text : text})}}/>
                <IonIcons name={'search'} size={20} style={{position: 'absolute', top : 6, left: 4}}/>
            </View>
            <View>
                <TouchableOpacity onPress={()=>navigate.navigate('messaging')}>
                    <MatIcons name='android-messages' size={30} color={'#2E3A59'}/>
                </TouchableOpacity>
            </View>
        </Appbar.Header>
    );
}

function DrawerContent() {
    const navigate = useNavigation();
    const [userDetails,setUserDetails] = useState([]);
    const [details, setDetails] = useState([]);
    const [userToken, setUserToken] = useState("");
    
    const getToken = async ()=>{
        try {
            const result = await SecureStorage.getItemAsync('auth');
            setUserToken(result);
        } catch (error) {
            console.log(error);
        }
    }
    getToken();
    const getData = async ()=>{
        try{
            if(userDetails.length === 0){
                axios.get(`${config.uri}/user/:`+userToken).then(res=>{
                    setUserDetails(res.data.user);
                    setDetails(res.data.details);
                })
            }
        }
        catch(err){}
    }
    useEffect(()=>{
        getData();
    });

    return (
        <DrawerContentScrollView>
            {userDetails ? 
                <View style={styles.drawerContent}>
                    <View style={styles.userInfo}>
                        {
                            details.image ? 
                            <Avatar.Image 
                                source={{
                                    uri : 'images.png',
                                }}
                                size={60}
                            /> : 
                            <Avatar.Image 
                                source={require('../assets/images/defaultUser.png')}
                                size={60}
                            />
                        }
                        <Title style={styles.title}>{details.name ? details.name : ""}</Title>
                        <Caption style={styles.caption}>{details.jobTitle ? details.jobTitle : '@'+userDetails.email}</Caption>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>
                                    {details.following ? (details.following).length : ""}
                                </Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>
                                    {details.followers ? (details.followers).length : ""}
                                </Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color,size})=><MatIcons name={'account-outline'} color={color} size={size}/>}
                            label="Profile"
                            onPress={()=>navigate.navigate("profile")}
                        />
                        <DrawerItem 
                            icon={({color,size})=><MatIcons name={'post'} color={color} size={size}/>}
                            label="Posts"
                            onPress={()=>navigate.navigate("posts")}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <Drawer.Item
                            icon={({color,size})=><IonIcons name={'settings-outline'} color={color} size={size}/>}
                            label='Settings'
                            onPress={()=>navigate.navigate("userSettings")}
                        />
                    </Drawer.Section>
                </View>
            : 
            "" }
        </DrawerContentScrollView>
    );
}

function BottomTab (){
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name='home' 
                component={Index} 
                options={{
                    headerShown : false,
                    tabBarIcon : ({focused,color})=><MatIcons name={'home'} color={focused ? '#0057C2' : color} size={26} style={{marginTop : focused ? 3 : 8}}/>,
                    tabBarLabel : ({focused, color})=><Text style={{color : focused ? '#0057C2' : color, fontSize : 12, paddingBottom : 5}}>{focused ? 'Home' : ""}</Text>,
                    tabBarStyle : {elevation : 0, shadowOpacity : 0, borderWidth : 1, borderTopColor : '#C5CEE0', height : 60}
                }}
            />
            <Tab.Screen 
                name='search' 
                component={Search} 
                options={{
                    headerShown : false,
                    tabBarIcon : ({focused,color})=><IonIcons name={'search'} color={focused ? '#0057C2' : color} size={24} style={{marginTop : focused ? 3 : 8}}/>,
                    tabBarLabel : ({focused, color})=><Text style={{color : focused ? '#0057C2' : color, fontSize : 12, paddingBottom : 5}}>{focused ? 'Search' : ""}</Text>,
                    tabBarStyle : {elevation : 0, shadowOpacity : 0, borderWidth : 1, borderTopColor : '#C5CEE0', height : 60}
                }}
            />
            <Tab.Screen 
                name='post' 
                component={SetPost} 
                options={{
                    headerShown : false,
                    tabBarIcon : ({focused,color})=><MatIcons2 name={'post-add'} color={focused ? '#0057C2' : color} size={25} style={{marginTop : focused ? 3 : 8}}/>,
                    tabBarLabel : ({focused, color})=><Text style={{color : focused ? '#0057C2' : color, fontSize : 12, paddingBottom : 5}}>{focused ? 'Post' : ""}</Text>,
                    tabBarStyle : {elevation : 0, shadowOpacity : 0, borderWidth : 1, borderTopColor : '#C5CEE0', height : 60}
                }}
            />
            <Tab.Screen 
                name='followers' 
                component={Followings} 
                options={{
                    headerShown : false,
                    tabBarIcon : ({focused,color})=><FaFa5 name={'users'} color={focused ? '#0057C2' : color} size={20} style={{marginTop : focused ? 3 : 8}}/>,
                    tabBarLabel : ({focused, color})=><Text style={{color : focused ? '#0057C2' : color, fontSize : 12, paddingBottom : 5}}>{focused ? 'Followers' : ""}</Text>,
                    tabBarStyle : {elevation : 0, shadowOpacity : 0, borderWidth : 1, borderTopColor : '#C5CEE0', height : 60}
                }}
            />
            <Tab.Screen 
                name='notifications'
                component={Notifications} 
                options={{
                    headerShown : false,
                    tabBarIcon : ({focused,color})=><IonIcons name={'notifications'} color={focused ? '#0057C2' : color} size={22} style={{marginTop : focused ? 3 : 8}}/>,
                    tabBarLabel : ({focused, color})=><Text style={{color : focused ? '#0057C2' : color, fontSize : 12, paddingBottom : 5}}>{focused ? 'Notifications' : ""}</Text>,
                    tabBarStyle : {elevation : 0, shadowOpacity : 0, borderWidth : 1, borderTopColor : '#C5CEE0', height : 60}
                }}
            />
        </Tab.Navigator>
    );
}

function DrawerOpen(){
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={()=><DrawerContent/>}>
            <Drawer.Screen name='userHome' component={BottomTab} options={{header : ()=><AppBarHeader/>}}/>
        </Drawer.Navigator>
    );
}

const AppNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' >
                <Stack.Screen name='Login' component={Login} options={{headerShown : false}} />
                <Stack.Screen name='Register' component={Register} options={{headerShown : false}} />
                <Stack.Screen name='EmailVerify' component={EmailVerification} options={{headerShown : false}} />
                <Stack.Screen name='userPannel' component={DrawerOpen} options={{headerShown : false}} />
                <Stack.Screen name='userSettings' component={Settings} />
                <Stack.Screen name='profile' component={Profile} />
                <Stack.Screen name='posts' component={Post} />
                <Stack.Screen name='messaging' component={Messaging} options={{headerTitle : "Messaging", headerTitleAlign : "center"}}/>
                <Stack.Screen name='userProfile' component={UserProfle} options={{headerTitle : ""}}/>
                <Stack.Screen name='userPost' component={UserPost} options={{headerTitle : ""}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    drawerContent : {
        flex: 1,
    },
    userInfo : {
        paddingLeft: 20,
        marginTop : 50,
    },
    title : {
        marginTop: 10,
        fontWeight: 'bold',
    },
    caption : {
        fontSize: 14,
        lineHeight: 14,
    },
    row : {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section : {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph : {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection : {
        marginTop: 40,
    },
    linearText : {

    }
});

export default AppNavigation;