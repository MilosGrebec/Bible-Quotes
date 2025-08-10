import { StatusBar } from 'expo-status-bar';
import {useFonts} from "expo-font";
import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { StyleSheet, Text, View,Image, Button, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    {title:"Matej 6:16",quote:"''A kad postite, ne budite sumorni kao licemerji; jer oni natmure lice svoja da se pokažu ljudima kako poste. Zaista vam kažem: primili su platu svoju.''"},
    {title:"Luka 22:27",quote:"''Jer ko je veći, koji sjedi za trpezom ili koji služi? Nije li onaj koji sjedi za trpezom? A ja sam među vama kao sluga.''"},
    {title:"Luka 21:9",quote:"''A kad čujete za ratove i nemire, nemojte se uplašitič jer sve to najprije treba da bude, ali nije odmah kraj.''"},
    {title:"Matej 25:13",quote:"''Stražarite, dakle, jer ne znate dana ni časa u koji će Sin Čovječiji doći.''"},
    {title:"Matej 26:46",quote:"''I ovi će otići u muku vječnu, a pravednici u život vječni''"},
    {title:"Luka 4:4",quote:"''I odgovori mu Isus govoreći: Pisano je: Ne živi čovjek samo o hljebu, nego o svakoj riječi Božijoj.''"},
    {title:"Isaija 41:10",quote:"''Ne boj se, jer ja sam s tobom; ne plaši se, jer sam ja Bog tvoj; ukrijepiću te i pomoći ću ti i poduprijepiću te desnicom pravde svoje.''"},
    {title:"Isaija 42:29",quote:"''Gledaš mnogo, ali ne vidiš; otvorene su ti uši, ali ne čuješ.''"}
  ]
    const allText3 = [
    {title:"Prva Petrova 4:8",quote:"''A pre svega imajte istrajnu ljubav među sobom; jer ljubav pokriva mnoštvo grijehova.''"},
    {title:"Prva Korinćanima",quote:"''A sad ostaje samo vjera, nada, ljubav, ovo troje; ali od njih najveća je ljubav.''"},
    {title:"Efescima 4:15",quote:"''Dakle pazite dobro kako živite, ne kao nemudri, nego kao mudri.''"},
    {title:"Efescima 4:2",quote:"''I živite kao što je Hristos nas ljubio i predao sebe za nas kao prinos i žrtvu Bogu na prijatni miris.''"},
    {title:"Rimljanima 8:31",quote:"''Šta ćemo dakle reći za ovo? ako je Bog s nama, ko će protiv nas?''"},
    {title:"Druga Timoteju 4:8",quote:"''Sad me čeka vijenac pravde, koji će mi u onaj Dan dati Gospod, pravedni Sudija; ali ne samo meni, nego i svima koji s ljubavlju očekuju Dolazak njegov.''"},
    {title:"Psalm 145:18",quote:"''Gospod je blizu svijeh koji ga prizivaju, svijeh koji ga prizivaju u istini.''"},
    {title:"Psalm 145:1",quote:"''Uzvisivaću te, Bože blagosiljavaću ime tvoje od vijeka do vijeka.''"},
    {title:"Rimljanima 8:18",quote:"''Jer mislim da stradanja sadašnjega vremena nisu ništa prema slavi koja će nam se otkriti.''"},
    {title:"Otkrivenje Jovana 21:4",quote:"'I Bog će ptrti svaku suzu iz očiju njihovih, i smrti neće biti više, ni žalosti ni jauka, ni bola neće biti više; jer prvo prođe.''"}
  ]
      const allText4 = [
    {title:" Prva Petrova 4:8",quote:"''A pre svega imajte istrajnu ljubav među sobom; jer ljubav pokriva mnoštvo grijehova.''"},
    {title:"Matej 9:37",quote:"''Tada reče učenicima svojim: Žetve je mnogo, a poslenika malo.''"},
    {title:"Rimljanima 8:28",quote:"''A znamo da onima koji ljube Boga sve pomaže na dobro, njima koji su pozvani po namjeri.'"},
  ]
    const BigText=[
    {title:"Filipljanima 4:13",quote:"''Sve mogu u Hristu koji mi moć daje.''"},
    {title:"Matej 5:44",quote:"''Ljubite neprijatelje svoje, blagosiljajte one koji vas kunu, činite dobro onima koji vas mrze i molite se za one koji vas vrijeđaju i gone.''"},
    {title:"Matej 7:7",quote:"''Ištite i daće vam se, tražite i naći ćete, kucajte i otvoriće vam se.''"},
    {title:"Matej 6:33",quote:"''Ištite najprije Carstvo Božije i pravdu njegovu, i ovo će vam sve dodati.''"},
    {title:"Jakov 4:8",quote:"''Približite se Bogu, i On će se približiti vama. Očistite ruke, griješnici, popravite srca vaša, dvodušni.''"},
    {title:"Psalm 37:4",quote:"''Teši se Gospodom, i učiniće ti što ti srce želi.''"},
    {title:"Isus Navin 1:8",quote:"''Neka se ne rastavlja od usta tvojih knjiga ovoga zakona, nego razmišljaj o njemu dan i noć, da držiš i tvoriš sve kako je u njemu napisano jer češ tada biti srećan na putevima svojim i tada ćeš napredovati.''"},
    {title:"Luka 6:38",quote:"''Dajite i daće vam se, mjeru dobru i nabijenu i stresnu i prepunu daće vam u naručje vaše. Jer kakvom mjerom mjerite, onakvom će vam se mjeriti.''"},
    {title:"Jeremija 33:3",quote:"''Zovi me, i odazvaću ti se, i kazaću ti velike i tajne stvari za koje ne znaš.''"},
    {title:"Marko 11:25",quote:"''I kad stojite na molitvi, praštajte ako šta imate protiv koga, da i Otac vaš koji je na nebesima oprostiti vama sagrješenja vaša.''"},
    {title:"Psalm 145:18",quote:"''Gospod je blizu svijeh koji ga prizivaju, svijeh koji ga prizivaju u istini.''"},
    {title:"Otkrivenje Jovana 22:20",quote:"''Govori Onaj koji svjedoči ovo: Da, doći ću skoro. Amin, da dođi, Gospode Isuse!.''"},
    {title:"Matej 6:16",quote:"''A kad postite, ne budite sumorni kao licemerji; jer oni natmure lice svoja da se pokažu ljudima kako poste. Zaista vam kažem: primili su platu svoju.''"},
    {title:"Luka 22:27",quote:"''Jer ko je veći, koji sjedi za trpezom ili koji služi? Nije li onaj koji sjedi za trpezom? A ja sam među vama kao sluga.''"},
    {title:"Luka 21:9",quote:"''A kad čujete za ratove i nemire, nemojte se uplašitič jer sve to najprije treba da bude, ali nije odmah kraj.''"},
    {title:"Matej 25:13",quote:"''Stražarite, dakle, jer ne znate dana ni časa u koji će Sin Čovječiji doći.''"},
    {title:"Matej 26:46",quote:"''I ovi će otići u muku vječnu, a pravednici u život vječni''"},
    {title:"Luka 4:4",quote:"''I odgovori mu Isus govoreći: Pisano je: Ne živi čovjek samo o hljebu, nego o svakoj riječi Božijoj.''"},
    {title:"Isaija 41:10",quote:"''Ne boj se, jer ja sam s tobom; ne plaši se, jer sam ja Bog tvoj; ukrijepiću te i pomoći ću ti i poduprijepiću te desnicom pravde svoje.''"},
    {title:"Isaija 42:29",quote:"''Gledaš mnogo, ali ne vidiš; otvorene su ti uši, ali ne čuješ.''"},
    {title:"Prva Petrova 4:8",quote:"''A pre svega imajte istrajnu ljubav među sobom; jer ljubav pokriva mnoštvo grijehova.''"},
    {title:"Prva Korinćanima",quote:"''A sad ostaje samo vjera, nada, ljubav, ovo troje; ali od njih najveća je ljubav.''"},
    {title:"Efescima 4:15",quote:"''Dakle pazite dobro kako živite, ne kao nemudri, nego kao mudri.''"},
    {title:"Efescima 4:2",quote:"''I živite kao što je Hristos nas ljubio i predao sebe za nas kao prinos i žrtvu Bogu na prijatni miris.''"},
    {title:"Rimljanima 8:31",quote:"''Šta ćemo dakle reći za ovo? ako je Bog s nama, ko će protiv nas?''"},
    {title:"Druga Timoteju 4:8",quote:"''Sad me čeka vijenac pravde, koji će mi u onaj Dan dati Gospod, pravedni Sudija; ali ne samo meni, nego i svima koji s ljubavlju očekuju Dolazak njegov.''"},
    {title:"Psalm 145:18",quote:"''Gospod je blizu svijeh koji ga prizivaju, svijeh koji ga prizivaju u istini.''"},
    {title:"Psalm 145:1",quote:"''Uzvisivaću te, Bože blagosiljavaću ime tvoje od vijeka do vijeka.''"},
    {title:"Rimljanima 8:18",quote:"''Jer mislim da stradanja sadašnjega vremena nisu ništa prema slavi koja će nam se otkriti.''"},
    {title:"Otkrivenje Jovana 21:4",quote:"'I Bog će ptrti svaku suzu iz očiju njihovih, i smrti neće biti više, ni žalosti ni jauka, ni bola neće biti više; jer prvo prođe.''"},
    {title:"Otkrivljenje Jovana 16:2",quote:"''I otide prvi anđeo, i izli čašu svoju na zemlju; i nastadoše rane zle i ljute na ljudima koji imaju žig zvijerijin i koji se klanjaju liku njezinom.''"},
    {title:"Matej 9:37",quote:"''Tada reče učenicima svojim: Žetve je mnogo, a poslenika malo.''"},
    {title:"Rimljanima 8:28",quote:"''A znamo da onima koji ljube Boga sve pomaže na dobro, njima koji su pozvani po namjeri.'"},
  ]
    const BigTextEnglish = [
  { title: "Philippians 4:13", quote: "''I can do all things through Christ who gives me strength.''" },
  { title: "Matthew 5:44", quote: "''Love your enemies, bless those who curse you, do good to those who hate you, and pray for those who abuse and persecute you.''" },
  { title: "Matthew 7:7", quote: "''Ask and it will be given to you; seek and you will find; knock and it will be opened to you.''" },
  { title: "Matthew 6:33", quote: "''But seek first the Kingdom of God and His righteousness, and all these things will be added to you.''" },
  { title: "James 4:8", quote: "''Draw near to God, and He will draw near to you. Cleanse your hands, you sinners; purify your hearts, you double-minded.''" },
  { title: "Psalm 37:4", quote: "''Delight yourself in the Lord, and He will give you the desires of your heart.''" },
  { title: "Joshua 1:8", quote: "''Do not let this Book of the Law depart from your mouth; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful.''" },
  { title: "Luke 6:38", quote: "''Give, and it will be given to you: a good measure—pressed down, shaken together, and running over—will be poured into your lap. For with the measure you use, it will be measured back to you.''" },
  { title: "Jeremiah 33:3", quote: "''Call to Me, and I will answer you, and tell you great and hidden things you do not know.''" },
  { title: "Mark 11:25", quote: "''And when you stand praying, forgive if you have anything against anyone, so that your Father in heaven may forgive you your trespasses.''" },
  { title: "Psalm 145:18", quote: "''The Lord is near to all who call on Him, to all who call on Him in truth.''" },
  { title: "Revelation 22:20", quote: "''He who testifies to these things says, ‘Yes, I am coming soon.’ Amen. Come, Lord Jesus!''" },
  { title: "Matthew 6:16", quote: "''When you fast, do not be somber like the hypocrites, for they disfigure their faces to show others they are fasting. Truly I tell you, they have received their reward in full.''" },
  { title: "Luke 22:27", quote: "''For who is greater, the one who sits at the table, or the one who serves? Is it not the one who sits at the table? But I am among you as one who serves.''" },
  { title: "Luke 21:9", quote: "''When you hear of wars and uprisings, do not be afraid; these things must happen first, but the end will not come right away.''" },
  { title: "Matthew 25:13", quote: "''Therefore keep watch, because you do not know the day or the hour when the Son of Man will come.''" },
  { title: "Matthew 26:46", quote: "''Then they will go away to eternal punishment, but the righteous to eternal life.''" },
  { title: "Luke 4:4", quote: "''Jesus answered, ‘It is written: Man shall not live by bread alone, but by every word of God.’''" },
  { title: "Isaiah 41:10", quote: "''Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, help you, and uphold you with My righteous right hand.''" },
  { title: "Isaiah 42:20", quote: "''You have seen many things, but pay no attention; your ears are open, but you do not listen.''" },
  { title: "1 Peter 4:8", quote: "''Above all, have fervent love for one another, because love covers over a multitude of sins.''" },
  { title: "1 Corinthians 13:13", quote: "''And now these three remain: faith, hope, and love. But the greatest of these is love.''" },
  { title: "Ephesians 5:15", quote: "''Be very careful, then, how you live—not as unwise but as wise.''" },
  { title: "Ephesians 5:2", quote: "''Live in love, as Christ loved us and gave Himself up for us as a fragrant offering and sacrifice to God.''" },
  { title: "Romans 8:31", quote: "''What then shall we say to these things? If God is for us, who can be against us?''" },
  { title: "2 Timothy 4:8", quote: "''Now there is in store for me the crown of righteousness, which the Lord, the righteous Judge, will award to me on that Day—and not only to me, but also to all who have longed for His appearing.''" },
  { title: "Psalm 145:18", quote: "''The Lord is near to all who call on Him, to all who call on Him in truth.''" },
  { title: "Psalm 145:1", quote: "''I will exalt You, my God the King; I will praise Your name forever and ever.''" },
  { title: "Romans 8:18", quote: "''I consider that our present sufferings are not worth comparing with the glory that will be revealed in us.''" },
  { title: "Revelation 21:4", quote: "''He will wipe every tear from their eyes. There will be no more death, or mourning, or crying, or pain, for the old order of things has passed away.''" },
  { title: "Revelation 16:2", quote: "''The first angel went and poured out his bowl on the land, and ugly, painful sores broke out on the people who had the mark of the beast and worshiped its image.''" },
  { title: "Matthew 9:37", quote: "''Then He said to His disciples, ‘The harvest is plentiful but the workers are few.’''" },
  { title: "Romans 8:28", quote: "''And we know that in all things God works for the good of those who love Him, who have been called according to His purpose.''" }
];
  const [text,setText]= useState("");
  const [quete,setQuete] = useState("");
  const [loaded,error] = useFonts({
    'Cardo-Bold':require('./assets/fonts/Cardo-Bold.ttf'),
    'Cardo-Italic':require('./assets/fonts/Cardo-Italic.ttf'),
    'Cardo-Regular':require('./assets/fonts/Cardo-Regular.ttf'),
  });
  useEffect(()=>{
    if (loaded || error){
      console.log("Fonts are loading....");
    }
  },[loaded,error]);
  useEffect(()=>{
    const reqPer= async()=>{
      const {status}=await Notifications.requestPermissionsAsync();
      if(status!=="granted"){
        alert("Permission for notifications are not granted!");
      }
    };
    reqPer();
  },[])
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
    const init = async()=>{
      let RandomNumberSaved = await AsyncStorage.getItem("randomNumber");
      let r;
      if(RandomNumberSaved){
        r=parseInt(RandomNumberSaved,10);
      }else{
        r=Math.floor(Math.random()*33);
        await AsyncStorage.setItem("randomNumber",r.toString());
      }
      const currentDate = new Date();
      let x = currentDate.getDate();
      console.log(r)
      console.log(r);
      console.log(x/10);
      console.log(x%10);
      console.log(r);
      const shu=[...BigTextEnglish].sort(()=>r);
      console.log(shu);
      setText(shu[x].title);
      setQuete(shu[x].quote);
      }
      init();
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
