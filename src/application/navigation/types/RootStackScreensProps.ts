import { StackScreenProps } from '@react-navigation/stack';
import { TRootStackParamList } from 'application/navigation/types/RootStackParamList';
import { ScreenRoutes } from 'application/navigation/consts/';

export type TEventsListScreenProps = StackScreenProps<
  TRootStackParamList,
  ScreenRoutes.EventsListScreen
>;

export type TEventScreenProps = StackScreenProps<
  TRootStackParamList,
  ScreenRoutes.EventScreen
>;
