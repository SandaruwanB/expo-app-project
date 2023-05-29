import { View, Text, StyleSheet, TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import * as SecureStorage from 'expo-secure-store'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FaIcon from 'react-native-vector-icons/FontAwesome'

// common
import Home from './Home'
import Login from './Login'
import Register from './Register'
import EmailVerification from './EmailVerification'

// common user
import UserHome from './user/UserHome'
import Notification from './user/Notifications'
import Post from './user/Post'
import Followers from './user/Followers'
import Messaging from './user/Messaging'
import { useState } from 'react'

// admin user



const UserHeader = ()=>{
    const navigate = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{position : 'relative', width : '20%'}}>
                    <FaIcon name='user' size={30} style={{marginLeft : 30, marginTop : 20, color : '#2E3A59'}} />
                </View>
                <View style={{position : 'relative', width: '65%'}}>
                    <TextInput style={styles.searchBar} placeholder='Search'/>
                    <Icon name='search' size={24} style={styles.searchIcon}/>
                </View>
                <View style={{position : 'relative', width : '15%'}}>
                    <MatIcons name='message-processing' size={28} style={styles.messageIcon} onPress={()=>navigate.navigate("Messaging")}/>
                </View>
            </View>
        </View>
    )
}


const UserBottomNav = ()=>{
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name='Home' 
                component={UserHome} 
                options={{
                    tabBarIcon : ({focused, color})=>(
                        <MatIcons name='home' color={focused ? '#0057C2' : color} size={30} style={{marginTop : focused ? 3 : 8}} />
                    ),
                    tabBarLabel : ({focused, color})=>(
                        <Text style={{color : focused ? '#0057C2' : color, fontSize : 12, paddingBottom : 5}}>{focused ? 'Home' : ''}</Text>
                    ),
                    tabBarStyle : {elevation : 0, shadowOpacity : 0, borderTopWidth : 1, borderTopColor : '#C5CEE0', height : 60},
                    header : ()=><UserHeader />,
                }}
            />
            <Tab.Screen 
                name='Followers' 
                component={Followers}
                options={{
                    tabBarIcon : ({focused, color})=>(
                        <FaIcon name='users' color={focused ? '#0057C2' : color} size={22} style={{marginTop : focused ? 3 : 8}} />
                    ),
                    tabBarLabel : ({focused, color})=>(
                        <Text style={{color : focused ? '#0057C2' : color, fontSize : 12, paddingBottom : 5}}>{focused ? 'Connections' : ''}</Text>
                    ),
                    tabBarStyle : {elevation : 0, shadowOpacity : 0, borderTopWidth : 1, borderTopColor : '#C5CEE0', height : 60},
                    header : ()=><UserHeader />,
                }}
            />
            <Tab.Screen 
                name='Post' 
                component={Post} 
                options={{
                    tabBarIcon : ({focused, color})=>(
                        <Icon name='post-add' color={focused ? '#0057C2' : color} size={26} style={{marginTop : focused ? 3 : 8}}/>
                    ),
                    tabBarLabel : ({focused, color})=>(
                        <Text style={{color : focused ? '#0057C2' : color, fontSize : 12, paddingBottom : 5}}>{focused ? 'Post' : ''}</Text>
                    ),
                    tabBarStyle : {elevation : 0, shadowOpacity : 0, borderTopWidth : 1, borderTopColor : '#C5CEE0', height : 60},
                    headerShown : false,
                }}
            />
            <Tab.Screen 
                name='Notifications' 
                component={Notification}
                options={{
                    tabBarIcon : ({focused, color})=>(
                        <Icon name='notifications' color={focused ? '#0057C2' : color} size={26} style={{marginTop : focused ? 3 : 8}}/>
                    ),
                    tabBarLabel : ({focused, color})=>(
                        <Text style={{color : focused ? '#0057C2' : color, fontSize : 12, paddingBottom : 5}}>{focused ? 'Notifications' : ''}</Text>
                    ),
                    tabBarStyle : {elevation : 0, shadowOpacity : 0, borderTopWidth : 1, borderTopColor : '#C5CEE0', height : 60},
                    header : ()=><UserHeader />,
                }}
            />
        </Tab.Navigator>
    )
}

const AppNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' >
                <Stack.Screen name='Login' component={Login} options={{headerShown : false}} />
                <Stack.Screen name='Register' component={Register} options={{headerShown : false}} />
                <Stack.Screen name='EmailVerify' component={EmailVerification} options={{headerShown : false}} />
                <Stack.Screen name='UsersPannel' component={UserBottomNav} options={{headerShown : false}} />
                <Stack.Screen name='Messaging' component={Messaging} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : 110,
        borderBottomColor : '#C5CEE0',
        borderBottomWidth : 1,
        position : 'relative',
        backgroundColor : '#fff',
    },
    content : {
        width : '100%',
        height : 65,
        position : 'absolute',
        bottom : 0,
        flexDirection : 'row',
        justifyContent : 'center',
    },
    searchBar : {
        width : '100%',
        padding : 4,
        backgroundColor : '#E4E9F2',
        marginTop : '6%',
        borderRadius : 5,
        paddingLeft : 30,
    },
    searchIcon : {
        position : 'absolute', 
        top : 22, 
        left : 5,
        color : '#2E3A59',
    },
    messageIcon : {
        marginTop : 20,
        marginLeft : 15,
        color : '#2E3A59',
    },
});

export default AppNavigation;
