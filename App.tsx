import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlobalViewScreen from "./components/GlobalViewScreen";
import Orders from "./components/Orders";
import Parameter from "./components/Parameter";
import { SafeAreaView } from "react-native-safe-area-context";
import UserProvider from "./components/UserContext";
import { SafeAreaView as SafeAreaViewNative } from "react-native";

function App(): JSX.Element {
	const Stack = createNativeStackNavigator();

	return (
		// <SafeAreaViewNative style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1, backgroundColor: "#202020" }}>
				<UserProvider>
					<NavigationContainer>
						<Stack.Navigator>
							<Stack.Screen name={"GlobalViewScreen"} component={GlobalViewScreen} options={{ headerShown: false }} />
							<Stack.Screen name={"Orders"} component={Orders} options={{ presentation: "modal", headerShown: false }} />
							<Stack.Screen name={"Parameter"} component={Parameter} options={{ presentation: "modal", headerShown: false }} />
						</Stack.Navigator>
					</NavigationContainer>
				</UserProvider>
			</SafeAreaView>
		// </SafeAreaViewNative>
	);
}

export default App;
