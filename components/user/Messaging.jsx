import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { io } from 'socket.io-client';

const socket = io("http://192.168.8.140:8080");

const Messaging = () => {
    return (
        <View>
            <Text>Messaging</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Messaging;
