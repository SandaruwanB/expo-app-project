import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Search = ({route}) => {
    const {text} = route.params;
    return (
        <View>
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Search;
