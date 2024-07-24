import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout(){
    return(
        <Tabs screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen
            name="index"
            options={{title: 'Home',
                tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} />,
            }}
            />
            <Tabs.Screen
            name="dashboard"
            options={{title: 'Dashboard',
                tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />,
            }}
            />
            <Tabs.Screen
            name="profile"
            options={{title: 'Profile',
                tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
            }}
            />
        </Tabs>
    )
}