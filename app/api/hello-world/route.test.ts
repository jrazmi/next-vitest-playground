import { GET } from './route';
import { expect, test } from 'vitest'
test('should work as expected', async () => {
  const res = await GET({
        cache: "no-cache",
        credentials: 'same-origin',
        destination: 'document',
        // @ts-ignore
        headers: {
            append: () => {},
            delete: () => {},
            get: () => "",
            has: () => true, 
            set: () => {},
            forEach: () => {},
            entries: () => {
                return {} as IterableIterator<[string, string]>
            },
            keys: () => {
                return {} as IterableIterator<string>
            },
            values: () => {
                return {} as IterableIterator<string>
            },          
            
        },
        method: 'get',
        // url: 'localhost:3000/papi/example'
        }
    ) 
  const r = await res.json()
  expect(r.hello).toBe("world")
//   expect(true).toBe(true)
})
