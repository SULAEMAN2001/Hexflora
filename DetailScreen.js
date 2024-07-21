import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DetailScreen = ({ route }) => {
  const { item } = route.params;
  return (
    <View style={styles.container}>
     <View style={styles.headerContainer}></View>
     <Text style={styles.itemName}>{item.name}</Text>
      <Image  source={{ uri: item.image }} style={[styles.itemImage, { width: '80%', height: 100 , marginLeft: '10%'}]} resizeMode="contain" image/>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View>
      <Text style={styles.text}>Pemanfaatan</Text>
      <Text style={styles.itemUtilization}>{item.pemanfaatan}
      </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    backgroundColor: '#4CAF50',
    paddingBottom: 16,
    paddingTop: 32,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    padding: 10,
    textAlign: 'center',
    top:-15
  },
  itemUtilization: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'justify',
    marginHorizontal: 10, 
  },
  itemDescription: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'justify',
    marginHorizontal: 10, 
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    padding: 10,
    textAlign: 'center'

  },
});

export default DetailScreen;
