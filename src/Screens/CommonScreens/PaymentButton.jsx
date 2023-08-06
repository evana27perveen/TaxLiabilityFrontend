import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

const PaymentButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>Pay with BKash |</Text>
        <Image source={require('../../../assets/bkash_button.png')} style={styles.logo} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#d83386',
    shadowColor: '#080000',
    shadowOffset: {
      width: 8,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60, // Adjust the width as 
    height: 24, // Adjust the height as needed
    marginLeft: 8,
  },
  buttonText: {
    color: '#d83386',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default PaymentButton;
