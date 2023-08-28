import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';


const UserProfle = ({route}) => {
    const {userid} = route.params;
    return (
        <View>
            <Text>{userid}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default UserProfle;
