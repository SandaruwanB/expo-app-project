
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { Avatar, Title, Caption, Paragraph, Drawer, Text } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as SecureStorage from 'expo-secure-store'
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'

// common
import Home from './Home'
import Login from './Login'
import Register from './Register'
import EmailVerification from './EmailVerification'

// common user
import Index from './user/index'
import Search from './user/search'
import Settings from './user/accountControl/settings'
import Post from './user/accountControl/posts'
import Profile from './user/accountControl/profile'


function DrawerContent() {
    const navigate = useNavigation();
    return (
        <DrawerContentScrollView>
            <View style={styles.drawerContent}>
                <View style={styles.userInfo}>
                    <Avatar.Image 
                        source={{
                            uri : 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
                        }}
                        size={60}
                    />
                    <Title style={styles.title}>David Musthapa</Title>
                    <Caption style={styles.caption}>@david</Caption>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                200
                            </Paragraph>
                            <Caption style={styles.caption}>Following</Caption>
                        </View>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                1500
                            </Paragraph>
                            <Caption style={styles.caption}>Followers</Caption>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                        icon={({color,size})=><MatIcons name={'account-outline'} color={color} size={size}/>}
                        label="Profile"
                        onPress={()=>navigate.navigate("userProfile")}
                    />
                    <DrawerItem 
                        icon={({color,size})=><MatIcons name={'post'} color={color} size={size}/>}
                        label="Posts"
                        onPress={()=>navigate.navigate("userPosts")}
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
                    tabBarIcon : ({focused,color})=><IonIcons name={'search'} color={focused ? '#0057C2' : color} size={26} style={{marginTop : focused ? 3 : 8}}/>,
                    tabBarLabel : ({focused, color})=><Text style={{color : focused ? '#0057C2' : color, fontSize : 12, paddingBottom : 5}}>{focused ? 'Search' : ""}</Text>,
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
            <Drawer.Screen name='userHome' component={BottomTab}/>
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
                <Stack.Screen name='userProfile' component={Profile} />
                <Stack.Screen name='userPosts' component={Post} />
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
    }
});

export default AppNavigation;