
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
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
import Index from './user/index'

function DrawerContent() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Drawer content</Text>
      </View>
    );
}

function DrawerOpen(){
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={()=><DrawerContent/>}>
            <Drawer.Screen name='userHome' component={Index}/>
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
                <Stack.Screen name='userPannel' component={DrawerOpen} />
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
    userIcon : {
        width : 40,
        height : 40,
        borderRadius : 40,
        marginTop : 15,
        marginLeft : 15,
    }
});

export default AppNavigation;