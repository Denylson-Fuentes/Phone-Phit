import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import UploadImage from './UploadImage';
import UserDetails from './UserDetails';
import { IconButton } from 'react-native-paper'


class HomeScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: "Joe",
        }
    }

    static navigationOptions = {
        headerRight: (
            <View style = {{flexDirection: 'row'}}>
                <Text style = {{top: 13, left: 12, fontSize: 18}}>Friends</Text>
                <IconButton
                icon = 'arrow-right'
                onPress={() => navigation.navigate('Friends', {user: this.state.username})}
                color="#4169e1"
                />
            </View>
        ),
    };

    render(){

        return (
            <ScrollView style = {styles.home_screen}>

                <View style = {styles.home_title}>
                        <Text style = {{fontSize: 30, textAlign: 'center'}}>Hello, {this.state.username}</Text>
                </View>


                <View style = {styles.home_body}>
                        <UploadImage />
                </View>

                <UserDetails user = {this.state.username}/>

                <View style = {styles.nav_button}>
                    <Text style = {{top: 13, left: 12, fontSize: 18}}>Friends</Text>
                    <IconButton
                    icon = 'arrow-right'
                    onPress={() => this.props.navigation.navigate('Friends', {user: this.state.username})}
                    color="black"
                    />
                </View>
            </ScrollView>
        )
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    home_screen:{
        backgroundColor: '#4169e1',
        height: '100%',
    },

    home_title:{
        backgroundColor: 'white',
        color: '#ffffff',
        alignItems: 'center',
        height: 40,
        margin: 10,
    },

    home_body:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        height: 300,
    },
    nav_button:{
        flexDirection: 'row',
        justifyContent:'center',
        left: 5
    }
})