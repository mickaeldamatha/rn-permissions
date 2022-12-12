import { isDevice } from "expo-device";
import { useEffect, ReactNode } from "react";
import * as Notifications from "expo-notifications";
import { NativeEventSubscription, Platform } from "react-native";
import { Camera } from "expo-camera";
import { useRef } from "react";
import {
  AndroidNotificationPriority,
  Notification,
  NotificationResponse,
} from "expo-notifications";

export default function RNPermissionProvider(props: {
  children: ReactNode;
  camera?: boolean;
  notifications?: boolean;
  microphone?: boolean;
  handleNotificationResponse?: (response: NotificationResponse) => void;
  handleNotification?: (notification: Notification) => void;
  handlePushToken?: (token: string) => void;
  handleError?: (error: string) => void;
}) {
  const notificationListener = useRef<NativeEventSubscription>();
  const responseListener = useRef<NativeEventSubscription>();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        priority: AndroidNotificationPriority.DEFAULT,
      }),
      handleError: (pushId, error) => {},
      handleSuccess: (notificationId) => {},
    });

    (async () => {
      if (isDevice && props.notifications) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();

          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          props.handleError && props.handleError("Unable to get token.");
          return;
        }
        const token = await Notifications.getExpoPushTokenAsync();

        props.handlePushToken && props.handlePushToken(token.data);
      } else {
        props.handleError &&
          props.handleError("Not available on simulator device.");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      props.camera && (await Camera.requestCameraPermissionsAsync());
      props.microphone && (await Camera.requestMicrophonePermissionsAsync());

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          props.handleNotification && props.handleNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          props.handleNotificationResponse &&
            props.handleNotificationResponse(response);
        });

      return () => {
        notificationListener.current &&
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
        responseListener.current &&
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
      };
    })();
  }, []);
  return <>{props.children}</>;
}
