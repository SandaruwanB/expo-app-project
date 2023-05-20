import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// common
import Login from './Login'
import Register from './Register'

const AppNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' >
                <Stack.Screen name='Login' component={Login} options={{headerShown : false}} />
                <Stack.Screen name='Register' component={Register} options={{headerShow : false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default AppNavigation;
