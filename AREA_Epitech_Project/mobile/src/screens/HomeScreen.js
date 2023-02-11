import React from 'react';
import {Text, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

const HomeScreen = ({navigation}) => {
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.alignerLeft}><Text style={styles.welcomeText}>Bienvenue, User</Text></View>
            <View style={styles.middleContainer}>
                <Text>Vos AREA paramétrées :</Text>
                <View style={styles.AREASet}>
                    <View style={styles.actionPrint}>
                        <View style={styles.actionAligner}><Text>Nouveau Tweet</Text></View><View style={styles.reactionAligner}><Text style={styles.boldText}>Twitter</Text></View>
                    </View>
                    <View style={styles.actionPrint}>
                        <View style={styles.actionAligner}><Text>Envoi d'un email</Text></View><View style={styles.reactionAligner}><Text style={styles.boldText}>Outlook</Text></View>
                    </View>
                </View>
            </View>
            <View style={styles.alignerRight}>
                <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('Actions')}>
                    <Text style={styles.confirmButtonText}>Nouvelle AREA</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 60
    },

    middleContainer: {
        alignItems: 'center',
        height: 560,
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
      fontSize: 25,
      fontWeight: 'bold'
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
        width: 180,
        alignItems: 'flex-start'
    },

    reactionAligner: {
        width: 80,
        alignItems: 'flex-end'
    },

    AREASet: {
        backgroundColor: '#b1e4e6',
        borderRadius: 8,
        margin: 10,
        padding: 10
    },

    boldText: {
        fontWeight: 'bold'
    },
});  

export default HomeScreen;