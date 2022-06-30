import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TEvent } from 'features/eventsList/types';
import { EVENTS_PER_PAGE } from 'features/eventsList/consts';

type TGetEventsArgs = {
  perPage?: number;
  page?: number;
};

const eventsListApi = createApi({
  reducerPath: 'eventsList',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    getEvents: builder.query<TEvent[], any>({
      query: ({ perPage = EVENTS_PER_PAGE, page = 1 }: TGetEventsArgs = {}) =>
        `events?per_page=${perPage}&page=${page}`,
    }),
  }),
});

export const { useGetEventsQuery } = eventsListApi;

export default eventsListApi;
