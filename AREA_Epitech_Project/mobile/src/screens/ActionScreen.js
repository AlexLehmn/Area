import React from 'react';
import {Text, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

const ActionScreen = ({navigation}) => {

    const list = [
        ['Nouveau post Subreddit', 'Reddit'],
        ['Top post journée Subreddit', 'Reddit'],
        ['Top all time Subreddit', 'Reddit'],
        ['Nouveau tweet', 'Twitter'],
        ['Nouveau push sur repo', 'Github'],
    ];

    var render = [];

    const goToReactions = (noId) => {
        const actionName = list[noId][0];
        const actionService = list[noId][1];

        navigation.navigate('Reactions', {actionName, actionService})
    } 

    for (let index = 0; index < list.length; index++) {
        render.push(
            <TouchableOpacity key={index} style={[styles.AREASet, styles.actionPrint]} onPress={() => {goToReactions(index)}}>
                <View style={styles.actionAligner}><Text>{list[index][0]}</Text></View>
                <View style={styles.reactionAligner}><Text style={styles.boldText}>{list[index][1]}</Text></View>
            </TouchableOpacity>
        )
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.welcomeText}>Liste des Actions disponibles :</Text>
            {render}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: 20,
      paddingTop: 60
    },

    middleContainer: {
        alignItems: 'center',
        height: 530,
        paddingTop: 20,
        paddingBottom: 20,
    },
  
    input: {
      height: 40,
      width: 250,
      margin: 10,
      borderBottomWidth: 1,
      padding: 10,
      borderRadius: 5
    },
  
    confirmButton: {
      height: 50,
      width: 200,
      backgroundColor: '#47FF63',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      marginTop: 20,
      marginBottom: 10
    },
    
    subTextButton:{
      color: '#777',
      paddingLeft: 10
    },
  
    confirmButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    
    welcomeText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20
    },

    alignerLeft: {
        width: 300,
        alignItems: 'flex-start'
    },

    alignerRight: {
        width: 300,
        alignItems: 'flex-end'
    },

    actionPrint: {
        flexDirection: 'row'
    },

    actionAligner: {
        width: 200,
        alignItems: 'flex-start'
    },

    reactionAligner: {
        width: 80,
        alignItems: 'flex-end'
    },

    AREASet: {
        backgroundColor: '#b1e4e6',
        borderRadius: 8,
        margin: 5,
        padding: 10
    },

    boldText: {
        fontWeight: 'bold'
    },
});  

export default ActionScreen;