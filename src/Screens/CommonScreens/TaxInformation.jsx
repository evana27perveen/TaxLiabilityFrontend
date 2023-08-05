import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon component you want to use

const TaxInformation = ({taxId, taxCategory, taxStatus}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F48FB1', '#FF4081']}
        style={[styles.card, { backgroundColor: 'transparent' }]}
      >
        <Icon name="id-card" size={28} color="#fff" />
        <Text style={styles.label}>Tax ID</Text>
        <Text style={styles.value}>{taxId}</Text>
      </LinearGradient>
      <LinearGradient
        colors={['#90CAF9', '#42A5F5']}
        style={[styles.card, { backgroundColor: 'transparent' }]}
      >
        <Icon name="users" size={28} color="#fff" />
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>
          {taxCategory === 'individual' ? 'Job-Holder' : 'Business Owner'}
        </Text>
      </LinearGradient>
      <LinearGradient
        colors={['#A5D6A7', '#66BB6A']}
        style={[styles.card, { backgroundColor: 'transparent' }]}
      >
        <Icon name="money" size={28} color="#fff" />
        <Text style={styles.label}>Tax Status</Text>
        <Text style={styles.value}>{taxStatus === true ? 'Paid' : 'Unpaid'}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  card: {
    width: '30%',
    padding: 16,
    borderRadius: 10,
    margin: 8,
    alignItems: 'center', 
  },
  label: {
    fontSize: 10,
    color: '#fff',
    marginTop: 8,
  },
  value: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TaxInformation;
