import { Platform } from "react-native";
import { PUSHER_BEAMS_INSTANCE_ID } from "@env";
import RNPusherPushNotifications from "react-native-pusher-push-notifications";

export const init = (): void => {
  RNPusherPushNotifications.setInstanceId(PUSHER_BEAMS_INSTANCE_ID);

  RNPusherPushNotifications.on("notification", handleNotification);
  RNPusherPushNotifications.setOnSubscriptionsChangedListener(onSubscriptionsChanged);
};

export const subscribe = (interest: string): void => {
  console.log(`Subscribing to "${interest}"`);
  RNPusherPushNotifications.subscribe(
    interest,
    (statusCode: any, response: any) => {
      console.error(statusCode, response);
    },
    () => {
      console.log(`CALLBACK: Subscribed to ${interest}`);
    }
  );
};

export const handleNotification = (notification: any): void => {
  console.log(notification);
  if (Platform.OS === "ios") {
    console.log("CALLBACK: handleNotification (ios)");
  } else {
    console.log("CALLBACK: handleNotification (android)");
    console.log(notification);
  }
};

export const onSubscriptionsChanged = (interests: string[]): void => {
  console.log("CALLBACK: onSubscriptionsChanged");
  console.log(interests);
}

export default {
  init, subscribe, handleNotification, onSubscriptionsChanged
}