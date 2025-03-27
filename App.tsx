import { StatusBar } from 'expo-status-bar';
import {useFonts} from "expo-font";
import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { StyleSheet, Text, View,Image, Button, SafeAreaView, ScrollView } from 'react-native';
//eas build -p android --profile preview
export default function App() {
  const allText = [
    {title:"Filipljanima 4:13",quote:"''Sve mogu u Hristu koji mi moć daje.''"},
    {title:"Matej 5:44",quote:"''Ljubite neprijatelje svoje, blagosiljajte one koji vas kunu, činite dobro onima koji vas mrze i molite se za one koji vas vrijeđaju i gone.''"},
    {title:"Matej 7:7",quote:"''Ištite i daće vam se, tražite i naći ćete, kucajte i otvoriće vam se.''"},
    {title:"Matej 6:33",quote:"''Ištite najprije Carstvo Božije i pravdu njegovu, i ovo će vam sve dodati.''"},
    {title:"Jakov 4:8",quote:"''Približite se Bogu, i On će se približiti vama. Očistite ruke, griješnici, popravite srca vaša, dvodušni.''"},
    {title:"Psalm 37:4",quote:"''Teši se Gospodom, i učiniće ti što ti srce želi.''"},
    {title:"Isus Navin 1:8",quote:"''Neka se ne rastavlja od usta tvojih knjiga ovoga zakona, nego razmišljaj o njemu dan i noć, da držiš i tvoriš sve kako je u njemu napisano jer češ tada biti srećan na putevima svojim i tada ćeš napredovati.''"},
    {title:"Luka 6:38",quote:"''Dajite i daće vam se, mjeru dobru i nabijenu i stresnu i prepunu daće vam u naručje vaše. Jer kakvom mjerom mjerite, onakvom će vam se mjeriti.''"},
    {title:"Jeremija 33:3",quote:"''Zovi me, i odazvaću ti se, i kazaću ti velike i tajne stvari za koje ne znaš.''"},
    {title:"Marko 11:25",quote:"''I kad stojite na molitvi, praštajte ako šta imate protiv koga, da i Otac vaš koji je na nebesima oprostiti vama sagrješenja vaša.''"}
  ]
  const allText2 = [
    {title:"Psalm 145:18",quote:"''Gospod je blizu svijeh koji ga prizivaju, svijeh koji ga prizivaju u istini.''"},
    {title:"Otkrivenje Jovana 22:20",quote:"''Govori Onaj koji svjedoči ovo: Da, doći ću skoro. Amin, da dođi, Gospode Isuse!.''"},
    {title:"Matej 7:7",quote:"''Ištite i daće vam se, tražite i naći ćete, kucajte i otvoriće vam se.''"},
    {title:"Matej 6:33",quote:"''Ištite najprije Carstvo Božije i pravdu njegovu, i ovo će vam sve dodati.''"},
    {title:"Jakov 4:8",quote:"''Približite se Bogu, i On će se približiti vama. Očistite ruke, griješnici, popravite srca vaša, dvodušni.''"},
    {title:"Psalm 37:4",quote:"''Teši se Gospodom, i učiniće ti što ti srce želi.''"},
    {title:"Isus Navin 1:8",quote:"''Neka se ne rastavlja od usta tvojih knjiga ovoga zakona, nego razmišljaj o njemu dan i noć, da držiš i tvoriš sve kako je u njemu napisano jer češ tada biti srećan na putevima svojim i tada ćeš napredovati.''"},
    {title:"Luka 6:38",quote:"''Dajite i daće vam se, mjeru dobru i nabijenu i stresnu i prepunu daće vam u naručje vaše. Jer kakvom mjerom mjerite, onakvom će vam se mjeriti.''"},
    {title:"Jeremija 33:3",quote:"''Zovi me, i odazvaću ti se, i kazaću ti velike i tajne stvari za koje ne znaš.''"},
    {title:"Marko 11:25",quote:"''I kad stojite na molitvi, praštajte ako šta imate protiv koga, da i Otac vaš koji je na nebesima oprostiti vama sagrješenja vaša.''"}
  ]

  const [text,setText]= useState("");
  const [quete,setQuete] = useState("");
  const [loaded,error] = useFonts({
    'Cardo-Bold':require('./assets/fonts/Cardo-Bold.ttf'),
    'Cardo-Italic':require('./assets/fonts/Cardo-Italic.ttf'),
    'Cardo-Regular':require('./assets/fonts/Cardo-Regular.ttf'),
  });
  useEffect(()=>{
    if (text!==""){
      Notifications.cancelAllScheduledNotificationsAsync();
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: text,
          body: quete,
          autoDismiss:false,
          sticky:true
        },
        trigger: null,
      });
    }

  },[text,quete])
  useEffect(()=>{
    if (loaded || error){
      console.log("Fonts are loading....");
    }
  },[loaded,error]);
  useEffect(()=>{
    const currentDate = new Date();
    let x = currentDate.getDate();
    const r = Math.floor(Math.random()*10);
    setText(allText[x%10].title);
    setQuete(allText[x%10].quote);
    console.log(r);
    console.log(x%10);
  },[])

  if (!loaded && !error){
    return null;  
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={require('./assets/orthodox-cross.png')} 
          resizeMode='contain'
          style={styles.crossImage}
          />
          <Text style={{fontFamily:'Cardo-Regular', fontSize:40}}>{text}</Text>
          <Text style={{fontFamily:'Cardo-Italic', fontSize:29,marginTop:15, marginLeft:20, marginRight:20}}>{quete}</Text>
          <View style={styles.button}>
            <Text style={styles.amin}>Amin</Text>
          </View>
          <StatusBar style="light" backgroundColor="#969595"/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:70,
    flex: 1,
    backgroundColor: '#969595',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  crossImage:{
    width:300,
    height:300
  },
  button:{
    marginTop:150
  },
  safeArea:{
    flex:1,
    backgroundColor: '#969595'
  },
  amin:{
    fontFamily:'Cardo-Bold',
    fontSize:50
  }
});
