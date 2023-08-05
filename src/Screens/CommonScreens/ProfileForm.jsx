import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useCookies } from 'react-cookie';
import API_BASE_URL from '../../apiConfig';
import { useNavigation } from '@react-navigation/native';

const ProfileForm = () => {
  const [token] = useCookies(['myToken']);
  const [profile, setProfile] = useCookies(['profile']);
  const navigation = useNavigation();
  const [newProfile, setNewProfile] = useState({
    full_name: '',
    employee_id: '',
    salary: '',
    tax: null,
  });

  const handleCreateProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfile),
      });

      if (response.ok) {
        console.log('Profile created successfully');
        setProfile('profile', true);
        navigation.navigate('Login');
      } else {
        console.error('Failed to create user profile');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const calculateSalary = totalSalary => {
    let taxRate, exemptionAmount;

    if (totalSalary <= 400000) {
      taxRate = 0.10;
      exemptionAmount = 2500;
    } else if (totalSalary <= 800000) {
      taxRate = 0.15;
      exemptionAmount = 5000;
    } else {
      taxRate = 0.20;
      exemptionAmount = 10000;
    }

    const salaryTax = (totalSalary * taxRate) - exemptionAmount;
    return salaryTax;
  };

  const handleChange = (name, value) => {
    if (name === 'salary') {
      const salary = parseFloat(value);
      const tax = calculateSalary(salary);
      setNewProfile(prevProfile => ({
        ...prevProfile,
        [name]: value,
        tax: tax.toFixed(2), // Update the tax field
      }));
    } else {
      setNewProfile(prevProfile => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>New Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={newProfile.full_name}
          onChangeText={value => handleChange('full_name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Employee ID"
          value={newProfile.employee_id}
          onChangeText={value => handleChange('employee_id', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Salary"
          value={newProfile.salary}
          onChangeText={value => handleChange('salary', value)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.createButton} onPress={handleCreateProfile}>
          <Text style={styles.createButtonText}>Create Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '80%',
    backgroundColor: '#c6eec4',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#22ab20',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: '#22ab20',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileForm;
