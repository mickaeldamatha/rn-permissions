import { ReactNode } from "react";
import { Notification, NotificationResponse } from "expo-notifications";
export default function PermissionProvider(props: {
    children: ReactNode;
    camera?: boolean;
    notifications?: boolean;
    microphone?: boolean;
    handleNotificationResponse: (response: NotificationResponse) => void;
    handleNotification: (notification: Notification) => void;
    handlePushToken: (token: string) => void;
    handleError: (error: string) => void;
}): JSX.Element;
