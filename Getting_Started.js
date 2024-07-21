import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Dimensions, Animated, Text, TouchableOpacity,Image   } from 'react-native';
import Svg, { Path, G, Circle, Defs, ClipPath, Rect, Filter , Use,FeFlood,FeColorMatrix, FeOffset,FeGaussianBlur,FeComposite,FeBlend,Pattern,path} from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

 
export default function App() {
  const navigation = useNavigation();
  const handleButtonPress = () => {
    navigation.navigate('Home');
  };  
  const windowWidth = Dimensions.get('window').width;
  const pageWidth = windowWidth;
  const pages = [
    (
      <View style={styles.pageContent} key={1}>
          
<Svg version="1.1" viewBox="0 0 2000 2000" width="128" height="128" xmlns="http://www.w3.org/2000/svg"
 style={{top:'-15%', left:'1%' }}>
<Path transform="translate(1826,327)" d="m0 0 5 2 4 5 6 16 7 34 13 77 6 33 13 87 10 76 5 46 5 63 3 48 2 45 1 38v74l-3 67-4 57-5 46-9 57-7 38-13 57-15 53-12 36-10 28-12 30-13 29-12 25-10 20-13 23-13 22-16 24-16 23-12 16-9 11-11 13-12 14-22 24-20 20-8 7-14 12-11 9-16 13-17 13-15 11-15 10-17 11-25 15-23 13-34 18-33 15-29 12-38 14-36 12-35 10-45 11-53 11-40 7-37 5-57 6-57 4-40 2h-52l-15-4-13-8-7-6-9-13-8-16-8-19-9-27-7-27-7-36-6-40-3-25-2-34v-26l2-35 4-38 7-47 10-47 7-25 13-37 6-17 8-21 15-33 14-28 10-18 12-21 8-13 22-33 9-12 7-10 14-18 10-12 8-10 9-10 13-15 23-23 5-6h2v-2l8-7 7-7 8-7 14-13 22-18 10-8 19-14 17-12 18-13 24-15 18-11 18-10 24-13 25-13 36-16 25-12 24-9 47-17 22-7 43-12 21-6 2-2h-7l-32 5-51 7-43 7-43 8-80 18-41 11-41 13-36 12-20 7-41 17-29 13-41 21-24 14-15 10-20 13-12 8-13 10-14 10-11 9-16 13-15 13-35 35-7 8-9 10-11 14-11 13-9 12-14 22-11 15-16 28-15 28-13 27-12 30-11 29-11 34-14 55-6 26-8 51-4 32-3 37-2 41v114l2 39 1 14v11l-1 1-9-1-7-6-7-14-12-36-9-26-10-31-9-29-10-35-12-44-7-34-7-44-8-64-3-39v-44l2-41 5-44 6-38 9-48 5-21 9-29 13-38 13-32 14-29 11-22 13-23 7-11 9-14 9-13 6-7 8-11 12-16 11-13 7-8 9-10 7-8 33-33 8-7 10-9 14-11 8-7 13-10 16-12 17-12 16-11 19-12 26-16 29-17 46-25 46-23 29-14 15-7 42-19 31-13 28-12 33-13 48-20 27-11 77-30 31-12 27-11 39-15 34-14 32-13 21-9 32-14 30-13 26-13 22-10 16-8 26-14 23-13 17-10 15-10 22-15 16-12 11-9 14-12 10-10 11-9 9-8 12-7z" fill="#B5DC35"/>
<Path transform="translate(476)" d="m0 0h56v2l4 2 12 9 12 8 16 11 34 24 18 13 14 10 18 13 19 14 30 23 14 11 18 14 14 11 11 9 17 14 14 11 13 11 11 9 13 11 11 9 10 9 8 7 10 9 8 7 20 18 16 15 8 8 8 7 23 23 4 3v2l4 2v2h2l7 8 19 19 7 8 9 9 7 8 13 14 9 11 7 7 7 8 12 14 9 11 11 13 13 17 14 18 14 19 10 13 16 24 7 15-2 5-8 6-22 10-25 11-30 13-42 19-20 9-33 16-23 11-16 8-27 14-22 12-23 13-29 17-25 16-21 14-19 13-18 13-13 10-10 8-13 11-22 18-9 9-8 7-12 11h-2v2l-5 5-16 15-20 20-7 8-9 9-7 8-13 16-12 15-12 16-10 14-9 13-9 15-8 13-16 29-10 21-18 45-1 2h-2l-4-11 1-17 1-45 4-36 7-43 8-39 9-36 12-37 14-39 14-36 13-30 11-25 8-16 15-28 17-33 12-22 16-32-5 3-14 20-10 14-16 21-11 15-11 16-13 18-11 15-9 13-22 33-19 32-13 22-12 21-18 34-10 19-16 34-14 32-15 39-14 39-11 41-7 30-7 39-5 35-3 32v71l3 30 5 33 8 39 7 28 13 41 18 46 12 27 10 19 11 21 14 24 13 22 11 18 12 24 9 27 14 45 13 38 7 25 3 10v8l-2 1-16-6-18-11-26-16-14-10-15-10-10-7-16-12-16-13-10-8-13-11-15-13-15-14-8-8-8-7-16-16-7-8-11-11-7-8-24-28-13-17-14-19-14-20-9-14-12-19-13-22-18-35-14-31-14-38-8-25-8-27-7-30-8-47-4-30-2-29v-45l2-32 5-43 7-44 9-45 14-53 16-55 12-35 12-36 15-41 8-20 17-44 19-45 13-32 11-26 11-25 12-28 15-34 12-28 11-25 7-15 14-33 11-26 8-19 11-26 15-37 7-17 6-17 7-18 13-36 12-39 12-41 9-39 6-36 5-43z" fill="#025F2E"/>
</Svg>

         
<View>
<Text style={{
  color: 'green',
  fontSize: 20,
  fontWeight: 500,
  top: -55,
  textAlign: 'center',
  maxWidth: '70%',  
  marginLeft: 'auto',  
  marginRight: 'auto',  
}}>
  Tanaman obat telah menjadi teman setia manusia sejak zaman kuno, memberikan kesehatan dan penyembuhan alami.
</Text>
 
</View>
</View>
    ),
    (
      <View style={styles.pageContent} key={2}>
    
<Svg version="1.1" viewBox="0 0 1208 1324" width="128" height="128" xmlns="http://www.w3.org/2000/svg"
  style={{top:'-15%', left:'-3%' }}>
<Path transform="translate(0)" d="m0 0h1208v1324h-1208z" fill="#FEFEFE"/>
<Path transform="translate(641,245)" d="m0 0h1v7l-9 36-6 22-3 19-5 47-2 21-1 29 2 20 7 36 9 36 17 52 11 29 12 34 10 30 2 3 6-9 15-26 11-18 16-24 10-14 21-28 14-20 8-14 8-17 9-24 5-15 5-18 2-1v16l-2 19-6 25-8 24-10 24-9 16-12 18-10 14-10 15-11 17-11 18-10 19-11 23-10 22-6 13-8 21-4 18-4 48v43l5-4 7-8 11-10 14-11 16-12-18-1-16-4-12-7-2-4 1-18 4-16 7-14 5-5 7-6 10-5 19-6 39-10 25-8h1l-1 15-5 20-9 21-10 16-10 11-1 3 23-9 30-10 31-9h3v-2l-4-1-10-9-4-9v-9l3-10 7-11 9-10 12-10 15-10 10-5h2v52l-4 10-5 5-7 6-12 7-2 2 10-2 20-8 29-13 17-9 14-9 16-12 10-9 11-9 13-12 15-14 6-6 2 1-2 9-11 21-8 11-9 10-7 8-7 7-8 7-13 11-20 14-26 15-21 12-33 17-26 12-11 5 1 2 20 8 27 13 19 12 14 12 10 12 6 10 5 12v6l-4-2-8-10-7-8-14-9-23-11-22-10-20-7-10-2h-20l-17 3-24 8-16 9-14 11-10 12-8 14-6 15-4 14-7 44-1 14v70l3 63 6 95 1 43v25l-1 43h-90l10-66 6-51 3-41 1-18v-59l-4-54-2-25-1-23-14-16-14-11-17-11-32-15-29-11-30-12-9-3h-9l-23 5-24 8-28 9-21 3-25 2-5-1 4-3 34-14 29-15 19-10 11-6 3-1-5-5-17-13-13-10-13-11-11-9-13-11-14-12-16-16-7-8-9-12-9-16-7-18-2-9-1-19 2-1 4 4 12 25 8 12 11 14 12 13 11 11 11 9 20 15 21 14 11 6-4-7-9-10-9-14-9-25-4-22v-15l3-16 11-34 3-11 2-10h4l10 10 20 12 18 10 16 10 11 10 8 10 6 11 6 14 2 10v20l-4 16-8 14-8 10-8 8-11 7-12 4-14 1 22 13 21 11 28 11 28 10 21 8 17 6 21 9 15 9 3 1 8-56 1-11v-14l-2-25-5-24-8-26-8-19-7-11-10-6-12-3h-20l-21 3-10 1-1-4 11-8 15-7 23-8-2-4-12-13-25-25-4-5-16-16-9-11-13-16-10-15-10-19-3-10v-13l3 1 10 19 11 18 10 13 8 9 11 9 12 10 19 13 18 13 11 9 10 9 37 37 6 8 2-1 6-29 1-7v-19l-4-23-6-22-14-37-12-31-5-17-5-22-4-31-2-27v-49l3-33 5-32 6-28 8-26 12-29 8-16z"/>
<Path transform="translate(948,902)" d="m0 0h19l14 4 15 8 10 8 8 8 8 14 5 13 4 19 1 9v23l-3 19-6 20-7 17-6 11-13 24-8 17-4 12-3 19-3-1-9-19-9-14-11-14-9-10-11-12-12-13-11-13-13-18-11-19-8-17-5-15-2-9v-20l3-10 5-9 9-10 11-7 12-4 21-4 10-5z"/>
<Path transform="translate(760,298)" d="m0 0 4 2 11 11 18 13 13 10 8 9 7 14 1 6v11l-3 18-4 12-7 8-7 3h-10l-8-2-8-4-9-8-4-4-1 1v8l6 23 11 33 3 16v25l-4 15-5 13-7 11-9 10-12 9-14 7-16 4-8 1h-13l-16-3-12-5-10-9-6-9-5-15-1-5v-20l5-21 8-16 7-11 9-11 11-12 8-8 14-11 14-8 20-9 17-7 4-1-1-6-5-16-1-8v-25l3-22 3-15z"/>
<Path transform="translate(351,942)" d="m0 0h15l15 4 16 8 11 9 12 12 10 14 8 14 6 14 3 12 1 7v19l-3 15-5 14-6 10-8 11-7 7-4 5-8 7-13 11-19 13-14 9-3 2h-3l-10-19-17-25-10-15-8-17-7-21-3-16-1-10v-17l2-15 4-14 7-13 7-9 11-11 14-11z"/>
<Path transform="translate(1205,487)" d="m0 0h3v5l-7 11-8 17-12 36-8 26-10 23-9 17-12 17-13 13-13 8-9 4h-19l-12-5-13-10-8-10-6-5-8-6-9-10-6-12-2-7-1-10v-10l2-13 5-12 6-10 11-13h2v-2l14-11 16-9 11-5 17-5 19-3 40-2 26-3 11-3z"/>
<Path transform="translate(733,880)" d="m0 0 19 2 22 5 19 8 14 9 13 11 10 14 6 13 3 12 1 11v19l-5 25-6 16-7 11-8 12-9 13-7 14-4-2-8-8-11-9-9-8-11-9-13-11-10-10-8-10-8-13-5-12-4-15-2-13v-18l3-14 7-17 10-18 6-7z"/>
<Path transform="translate(489,121)" d="m0 0 5 1 12 6 26 9 15 6 16 9 11 9 11 11 9 14 8 17 4 12 2 14v55l-2 7-11 7-11 3h-23l-15-3-18-7-11-7-12-9-12-12-7-9-9-17-6-21-1-13 2-19 4-17 12-38z"/>
<Path transform="translate(1057,668)" d="m0 0h10l14 2 17 6 12 7 11 9 7 8 11 14 8 13 11 23 4 13 3 20 3 37-8-1-10-2-18-1-44-1-17-3-13-5-8-4-11-8-10-9-7-10-6-12-4-14-1-6v-21l4-18 6-14 7-9 9-8 9-4z"/>
<Path transform="translate(122,803)" d="m0 0h16l17 3 13 5 11 6 11 9 8 8 9 13 5 11 4 14v16l-4 10-7 8-9 5-12 5-35 10-5 1h-25l-16-3-20-9-11-7-10-9-14-17-11-12-10-7-3-2 2-4 7-5 5-5 13-11 18-13 16-9 14-6 15-4z"/>
<Path transform="translate(739,89)" d="m0 0h20l1 3-2 3h-2l-2 4-3 8-2 21-2 45-4 21-7 17-8 11-9 9-14 7-19 3h-12l-19-2-8-3-12-11-8-10-9-16-5-17-1-7v-9l3-14 5-11 6-10 9-10 13-11 15-9 18-6 22-4z"/>
<Path transform="translate(1085,823)" d="m0 0h21l17 4 11 5 14 8 13 8 12 6 12 4v3l-10 18-10 15-8 11-9 10-7 8-18 13-17 8-16 5-5 1h-20l-17-4-16-7-12-8-11-11-9-14-4-9-1-4v-12l6-9 7-8 8-7 15-12 18-11 13-6 15-4z"/>
<Path transform="translate(800,133)" d="m0 0 4 1 14 11 18 12 14 10 11 9 9 10 9 16 6 18 2 10 1 12v12l-3 20-7 16-6 9-9 10-12 9-13 5h-14l-15-5-13-9-10-9-9-10-9-16-4-13-1-15 3-15 4-12 13-26 10-19 5-15 2-10z"/>
<Path transform="translate(247,775)" d="m0 0h16l21 4 14 5 19 10 10 8 12 11 8 11 6 12 3 10v28l-3 22-4 10-5 6-11 6h-20l-17-4-18-7-16-10-20-20-11-15-8-13-10-18-15-33-2-5 1-4 22-8 21-5z"/>
<Path transform="translate(150,373)" d="m0 0 5 1 14 5 21 5 16 4 16 7 13 9 13 11 11 14 13 25 7 21 5 22v11l-9 8-13 6-16 4h-16l-20-4-21-8-9-5-11-8-11-10-12-18-5-12-4-16v-17l5-22 4-14z"/>
<Path transform="translate(393,250)" d="m0 0h28l19 4 15 5 20 10 15 10 10 8 6 5 3 4v9l-6 16-8 11-12 12-13 8-14 7-13 4-9 2-10 1h-14l-24-5-15-7-14-10-8-8-10-17-7-16-7-15-5-9 5-2 14-4 23-12 12-6z"/>
<Path transform="translate(323,502)" d="m0 0 5 1 10 21 21 32 7 15 3 12v22l-4 13-7 12-9 10-9 8-10 6-16 7-12 3h-18l-12-3-8-4-10-9-7-8-5-10-3-12-1-17 2-18 5-15 7-14 11-16 13-12 13-9 16-8z"/>
<Path transform="translate(428,384)" d="m0 0 4 1 6 8 9 9 11 9 10 9 9 9 9 13 7 14 3 10 1 7v16l-3 14-5 12-7 11-13 13-13 9-9 3-9-1-14-4-15-9-13-10-8-8-11-15-8-15-4-13-1-5v-18l4-13 6-11 11-12 15-10 10-6 8-6 2-3h2v-2l5-5z"/>
<Path transform="translate(1e3 534)" d="m0 0h5v18l4 22 4 21 1 20-3 18-6 16-6 11-8 10-11 11-13 8-16 8-11 5-6 2h-7l-9-7v-2h-2l-9-12-9-15-5-11-3-13v-15l3-14 4-12 7-14 8-11 9-10 13-11 16-9 21-7z"/>
<Path transform="translate(963,299)" d="m0 0h6l2 4 1 11v31l-2 14-5 16-7 16-9 14-11 12-7 6-14 7-11 3-13 1-15-2-16-6-13-7-12-11-4-7-2-9v-20l3-12 6-11 8-11 9-9 14-10 16-8 19-5 20-3z"/>
<Path transform="translate(218,648)" d="m0 0 18 2 12 5 11 7 10 9 8 11 6 13 3 12v16l-3 10-6 10-9 10-13 8-13 4-11 2h-14l-20-3-14-4-14-6-13-8-12-8-19-13-8-6 1-4 10-15 12-14 9-9 17-12 17-9 14-5z"/>
<Path transform="translate(233,912)" d="m0 0 14 1 17 4 24 9 19 9 6 5 1 4v8l-5 12-10 21-5 10-7 10-9 10-11 8-12 7-16 4h-23l-16-3-13-5-11-6-15-13-14-14v-2l-3-1 1-4 5-2 2-4 7-11 13-18 11-13 9-9 12-9 11-5 9-2z"/>
<Path transform="translate(1044,339)" d="m0 0 2 4 3 15 6 19 10 27 4 15 2 15v11l-2 16-7 21-7 11-6 7-11 7-11 4-9 1h-12l-16-2-16-6-12-7-8-8-5-10-1-3v-18l4-13 8-15 10-14 11-12 5-6 8-7 15-13 12-11 12-12 8-12 1-3z"/>
<Path transform="translate(514,473)" d="m0 0 11 6 34 17 12 8 10 9 8 9 6 11 5 13 3 12 1 8v20l-4 15-6 11-9 10-9 8-6 3h-24l-12-5-11-7-10-9-8-9-5-8-4-12v-21l5-19 9-24 5-19 1-7v-10z"/>
<Path transform="translate(928,440)" d="m0 0 3 1 6 43v16l-3 13-7 14-9 11-10 10-18 11-16 6-10 2h-26l-15-4-12-6-7-7-2-6 5-18 8-19 6-12 8-11 11-12 10-9 14-8 11-4 15-3 21-3z"/>
<Path transform="translate(808,578)" d="m0 0h17l22 5 19 5 13 2 2 1-3 12v42l-5 14-7 10-8 7-14 8-12 3-7 1h-19l-20-4-12-4-11-6-9-8-5-10-2-9 1-14 4-13 6-12 7-9 10-10 12-6 14-4z"/>
<Path transform="translate(743,270)" d="m0 0 5 1-1 33-4 29-5 16-7 14-8 10-9 8-11 6-13 5-5 1h-17l-18-4-15-5-5-5-4-12-1-5v-17l3-14 5-12 6-11 10-13 10-8 14-8 13-4 25-3z"/>
<Path transform="translate(557,744)" d="m0 0 5 1 13 13 8 7 17 17 9 14 5 12 3 16v17l-2 13-4 13-7 14-9 9-10 6-9 3h-11l-10-6-10-8-9-9-9-14-4-10-2-10v-18l4-20 7-17 11-21 10-16z"/>
<Path transform="translate(144,534)" d="m0 0h19l16 5 11 6 12 9 11 11 9 14 5 13 1 12-2 10-3 6-8 7-8 4-11 3h-23l-12-3-16-8-11-9-9-11-8-13-6-11-8-20-5-14 1-5 35-5z"/>
<Path transform="translate(946,762)" d="m0 0h20l18 6 11 6 14 11 9 11 9 17-1 4-12 5-8 6-2 3h-2l-2 4-12 13-8 8-10 6-11 3h-13l-13-3-10-6-7-7-5-9-9-20-2-8 1-12 4-11 6-9h2v-2l11-8 14-6z"/>
<Path transform="translate(490,929)" d="m0 0h13l11 4 5 4 7 10 5 12 2 12v28l-5 36v19l2 8-4-2-11-9-27-14-14-8-16-13-8-10-6-10-5-14-1-12 3-12 6-10 9-8 9-4z"/>
<Path transform="translate(420,557)" d="m0 0h7l9 3 11 8 10 11 7 10 4 10v15l-4 12-7 9-10 10-14 8-12 5-15 2-45 1-13 2 2-4 7-10 6-12 8-21 7-17 9-16 10-13 11-9 7-3z"/>
<Path transform="translate(545,312)" d="m0 0 17 1 17 4 5 3 4 5 1 4v16l-3 13-8 16-11 12-11 8-16 8-11 4-15 3-10 1h-23l-9-2-6-4 6-7 9-13 9-16 10-19 8-12 9-10 7-7 12-6z"/>
<Path transform="translate(343,370)" d="m0 0h2l4 26 1 9v28l-3 18-5 13-6 9-7 7-10 5-3 1h-17l-5-2-5-7-5-16-2-12v-18l3-10 6-9 9-9 13-10 12-9 11-9 5-4z"/>
<Path transform="translate(458,650)" d="m0 0 5 1 17 6 31 8 12 5 9 7 6 9 2 6 1 12v10l-3 5-6 4-10 3h-8l-12-3-12-7-12-11-6-7-7-14-6-18-1-5z"/>
<Path transform="translate(366,674)" d="m0 0 3 1 6 20 3 17v22l-3 10-5 9-9 8-5 2-8 1-7-2-6-8-4-9-4-15v-8l4-11 6-8 23-23 4-5z"/>
<Path transform="translate(517,421)" d="m0 0h24l14 3 12 5 10 9 4 7 1 4v7l-3 9-6 4-16 4h-17l-7-3-11-8-6-7-10-15-9-11-3-5 3-1z"/>
</Svg>

 
<View>
<Text style={{
  color: 'green',
  fontSize: 20,
  fontWeight: 500,
  top: -50,
  textAlign: 'center',
  maxWidth: '70%',  
  marginLeft: 'auto',  
  marginRight: 'auto',  
}}>
  Dalam dunia alam, keberagaman tumbuhan tidak hanya terletak pada warna dan aroma, tetapi juga pada keindahan bentuk dan strukturnya
</Text>

<TouchableOpacity onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>MULAI SEKARANG</Text>
      </TouchableOpacity>
</View>

      </View>
    ),
  ];

  const [activePage, setActivePage] = useState(0);

  const scrollX = new Animated.Value(0);

  // Menghitung posisi elips berdasarkan halaman aktif
  const elipsPosition = Animated.divide(scrollX, pageWidth);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <ScrollView
        horizontal
        pagingEnabled
        style={styles.container}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      >
        {pages.map((pageContent) => (
          <View key={pageContent.key} style={[styles.page, { width: pageWidth }]}>
            {pageContent}
          </View>
        ))}
      </ScrollView>

      {/* Penanda elips */}
      <View style={styles.elipsContainer}>
        {pages.map((_, index) => {
          const elipsStyle = {
            opacity: elipsPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            }),
          };
          return (
            <Animated.View key={index} style={[styles.elips, elipsStyle]} />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: -45,
  },
  elips: {
    top:'-40%',
    width: 10,
    height: 10,
    borderRadius: 5,  
    backgroundColor: 'green',  
    margin: 5,
  },
  button: {
    top:170,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems:'center',
  },
  logo: {
    width: 100,
    height: 100,
    position: 'absolute', // Menempatkan elemen ini pada posisi absolut
    top: '-15%', // Mengatur posisi vertikal ke tengah
    left: '1%', // Mengatur posisi horizontal ke tengah
    transform: [{ translateX: -50 }, { translateY: -50 }], // Menggeser elemen sehingga pusat gambar tepat di tengah
},
});
