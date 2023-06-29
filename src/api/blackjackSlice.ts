import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const blackjackApi = createApi({
  reducerPath: 'blackjackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://deckofcardsapi.com/api/deck/new/',
  }),
  tagTypes: ['Deal'],
  endpoints: (builder) => ({
    dealCards: builder.query<string, void>({
      query: () => 'draw/?count=52',
      providesTags: ['Deal'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useDealCardsQuery } = blackjackApi;
