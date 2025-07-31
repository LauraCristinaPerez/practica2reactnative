import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { TabBar } from "../../components/shared/tabbar";


export default function HomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TabBar />
            <Text>Weolcome</Text>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'pink',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    tabButton: {
        padding: 10,
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
});