import { cookies, headers } from "next/headers";
import { describe, expect, it, vi } from 'vitest';

import { printHello } from './a-dependency';

vi.mock('./a-dependency');
vi.mock('next/headers');


describe('mocking', () => {
    describe('a custom module is mocked', async () => {
        it('uses a vitest mock', () => {
            expect(vi.isMockFunction(printHello)).toBe(true)
        })
        
        // example of expected behavior
        // https://stackblitz.com/edit/vitest-dev-vitest-aqqg5j?file=test%2Fuuid.test.ts,__mocks__%2Fuuid.ts&issueNumber=3192&issueRepo=vitest-dev/vitest
        it('returns a string', async () => {
            expect(printHello()).toEqual('mocked hello')
        })
    })
    
    describe('part of a node module is mocked', () => {
        describe('headers', () => {
            it('uses a vitest mock', async () => {   
                expect(vi.isMockFunction(headers)).toBe(true)
            })
        })

        describe('cookies', () => {
            it('uses a vitest mock', async () => {   
                expect(vi.isMockFunction(cookies)).toBe(true)
            })

            it.skip("returns an object with a 'get' function that is a mock", () => {
                // cookies() should return an object with a get() function
                expect(cookies()).toBe(true)
            })
        })
    })
})

// test('should work as expected', async () => {
//   const res = await GET({
//         cache: "no-cache",
//         credentials: 'same-origin',
//         destination: 'document',
//         // @ts-ignore
//         headers: {
//             append: () => {},
//             delete: () => {},
//             get: () => "",
//             has: () => true, 
//             set: () => {},
//             forEach: () => {},
//             entries: () => {
//                 return {} as IterableIterator<[string, string]>
//             },
//             keys: () => {
//                 return {} as IterableIterator<string>
//             },
//             values: () => {
//                 return {} as IterableIterator<string>
//             },          
            
//         },
//         method: 'get',
//         // url: 'localhost:3000/papi/example'
//         }
//     ) 
//   const r = await res.json()
  
//   expect(true).toBe(true)
// })
