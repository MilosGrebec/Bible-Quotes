import { useState,useEffect,useRef } from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { Platform } from "react-native";

export interface PushNotiicationState {
    notification?: Notifications.Notification;
    expoPushToken?: Notifications.ExpoPushToken;
}
export const usePushNotifications = (): PushNotiicationState =>{
    Notifications.setNotificationHandler({
        handleNotification: async()=>({
            shouldPlaySound:false,
            shouldShowAlert:true,
            shouldSetBadge:false,
        }),
    });
    const [expoPushToken, setExpoPushToken]= useState<
    Notifications.ExpoPushToken | undefined
    >();
    const[notification,setNotification] = useState<
    Notifications.Notification | undefined
    >();
    const notificationListener = useRef<Notifications.Subscription>();
    const responsListener = useRef<Notifications.Subscription>();
    async function registerForPushNotficationsAsync(){
        let token;
         if(Device.isDevice){
            const {status: existingStatus} = await Notifications.getPermissionsAsync()
            let finalStats = existingStatus;
            if(existingStatus!=="granted"){
                const {status} = await Notifications.requestPermissionsAsync();
                finalStats=status;
            }
            if(finalStats!=="granted"){
                alert("Failed to get push token");
            }
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
            });
            if(Platform.OS ==='android'){
                Notifications.setNotificationChannelAsync("default",{
                    name:"default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern:[0,250,250,250],
                    lightColor:"#969595"
                });
            }
            return token;
         }else{
            console.log("Not a device");
         }
    }
    useEffect(()=>{
        registerForPushNotficationsAsync().then((token)=>{
            setExpoPushToken(token);
        });
        notificationListener.current= Notifications.addNotificationReceivedListener((notification)=>{
            setNotification(notification);
        });
        responsListener.current=
        Notifications.addNotificationResponseReceivedListener((response)=>{
            console.log(response);
        });
        return ()=>{
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            )
            Notifications.removeNotificationSubscription(responsListener.current!);
        }
    },[]);
    return {
        expoPushToken,
        notification
    }
};