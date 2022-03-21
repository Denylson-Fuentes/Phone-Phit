import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper'
import FriendList from './FriendList';

class FriendScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            friends: [
                {Name: 'Howard', Total_Hours: 100, Total_Minutes : 25, Calories: 250},
                {Name: 'Christiano', Total_Hours: 50, Total_Minutes : 50, Calories: 500},
                {Name: 'Messi',Total_Hours: 20, Total_Minutes : 3, Calories: 1000}
            ]
        }
        // console.log(this)
    }

    render(){

        return (
            <View style = {styles.friend_screen}>

                <View style = {styles.friend_title}>
                    <Text style = {{fontSize: 35}}>Friends</Text>
                </View>

                <FriendList friends = {this.state.friends} user = {this.props.route.params.user}/>

                <View style = {styles.nav_button}>
                    <Text style = {{top: 13, left: 12, fontSize: 18}}>Predictions</Text>
                    <IconButton
                    icon = 'arrow-right'
                    onPress={() => this.props.navigation.navigate('Prediction', {user: this.state.username})}
                    color="black"
                    />
                </View>
            </View>
        )
    }
}

export default FriendScreen;

const styles = StyleSheet.create({
    friend_screen:{
        backgroundColor: '#4169e1',
        height: '100%',
    },

    friend_title:{
        backgroundColor: 'white',
        color: '#ffffff',
        alignItems: 'center',
        height: 40,
        margin: 20,
    },
    
    nav_button:{
        flexDirection: 'row',
        justifyContent:'center',
        left: 5
    }
})