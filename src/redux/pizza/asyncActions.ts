import { createAsyncThunk } from '@reduxjs/toolkit'
import { config } from '@CNF'
import axios from 'axios'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

import type { Pizza, SearchPizzaParams, FetchPizzas } from '@RX-pizza'

export const fetchPizzas: FetchPizzas = createAsyncThunk<
  Pizza[],
  SearchPizzaParams
>(
  'pizza/fetchPizzasStatus',
  async (params: SearchPizzaParams): Promise<Pizza[]> => {
    const { MOCK_API_SECRET } = config
    const { currentPage, ...identicalParamsKeys } = params
    const apiVersion: string = 'api/v1'
    const url: string = `https://${MOCK_API_SECRET}.mockapi.io/${apiVersion}/pizzaz`
    const limit: number = 4
    const { data } = await axios.get<Pizza[]>(url, {
      params: pickBy(
        {
          page: currentPage,
          limit,
          ...identicalParamsKeys,
        },
        identity,
      ),
    })

    return data
  },
)
