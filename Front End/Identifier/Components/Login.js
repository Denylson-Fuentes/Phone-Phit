import React,{ Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import axios from 'axios';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import ApiKeys from './Api';


export default class LoginScreen extends Component {
    constructor(){
        super()
        this.state = {
            username : '',
            password : '',
            message : ''
        }
    }

    Login = async() =>{
        const usernameVal = this.state.username;
        const passwordVal = this.state.password;

        await axios.get(ApiKeys.login,
        {
            params:{
                username : this.state.username,
                password : this.state.password
            }
        })
        .then((response) =>{
            console.log(response.data.message)
            if (response.data.message == 'Valid'){
                this.props.navigation.navigate('Home', {name: this.state.username})
            }
            else{
                this.setState({message : 'Username and/or Password Not Found'})
            }
        })
        .catch((err) =>{
            Alert.alert(err)
        })
        // this.props.navigation.navigate('Home')
    }  

    render(){
        return(
            <View style = {styles.loginscreen}>
                <View>
                    <View style = {styles.loginError}>
                        <Text style = {styles.errorMessage}>{this.state.message}</Text>
                    </View>

                    <TextInput 
                        value = {this.state.username}
                        style = {styles.usernameText}
                        placeholder = 'Username'
                        name = 'username'
                        onChangeText = {(username) => this.setState({username})}
                        autoCapitalize = {'none'}
                        keyboardType = {'email-address'}
                    />

                    <TextInput 
                        value = {this.state.password}
                        style = {styles.passwordText}
                        placeholder = 'Password'
                        name = 'password'
                        onChangeText = {(password) => this.setState({password})}
                        secureTextEntry
                    />

                    <View style = {styles.loginButton}>
                        <TouchableOpacity onPress={this.Login}>
                            <Text>{'Login'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {styles.signupButton}>
                        <Text style = {styles.loginText}>
                            {"Don't have and account? "}

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Sign Up')}>
                                <Text style = {styles.loginText}>{'Sign Up'}</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginscreen :{
        backgroundColor: '#00bfff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    usernameText:{
        backgroundColor: '#4169e1',
        color: '#fff',
        borderRadius: 30,
        width: 200,
        height: 45,
        marginBottom: 20,
        alignItems: 'center'
    },

    passwordText:{
        backgroundColor: '#4169e1',
        color: '#fff',
        borderRadius: 30,
        width: 200,
        height: 45,
        marginBottom: 20,
        alignItems: 'center'
    },

    loginButton:{
        height: 30,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    signupButton:{
        width: "100%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#00008b",
        
    },

    loginText:{
        color: '#fff',
    },

    loginError :{
        marginBottom: 25,
    },

    errorMessage:{
        color: 'red',
        fontSize: 20
    }
})