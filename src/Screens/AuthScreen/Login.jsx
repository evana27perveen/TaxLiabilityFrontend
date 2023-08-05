import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCookies } from 'react-cookie';
import * as Animatable from 'react-native-animatable';
import API_BASE_URL from '../../apiConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    width: '80%',
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#22ab20',
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 5,
    marginTop: 16,
  },
  button: {
    backgroundColor: '#22ab20',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  signUpTextContent: {
    color: '#22ab20',
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['myToken']);
  const [taxPayer, setTaxPayer] = useCookies(['taxPayer']);
  const [profile, setProfile] = useCookies(['profile']);
  const [userID, setUserID] = useCookies(['userID']);
  const navigation = useNavigation();

  const handleLogin = async () => {

    if (!email) {
      console.error('Email is required');
      return;
    }

    if (!password) {
      console.error('Password must be at least 8 characters long and contain at least one digit, one uppercase letter, and one symbol.');
      return;
    }

    if (password.length < 8) {
      console.error('Password must be at least 8 characters long and contain at least one digit, one uppercase letter, and one symbol.');
      return;
    }

    let formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    let requestOption = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, requestOption);
      const responseData = await response.text();
      const jsonResponse = JSON.parse(responseData);

      console.log('success', jsonResponse);
      setToken('access_token', jsonResponse.access);
      setTaxPayer('taxPayer', jsonResponse.is_tax_payer);
      setUserID('userID', jsonResponse.user_id);
      setProfile('profile', jsonResponse.exist_profile);
      if (jsonResponse.is_tax_payer === true) {
        console.log("Navigating to Home");
        navigation.navigate('Home');
      } else {
          console.log("Navigating to Taxes");
          navigation.navigate('Taxes');
      }
      
    
    } catch (error) {
      console.log('Error:', error);
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="fadeIn"
        duration={1500}
        source={require('../../../assets/logo2.png')}
        style={{ width: 400, height: 200, resizeMode: 'contain' }}
      />
      <View style={styles.inputContainer}>
        <Animatable.View animation="fadeIn">
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </Animatable.View>
        <Animatable.View animation="fadeIn">
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        </Animatable.View>
      </View>
      <View style={styles.buttonContainer}>
        <Animatable.View animation="zoomIn">
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeIn" style={styles.signUpText}>
          <Text>
            OR
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpTextContent}>Signup here</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
};

export default Login;
