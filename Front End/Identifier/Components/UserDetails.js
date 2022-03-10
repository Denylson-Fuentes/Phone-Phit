import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';


class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            height_feet: this.props.height_ft,
            height_inches: this.props.height_inch,
            weight: this.props.weight,
            sign: this.props.squat,
            bench_personal: this.props.bench,
            squat_personal: this.props.squat,
            curl_personal: this.props.curl,
            mile_personal_minute: this.props.mile_min,
            mile_personal_seconds: this.props.mile_sec,
            editing: false,
        }
        console.log(this.props)
    }

    componentDidMount = async() => {
        await axios.get('http://192.168.1.111:5000/details', {
            params:{
                user: this.props.user
            }
        })
        .then(res =>{
            this.setState({
                        height_feet: res.data.details.height_feet, 
                        height_inches : res.data.details.height_inches,
                        weight : res.data.details.weight,
                        sign: res.data.details.sign,
                        bench_personal: res.data.details.bench_personal,
                        squat_personal: res.data.details.squat_personal,
                        curl_personal: res.data.details.curl_personal,
                        mile_personal_minute: res.data.details.mile_minutes,
                        mile_personal_seconds: res.data.details.mile_seconds
                    })
        })
    }


    render(){

        return(
            <View>
                <View style = {styles.home_footer} >
                    
                    <View style = {styles.footer_element}>
                        <Text style = {styles.footer_label}>Height(Feet)</Text>
                        <Text style = {styles.element_text}> {this.state.height_feet} </Text>
                    </View>

                    <View style = {styles.footer_element}>
                        <Text style = {styles.footer_label}>Height(Inches)</Text>
                        <Text style = {styles.element_text}> {this.state.height_inches}</Text>
                    </View>

                    <View style = {styles.footer_element}>
                        <Text style = {styles.footer_label}>Weight</Text>
                        <Text style = {styles.element_text}> {this.state.weight} </Text>

                    </View>

                    <View style = {styles.footer_element}>
                        <Text style = {styles.footer_label}>Sign</Text>
                        <Text style = {styles.element_text}> {this.state.sign} </Text>
                    </View>
                    
                    <View style = {styles.footer_element}>
                        <Text style = {styles.footer_label}>Bench Per</Text>
                        <Text style = {styles.element_text}> {this.state.bench_personal}</Text>

                    </View>

                    <View style = {styles.footer_element}>
                        <Text style = {styles.footer_label}>Squat Per</Text>
                        <Text style = {styles.element_text}> {this.state.squat_personal} </Text>
                    </View>
                    
                    <View style = {styles.footer_element}>
                        <Text style = {styles.footer_label}>Curl Per</Text>
                        <Text style = {styles.element_text}> {this.state.curl_personal} </Text>
                    </View>

                    <View style = {styles.footer_element}>
                        <Text style = {styles.footer_label}>Mile(Min)</Text>
                        <Text style = {styles.element_text}> {this.state.mile_personal_minute}</Text>
                    </View>

                    <View style = {styles.footer_element}>
                        <Text style = {styles.footer_label}>Mile(Sec)</Text>
                        <Text style = {styles.element_text}> {this.state.mile_personal_seconds} </Text>
                    </View>

                </View>

                <View style = {{backgroundColor: 'white', width: '50%', marginHorizontal: 100, alignItems: 'center', marginVertical: 15}}>
                    <TouchableOpacity onPress={this.onChange} style = {{width: '100%'}}>
                        <Text>Edit Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}

export default UserDetails;

const styles = StyleSheet.create({
    
    home_footer:{
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: "#1e90ff",
        height: 185,
        flexWrap: 'wrap'
    },

    footer_element:{
        backgroundColor: '#ffffff',
        height: 'auto',
        marginVertical: 10,
        marginHorizontal: 10,
        width: '27%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    footer_label:{
        backgroundColor: '#000000',
        color: 'white',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    element_text:{
        fontSize: 20
    },

    edit_button:{

    }
})