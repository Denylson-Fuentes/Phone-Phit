import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DataTable} from 'react-native-paper';
import axios from 'axios';

const List = item =>(
    <DataTable.Row style = {styles.datarow} >
        <DataTable.Cell style = {styles.datacell}>{item.list.Name}</DataTable.Cell>
        <DataTable.Cell style = {styles.datacell}>{item.list.Total_Hours} </DataTable.Cell>
        <DataTable.Cell style = {styles.datacell}>{item.list.Total_Minutes} </DataTable.Cell>
        <DataTable.Cell style = {styles.datacell}>{item.list.Calories} </DataTable.Cell>
    </DataTable.Row>
)

class FriendList extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: props.friends,
            user: props.user
        }
        console.log(props)
    }

    componentDidMount = async() =>{
        await axios.get('http://192.168.1.111:5000/friends',{
            params:{
                user: this.state.user
            }
        })
        .then(response =>{
            this.setState({list: response.data.friend_details})
        })
    }

    friendList(){
        return this.state.list.map((current, i) => {
            return <List list = {current} key = {i} />
        });
    }

    render(){
        return(
            <DataTable style = {styles.datatable}>
                <DataTable.Header>
                    <DataTable.Title style = {styles.datatitle}>Name</DataTable.Title>
                    <DataTable.Title style = {styles.datatitle}>Time Hrs</DataTable.Title>
                    <DataTable.Title style = {styles.datatitle}>Time Mins</DataTable.Title>
                    <DataTable.Title style = {styles.datatitle}>Cals Taken</DataTable.Title>
                </DataTable.Header>

                {this.friendList()}
            </DataTable>
        )
    }
}

export default FriendList;

const styles = StyleSheet.create({
    datatable: {
        backgroundColor: 'aqua',
        opacity: 0.8,
        shadowOpacity: 0.5,
        shadowColor: 'white',
        shadowRadius: 10,
    },

    datatitle:{
        justifyContent: 'center',
    },  

    datarow: {
        backgroundColor: 'white',
    },

    datacell: {
        justifyContent: 'center'
    }
})