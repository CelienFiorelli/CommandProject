import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlobalViewScreen from "./components/GlobalViewScreen";
import Orders from "./components/Orders";
import Parameter from "./components/Parameter";
import { SafeAreaView } from "react-native-safe-area-context";
import UserProvider from "./components/UserContext";

function App(): JSX.Element {
	const Stack = createNativeStackNavigator();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#202020" }}>
			<UserProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name={"GlobalViewScreen"} component={GlobalViewScreen} options={{ headerShown: false }} />
						<Stack.Screen name={"Orders"} component={Orders} options={{ presentation: "modal", headerShown: false }} />
						<Stack.Screen name={"Parameter"} component={Parameter} options={{ presentation: "modal" }} />
					</Stack.Navigator>
				</NavigationContainer>
			</UserProvider>
		</SafeAreaView>
	);
}

export default App;
