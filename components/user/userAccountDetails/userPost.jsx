import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';


const UserPost = ({route}) => {
    const {postid} = route.params;
    return (
        <View>
            <Text>{postid}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default UserPost;
