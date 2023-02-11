import React, { useContext } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const LoginScreen = ({navigation}) => {

    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const val = useContext(AuthContext);

    function useLogin() {
      axios.post('http://localhost:8080/login', {
        ReqUsername : username,
        ReqPassword : password,
      }).then(response => setArticleId(response.data.id));
    }

    return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeText}>Bienvenue</Text>
        <TextInput style={styles.input} value={username} placeholder="Identifiant" onChangeText={text => setUsername(text)}/>
        <TextInput style={styles.input} value={password} secureTextEntry= {true} placeholder="Mot de passe" onChangeText={text => setPassword(text)}/>
        
        <TouchableOpacity style={styles.confirmButton} onClick={useLogin}>
            <Text style={styles.confirmButtonText}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.subTextButton}>Pas de compte ? Créez-en un ici  </Text>
        </TouchableOpacity>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
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
      fontSize: 40,
      fontWeight: 'bold'
    }
});  

export default LoginScreen;