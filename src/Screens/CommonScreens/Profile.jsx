import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCookies } from 'react-cookie';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../apiConfig';
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
  const [token, removeToken] = useCookies(['myToken']);
  const [userID, removeUserID] = useCookies(['userID']);
  const [profile, removeProfile] = useCookies(['profile']);
  const [taxPayer, removeTaxPayer] = useCookies(['taxPayer']);
  const [profileInfo, setProfileInfo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json', 
        },
      });

      if (response.ok) {
        const result = await response.json();
        const authenticatedUserProfile = result.find(item => item.user === userID.userID);
        if (authenticatedUserProfile) {
          setProfileInfo(authenticatedUserProfile); 
        } else {
          console.error('Authenticated user does not have a Profile');
        }
      } else {
        console.error('Failed to fetch user profile data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleLogout = () => {
    removeToken('myToken', { path: '/' });
    removeTaxPayer('taxPayer', { path: '/' });
    removeProfile('profile', { path: '/' });
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {profileInfo ? (
          <React.Fragment>
            
            <Text style={styles.header}>{profileInfo.full_name}</Text>
            
            <View style={styles.profileInfor}>
              <Text style={styles.label}>E.ID:</Text>
              <Text style={styles.value}>{profileInfo.employee_id}</Text>
            </View>
            
            <View style={styles.profileInfor}>
              <Text style={styles.label}>Salary:</Text>
              <Text style={styles.value}>৳. {profileInfo.salary}</Text>
            </View>
            <View style={styles.profileInfor}>
              <Text style={styles.label}>I.Tax:</Text>
              <Text style={styles.value}>৳. {profileInfo.tax}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => {navigation.navigate('UpdateMe');}}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={handleLogout}>
                <Text style={styles.editButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ) : (
          <Text>Loading profile data...</Text>
        )}
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
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#275c27',
  },
  profileInfor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
    
  },
  value: {
    fontSize: 16,
    color: '#666',
    flex: 2,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row', // Display buttons in the same row
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#22ab20',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 5, 
    marginLeft: 5, // Add spacing between buttons
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Profile;
