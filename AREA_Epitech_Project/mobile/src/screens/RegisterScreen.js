import { useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const RegisterScreen = ({navigation}) => {

    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    
    const {register} = useContext(AuthContext);

    function useRegister() {
      axios.post('http://localhost:8080/register', {
        ReqUsername : username,
        ReqPassword : password,
      }).then(response => setArticleId(response.data.id));
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.welcomeText}>S'enregistrer</Text>
            <TextInput style={styles.input} value={username} placeholder="Identifiant" onChangeText={text => setUsername(text)} />
            <TextInput style={styles.input} value={password} secureTextEntry={true} placeholder="Mot de passe" onChangeText={text => setPassword(text)} />

            <TouchableOpacity style={styles.confirmButton} onClick={useRegister}>

            <Text style={styles.confirmButtonText}>Valider</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.subTextButton}>Déjà un compte ? Connectez-vous  </Text>
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

export default RegisterScreen;