import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '17950300e7mshfd04f067fa8887cp1ac7f0jsn2a0707d2132b'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = url => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getCryptos: builder.query({
            query: count => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: id => createRequest(`/coin/${id}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ id, timePeriod }) => createRequest(`/coin/${id}/history?timeperiod=${timePeriod}}`)
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
          }),
    })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery } = cryptoApi