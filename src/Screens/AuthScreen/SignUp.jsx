import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import API_BASE_URL from '../../apiConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  const navigation = useNavigation();


  const handleSignUp = async (e) => {

      e.preventDefault();


      if (!email) {
        console.error('Email');
        return;
      }
    
    
      if (!password) {
        console.error('Password must be at least 8 characters long and contain at least one digit, one uppercase letter, and one symbol.');
        return;
      }
    
      if (password.length < 8) {
        console.error('Password must be at least 8 characters long');
        return;
      }
    
      if (confirmPassword !== password) {
        console.error('Passwords do not match');
        return;
      }

    let formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    let requestOption = {
      method: "POST",
      body: formData,
      redirect: "follow"
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/users/`, requestOption);
      const responseData = await response.text();
      const jsonResponse = JSON.parse(responseData);

      console.log('success', jsonResponse);
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while signing up. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
        <Animatable.View animation="fadeIn">
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </Animatable.View>
      </View>
      <Animatable.View animation="zoomIn" style={{ width: '80%', borderRadius: 5 }}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={!email || !password || !confirmPassword}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View animation="fadeIn" style={styles.signUpText}>
          <Text>
            OR
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signUpTextContent}>Login here</Text>
          </TouchableOpacity>
        </Animatable.View>
    </View>
  );
};

export default SignUp;
