import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Text, List, Divider} from 'react-native-paper'

const Notifications = () => {
    return (
        <View>
            <ScrollView>
            <List.Section style={{backgroundColor: '#fff', paddingBottom: 10}}>
                    <List.Subheader style={{backgroundColor: '#fff', fontSize : 16, fontWeight : 'bold', color : '#3366FF'}}>Followers</List.Subheader>
                    <View style={{paddingHorizontal: 20}}>
                        <Divider/>
                    </View>
                    <List.Item
                        style={{backgroundColor: '#fff',paddingHorizontal : 20}}
                        title={"Molaweson appochchi"}
                        description={"@molaweson thama ithin"}
                        left={()=><Image source={require('../../assets/images/defaultUser.png')} style={{width : 45, height : 45, borderRadius : 40}}/>}
                    />
                    <View style={{paddingHorizontal: 20}}>
                        <Divider/>
                    </View>
                </List.Section>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Notifications;
