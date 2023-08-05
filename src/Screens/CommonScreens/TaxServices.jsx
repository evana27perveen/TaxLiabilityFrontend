import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TaxServices = () => {
  // Replace the dummy data with actual tax services information
  const taxServices = [
    'Tax Filing',
    'Tax Consultation',
    'Tax Planning',
    'Tax Audit Assistance',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tax Services</Text>
      {taxServices.map((service, index) => (
        <TouchableOpacity key={index} style={styles.serviceButton}>
          <LinearGradient
            colors={['#449647', '#33a839']}
            style={styles.gradient}
          >
            <Text style={styles.serviceButtonText}>{service}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#275c27',
  },
  serviceButton: {
    marginBottom: 8,
  },
  gradient: {
    padding: 10,
    borderRadius: 5,
  },
  serviceButtonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TaxServices;
