import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Login = () => {
    return (
        <View style={styles.container}>
            <Text>Login Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    }
})

export default Login;
