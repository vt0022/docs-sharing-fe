import React from "react";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import MyStack from "./routes";
import { RealmProvider } from "@realm/react";
import { Profile } from "./app/models/Profile";
import Realm from "realm";
Realm.flags.THROW_ON_GLOBAL_REALM = true;

const App = () => {
    return (
        <RealmProvider schema={[Profile]}>
            <MyStack />
            <Toast config={toastConfig} />
        </RealmProvider>
    );
};

export default App;

const toastConfig = {
    error: (props) => <ErrorToast {...props} text1NumberOfLines={2} />,
    success: (props) => <SuccessToast {...props} text1NumberOfLines={2} />,
};

<Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />;
