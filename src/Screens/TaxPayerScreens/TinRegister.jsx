import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useCookies } from 'react-cookie';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../apiConfig';

const TinRegister = () => {
    const [token] = useCookies(['myToken']);
    const [taxPayer, setTaxPayer, removeTaxPayer] = useCookies(['taxPayer']);
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        tax_type: '',
        full_name: '',
        date_of_birth: '',
        address: '',
        contact_number: '',
        nid: '',
    });

    const handleChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/tax/payer/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token.access_token}`,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json(); 
    
            if (response.ok) {
                console.log('Tax payer registered successfully:', result);
                setFormData({
                    tax_type: '',
                    full_name: '',
                    date_of_birth: '',
                    address: '',
                    contact_number: '',
                    nid: '',
                });
                setTaxPayer('taxPayer', true);
                navigation.navigate('Me');
            } else {
                console.error('Failed to register tax payer:', result);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TIN Registration</Text>
            <RadioButton.Group
                onValueChange={(value) => handleChange('tax_type', value)}
                value={formData.tax_type}
            >
                <View style={styles.radioContainer}>
                    <RadioButton.Item label="Individual" value="individual" />
                    <RadioButton.Item label="Business" value="business" />
                </View>
            </RadioButton.Group>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChangeText={(value) => handleChange('full_name', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date of Birth (YYYY-MM-DD)"
                    value={formData.date_of_birth}
                    onChangeText={(value) => handleChange('date_of_birth', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={formData.address}
                    onChangeText={(value) => handleChange('address', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    value={formData.contact_number}
                    onChangeText={(value) => handleChange('contact_number', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="National ID"
                    value={formData.nid}
                    onChangeText={(value) => handleChange('nid', value)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 16,
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
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#22ab20',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
    },
});

export default TinRegister;
