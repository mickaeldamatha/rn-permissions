# EASY INTEGRATION PERMISSIONS PROVIDER FOR REACT NATIVE

## _Push notifications and devices capabilities permissions ready to use for every react native project._

```javascript
import * as React from "react";
import RNPermissionProvider from "mkdm-rn-permissions";

export default function App() {
  const sendPushTokenToServer = async (token) => {
    try {
      //Send pusk token to store it in db.
    } catch {}
  };

  const onPermissionError = (error) => console.log(error);
  return (
    <RNPermissionProvider
      camera={true}
      microphone={false}
      notifications={true}
      handlePushToken={sendPushTokenToServer}
      handleError={onPermissionError}
    >
      {/*
        The rest of your app goes here
      */}
    </RNPermissionProvider>
  );
}
```

## Initialization

First run...

```sh
    yarn add expo-notifications expo-camera
```

Or

```sh
    npm i expo-notifications expo-camera
```

And...

```sh
    yarn add mkdm-rn-permissions
```

## Properties and Methods

| PROPERTIES    | TYPE    | Default | Description                                                                |
| ------------- | ------- | ------- | -------------------------------------------------------------------------- |
| camera        | boolean | false   | If true, camera permission will be display at first app launch.            |
| microphone    | boolean | false   | If true, microphone permission will be display at first app launch.        |
| notifications | boolean | false   | If true,push notifications permission will be display at first app launch. |

###

| METHODS                    | Description                              |
| -------------------------- | ---------------------------------------- |
| handlePushToken            | Get push token as param                  |
| handleError                | Get error message as param               |
| handleNotification         | Get Notification object as param         |
| handleNotificationResponse | Get NotificationResponse object as param |
