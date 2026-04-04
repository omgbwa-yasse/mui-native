/**
 * AppNavigator — root React Navigation stack for feature 004-invitation-multiagent.
 *
 * T059 cross-platform review status:
 *   - iOS simulator (17.x): all 6 screens render correctly; native-stack header + back button confirmed.
 *   - Android emulator (API 34): all 6 screens render correctly; status-bar overlap resolved by
 *     React Navigation's default `StatusBar` management.
 *   Pending: physical-device sign-off before production release.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { InviteScreen } from '../screens/InviteScreen/InviteScreen';
import { GuestLoginScreen } from '../screens/GuestLoginScreen/GuestLoginScreen';
import InvitationListScreen from '../screens/InvitationListScreen/InvitationListScreen';
import MultiAgentSettingsScreen from '../screens/MultiAgent/MultiAgentSettingsScreen/MultiAgentSettingsScreen';
import AgentProgressScreen from '../screens/MultiAgent/AgentProgressScreen/AgentProgressScreen';
import HumanizationReportScreen from '../screens/MultiAgent/HumanizationReportScreen/HumanizationReportScreen';

export type RootStackParamList = {
  Invite: { userToken: string };
  GuestLogin: undefined;
  InvitationList: { userToken: string };
  MultiAgentSettings: { userToken: string };
  AgentProgress: { sessionId: string; userToken: string };
  HumanizationReport: { sessionId: string; userToken: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GuestLogin">
        <Stack.Screen
          name="GuestLogin"
          component={GuestLoginScreen}
          options={{ title: 'Guest Login', headerShown: false }}
        />
        <Stack.Screen
          name="Invite"
          options={{ title: 'Invite' }}
        >
          {props => (
            <InviteScreen
              userToken={props.route.params.userToken}
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="InvitationList"
          options={{ title: 'Invitations' }}
        >
          {props => (
            <InvitationListScreen
              userToken={props.route.params.userToken}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="MultiAgentSettings"
          options={{ title: 'Multi-Agent Settings' }}
        >
          {props => (
            <MultiAgentSettingsScreen
              userToken={props.route.params.userToken}
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="AgentProgress"
          options={{ title: 'Agent Progress' }}
        >
          {props => (
            <AgentProgressScreen
              sessionId={props.route.params.sessionId}
              userToken={props.route.params.userToken}
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="HumanizationReport"
          options={{ title: 'Humanization Report' }}
        >
          {props => (
            <HumanizationReportScreen
              sessionId={props.route.params.sessionId}
              userToken={props.route.params.userToken}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
