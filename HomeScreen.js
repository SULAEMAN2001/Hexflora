import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Svg, { Path } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';

 
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDiseases();
    const intervalId = setInterval(fetchData, 5000);

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        syncDataWithServer();
      }
    });

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
 
      const filteredDiseases = diseases.filter((disease) =>
        disease.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const relatedItems = filteredDiseases.flatMap(disease =>
        disease.diseaseItems.map(diseaseItem => data.find(item => item.id === diseaseItem.itemId))
      ).filter(item => item);

      const uniqueItems = [...new Set([...filteredItems, ...relatedItems])];
      setFilteredData(uniqueItems);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data, diseases]);

  const downloadImage = async (url) => {
    const fileName = url.split('/').pop();
    const path = `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.downloadAsync(url, path);
      return path;
    } catch (error) {
      console.error('Error downloading image:', error.message);
      return null;
    }
  };

  const getImagePath = async (url) => {
    const fileName = url.split('/').pop();
    const path = `${FileSystem.documentDirectory}${fileName}`;
    const exists = await FileSystem.getInfoAsync(path);
    if (exists.exists) {
      return path;
    } else {
      return await downloadImage(url);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://backendapi-kyba.vercel.app/items');
      if (JSON.stringify(response.data) !== JSON.stringify(data)) {
        const itemsWithLocalImages = await Promise.all(response.data.map(async (item) => {
          const localImagePath = await getImagePath(item.image);
          return { ...item, localImagePath };
        }));
        setData(itemsWithLocalImages);
        await saveDataLocally(itemsWithLocalImages);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      await loadDataFromLocal();
      setLoading(false);
    }
  };

  const fetchDiseases = async () => {
    try {
      const response = await axios.get('https://backendapi-kyba.vercel.app/diseases');
      setDiseases(response.data);
    } catch (error) {
      console.error('Error fetching diseases:', error.message);
    }
  };

  const saveDataLocally = async (data) => {
    try {
      await AsyncStorage.setItem('localData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data locally:', error.message);
    }
  };

  const loadDataFromLocal = async () => {
    try {
      const localData = await AsyncStorage.getItem('localData');
      if (localData) {
        const parsedData = JSON.parse(localData);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Error loading data from local storage:', error.message);
    }
  };

  const saveUnsyncedData = async (data) => {
    try {
      await AsyncStorage.setItem('unsyncedData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving unsynced data:', error.message);
    }
  };

  const syncDataWithServer = async () => {
    try {
      const unsyncedData = await AsyncStorage.getItem('unsyncedData');
      if (unsyncedData) {
        const data = JSON.parse(unsyncedData);
        await axios.post('https://backendapi-kyba.vercel.app/sync-items', data);
        await AsyncStorage.removeItem('unsyncedData');
      }
    } catch (error) {
      console.error('Error syncing data with server:', error.message);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error && !data.length) {
    return (
      <View style={styles.centeredView}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
        <Svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="39" height="35"
         style={{top:'25%', left:'-40%' }}>
<Path d="M0 0 C0.804375 0.721875 1.60875 1.44375 2.4375 2.1875 C2.4375 3.5075 2.4375 4.8275 2.4375 6.1875 C3.076875 6.620625 3.71625 7.05375 4.375 7.5 C6.4375 9.1875 6.4375 9.1875 7.375 12.375 C7.46428449 17.82135415 6.45458631 21.84748115 2.8515625 26.02734375 C0.06649134 28.61174385 -1.67470461 30.07416442 -5.5 30.5625 C-6.5209375 30.376875 -6.5209375 30.376875 -7.5625 30.1875 C-7.8925 29.5275 -8.2225 28.8675 -8.5625 28.1875 C-9.2225 28.8475 -9.8825 29.5075 -10.5625 30.1875 C-14.00583548 30.72763106 -16.45386068 30.85312883 -19.5078125 29.01953125 C-22.9834571 26.1910255 -25.6203102 23.6890735 -26.5625 19.1875 C-26.69972443 16.17872729 -26.68049909 13.19647677 -26.5625 10.1875 C-25.2425 9.8575 -23.9225 9.5275 -22.5625 9.1875 C-22.68625 8.300625 -22.81 7.41375 -22.9375 6.5 C-22.5625 3.1875 -22.5625 3.1875 -19.8125 0.375 C-13.35139564 -3.97382024 -6.84230063 -3.4811705 0 0 Z M-7.5625 5.1875 C-8.90581654 7.18080842 -10.23844012 9.18134866 -11.5625 11.1875 C-14.33142056 12.77962932 -15.72035101 13.3240647 -18.875 12.8125 C-19.431875 12.60625 -19.98875 12.4 -20.5625 12.1875 C-20.2325 13.5075 -19.9025 14.8275 -19.5625 16.1875 C-13.6225 17.1775 -13.6225 17.1775 -7.5625 18.1875 C-7.2325 20.4975 -6.9025 22.8075 -6.5625 25.1875 C-5.5725 24.1975 -4.5825 23.2075 -3.5625 22.1875 C-3.92214844 21.29998047 -3.92214844 21.29998047 -4.2890625 20.39453125 C-6.73912801 13.86457404 -6.73912801 13.86457404 -5.8125 10.3125 C-5.4 9.61125 -4.9875 8.91 -4.5625 8.1875 C-4.2325 7.1975 -3.9025 6.2075 -3.5625 5.1875 C-4.8825 5.1875 -6.2025 5.1875 -7.5625 5.1875 Z " fill="#31F43E" transform="translate(29.5625,2.8125)"/>
<Path d="M0 0 C0.804375 0.721875 1.60875 1.44375 2.4375 2.1875 C2.4375 3.5075 2.4375 4.8275 2.4375 6.1875 C3.076875 6.620625 3.71625 7.05375 4.375 7.5 C6.4375 9.1875 6.4375 9.1875 7.1875 12.875 C7.31125 14.5146875 7.31125 14.5146875 7.4375 16.1875 C7.1075 15.1975 6.7775 14.2075 6.4375 13.1875 C2.8075 13.8475 -0.8225 14.5075 -4.5625 15.1875 C-4.8925 16.5075 -5.2225 17.8275 -5.5625 19.1875 C-7.32415803 14.07869171 -7.32415803 14.07869171 -7.5625 11.1875 C-5.6875 7.6875 -5.6875 7.6875 -3.5625 5.1875 C-4.8825 5.1875 -6.2025 5.1875 -7.5625 5.1875 C-7.789375 5.93 -8.01625 6.6725 -8.25 7.4375 C-9.88813343 10.86977957 -11.23117616 12.33676453 -14.5625 14.1875 C-18.3125 13.5625 -18.3125 13.5625 -21.5625 12.1875 C-23.15189347 9.00871306 -22.97826711 6.6918228 -22.5625 3.1875 C-15.89422856 -3.78387468 -8.44323788 -4.29568243 0 0 Z " fill="#2FF347" transform="translate(29.5625,2.8125)"/>
<Path d="M0 0 C1.9375 0.1875 1.9375 0.1875 4 1 C5.72101535 3.58152302 6 4.84918025 6 8 C7.65 8 9.3 8 11 8 C10.67 11.63 10.34 15.26 10 19 C8.35 19 6.7 19 5 19 C0.7202829 14.6230166 -1.14479202 11.45115108 -1.125 5.375 C-1.12757812 4.57835937 -1.13015625 3.78171875 -1.1328125 2.9609375 C-1 1 -1 1 0 0 Z " fill="#2DF23F" transform="translate(4,12)"/>
<Path d="M0 0 C4.54805635 -0.17835515 7.8794254 0.00214565 12 2 C12.94864076 6.03172323 13.41665964 8.18404153 11.5 11.9375 C9 14 9 14 5.375 14.4375 C2 14 2 14 0 12 C1.32 12 2.64 12 4 12 C3.98839844 11.37351562 3.97679687 10.74703125 3.96484375 10.1015625 C3.95582031 9.28429688 3.94679688 8.46703125 3.9375 7.625 C3.92589844 6.81289063 3.91429687 6.00078125 3.90234375 5.1640625 C4 3 4 3 5 1 C3.35 1 1.7 1 0 1 C0 0.67 0 0.34 0 0 Z " fill="#69FB47" transform="translate(10,19)"/>
<Path d="M0 0 C7.42608696 1.33913043 7.42608696 1.33913043 10.0625 4.375 C11.06103222 7.17089021 11.10342192 8.29160073 10 11 C10 10.01 10 9.02 10 8 C6.37 8.66 2.74 9.32 -1 10 C-1.33 11.32 -1.66 12.64 -2 14 C-3.76165803 8.89119171 -3.76165803 8.89119171 -4 6 C-2.125 2.5 -2.125 2.5 0 0 Z " fill="#69FC4C" transform="translate(26,8)"/>
<Path d="M0 0 C5.08758683 -0.29926981 7.79967972 0.11978038 12 3 C12.66 3 13.32 3 14 3 C12.61608877 6.34445214 11.30332265 8.39297817 8 10 C4.3125 9.3125 4.3125 9.3125 1 8 C-0.35439668 5.29120665 -0.06501451 2.99066732 0 0 Z " fill="#5EFC49" transform="translate(7,7)"/>
<Path d="M0 0 C2.875 0.6875 2.875 0.6875 6 2 C7.375 4.625 7.375 4.625 8 7 C5 8 5 8 2.375 7.3125 C0 6 0 6 -0.875 4 C-1 2 -1 2 0 0 Z " fill="#7BFE56" transform="translate(8,9)"/>
<Path d="M0 0 C0.66 0.66 1.32 1.32 2 2 C1.625 5.625 1.625 5.625 1 9 C-0.9375 9.5625 -0.9375 9.5625 -3 10 C-4 9 -4 9 -4.0625 6.4375 C-4.041875 5.633125 -4.02125 4.82875 -4 4 C-2.68 3.34 -1.36 2.68 0 2 C0 1.34 0 0.68 0 0 Z " fill="#76FE4D" transform="translate(21,21)"/>
<Path d="M0 0 C0.99 0 1.98 0 3 0 C3.04241723 2.33294775 3.04092937 4.66702567 3 7 C2 8 2 8 -0.5625 8.0625 C-1.366875 8.041875 -2.17125 8.02125 -3 8 C-2.45276317 4.62537285 -1.9451 2.91765 0 0 Z " fill="#024107" transform="translate(25,25)"/>
<Path d="M0 0 C2.97 0.495 2.97 0.495 6 1 C5.01 1.495 5.01 1.495 4 2 C3.34786708 4.02463255 3.34786708 4.02463255 3 6 C0.69 6.66 -1.62 7.32 -4 8 C-2.87548273 5.0280615 -1.77706209 2.66559313 0 0 Z " fill="#7EFE57" transform="translate(26,8)"/>
<Path d="M0 0 C1.875 0.25 1.875 0.25 4 1 C5.72101535 3.58152302 6 4.84918025 6 8 C3.23737447 7.6189482 2.15856106 7.16402868 0.1875 5.125 C-0.204375 4.42375 -0.59625 3.7225 -1 3 C-0.67 2.01 -0.34 1.02 0 0 Z " fill="#035107" transform="translate(4,12)"/>
<Path d="M0 0 C0.928125 0.0825 1.85625 0.165 2.8125 0.25 C3.1425 1.57 3.4725 2.89 3.8125 4.25 C0.11708414 5.20024979 -2.49208414 5.20024979 -6.1875 4.25 C-4.36434338 1.00883268 -3.82500054 0.30000004 0 0 Z " fill="#025207" transform="translate(28.1875,3.75)"/>
<Path d="M0 0 C2.31 0 4.62 0 7 0 C6.835 0.680625 6.67 1.36125 6.5 2.0625 C5.81917244 6.06236191 5.14208113 10.28416227 7 14 C4.69 13.67 2.38 13.34 0 13 C1.32 12.67 2.64 12.34 4 12 C3.98839844 11.37351562 3.97679687 10.74703125 3.96484375 10.1015625 C3.95582031 9.28429688 3.94679688 8.46703125 3.9375 7.625 C3.92589844 6.81289063 3.91429687 6.00078125 3.90234375 5.1640625 C4 3 4 3 5 1 C3.35 1 1.7 1 0 1 C0 0.67 0 0.34 0 0 Z " fill="#54F856" transform="translate(10,19)"/>
<Path d="M0 0 C1.98 0.495 1.98 0.495 4 1 C4.33 3.31 4.66 5.62 5 8 C4.67 7.01 4.34 6.02 4 5 C2.35 4.67 0.7 4.34 -1 4 C-0.67 2.68 -0.34 1.36 0 0 Z " fill="#67FD61" transform="translate(32,11)"/>
<Path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C1.67 1.66 1.34 2.32 1 3 C2.32 3.66 3.64 4.32 5 5 C4.67 5.66 4.34 6.32 4 7 C3.67 6.67 3.34 6.34 3 6 C0.67182036 5.63239269 -1.6618385 5.29758419 -4 5 C-2.68 3.35 -1.36 1.7 0 0 Z " fill="#45FA44" transform="translate(11,2)"/>
<Path d="M0 0 C2.0625 0.4375 2.0625 0.4375 4 1 C4 2.65 4 4.3 4 6 C2.68 5.67 1.36 5.34 0 5 C-0.5625 3.0625 -0.5625 3.0625 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z " fill="#88FE66" transform="translate(8,10)"/>
<Path d="M0 0 C2 2 2 2 2.125 4.625 C2.08375 5.40875 2.0425 6.1925 2 7 C1.01 7.33 0.02 7.66 -1 8 C-1.125 2.25 -1.125 2.25 0 0 Z " fill="#8EFE63" transform="translate(21,21)"/>
<Path d="M0 0 C2.97 0.495 2.97 0.495 6 1 C5.01 1.495 5.01 1.495 4 2 C3.34786708 4.02463255 3.34786708 4.02463255 3 6 C2.01 5.67 1.02 5.34 0 5 C0.33 4.34 0.66 3.68 1 3 C0.34 2.67 -0.32 2.34 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z " fill="#7AFD63" transform="translate(26,8)"/>
<Path d="M0 0 C0.66 0 1.32 0 2 0 C2 2.31 2 4.62 2 7 C1.01 7 0.02 7 -1 7 C-0.67 4.69 -0.34 2.38 0 0 Z " fill="#057410" transform="translate(26,25)"/>
<Path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C2.2884375 1.804375 2.2884375 1.804375 1.5625 2.625 C-0.28186076 5.42842836 -0.62456847 7.69620258 -1 11 C-1.33 11 -1.66 11 -2 11 C-2.28571429 3.57142857 -2.28571429 3.57142857 0 0 Z " fill="#5AFC45" transform="translate(17,20)"/>
</Svg>
          <Text style={styles.headerText}>Hexflora</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={styles.input}
          placeholder="Cari tanaman obat atau penyakit..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.searchIconContainer}>
          <Svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <Path
              d="M0 0 C2.97672584 1.77280561 5.42804007 3.85608015 7 7 C7.13357453 10.67329964 7.1671568 13.49852959 6 17 C7.32 18.32 8.64 19.64 10 21 C9.67 21.99 9.34 22.98 9 24 C6.50638429 22.79618552 4.31856917 21.54571278 2 20 C1.34 20.33 0.68 20.66 0 21 C-5.86390959 21.67660495 -5.86390959 21.67660495 -8.7578125 19.953125 C-12.32627792 17.02250123 -13.84665539 15.32898658 -14.375 10.75 C-13.88072704 5.80727042 -12.46171699 4.46171699 -9 1 C-5.85088521 -0.57455739 -3.47991184 -0.34799118 0 0 Z M-8.375 5.5625 C-10.34359806 8.01459258 -10.34359806 8.01459258 -9.9375 11.625 C-9.3249155 15.25516924 -9.3249155 15.25516924 -6 17 C-2.42823885 16.91832511 -2.42823885 16.91832511 1 16 C3.36139302 13.10538099 3.36139302 13.10538099 2.8125 9.4375 C2.35160238 5.74174248 2.35160238 5.74174248 -1 4 C-4.27935719 3.49548351 -5.58165416 3.72477247 -8.375 5.5625 Z"
              fill="#FFFFFF"
              transform="translate(14,0)"
            />
          </Svg>
        </View>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { item })}
              key={`plant-${item.id}`}
            >
              <View style={styles.itemContainer}>
                <Image
                  source={{ uri: `file://${item.localImagePath}` }}
                  style={styles.itemImage}
                />
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </KeyboardAvoidingView>
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
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 16,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    top:-20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 16,
    backgroundColor: '#28A745',
    paddingLeft: 35,
  },
  searchIconContainer: {
    position: 'absolute',
    top: 20,
    left: 24,
    zIndex: 1,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default HomeScreen;
