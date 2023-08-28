import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper'


const Posts = ({route}) => {
    const {user} = route.params;
    return (
        <View>
            <Text>{user}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Posts;
