import { TEvent } from 'features/eventsList/types';
import { ScreenRoutes } from 'application/navigation/consts';

export type TRootStackParamList = {
  [ScreenRoutes.EventsListScreen]: undefined;
  [ScreenRoutes.EventScreen]: { event: TEvent };
};
