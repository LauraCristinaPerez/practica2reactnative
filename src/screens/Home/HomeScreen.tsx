import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TabBar } from "../../components/shared/tabbar";


export default function HomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TabBar />
            <Text>Weolcome</Text>
        </SafeAreaView>
    );
}
