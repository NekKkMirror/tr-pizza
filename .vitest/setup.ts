/* Extend Matchers */
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import { afterAll, afterEach, beforeAll } from 'vitest'
import { fetch } from 'cross-fetch'
import { server } from './mocks/server'

// Add `fetch` polyfill.
global.fetch = fetch

// Establish API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: `error` }))

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.Close())
