import * as headers from "next/headers";
// import { cookies, headers } from "next/headers";
import { describe, expect, it, vi } from 'vitest';
import { printHello } from './a-dependency';


// this overrides what would be associatied to these libraries from the __mocks__ directory
// incomplete: 
vi.mock("next/headers", () => {
    return {
        default: () => ({}), 
        cookies: () => vi.fn(), //should return an instance of ReadonlyRequestCookies 
    }
})

// this works but I don't think it will work for the next/headers
// it does not override the entire package, only the items specified
// complete: 
vi.mock("./a-dependency", () => {
    return {
        default: () => ({}), 
        printHello: () => 'mocked hello',
    }
})

describe('mocking', () => {
    describe('a custom module is mocked', async () => {
        // example of expected behavior
        // https://stackblitz.com/edit/vitest-dev-vitest-aqqg5j?file=test%2Fuuid.test.ts,__mocks__%2Fuuid.ts&issueNumber=3192&issueRepo=vitest-dev/vitest
        // issue reported, this other way seems to work: 
        // https://github.com/vitest-dev/vitest/issues/1011
        // however, I don't think it will work for the next/headers
        it('returns a string', async () => {
            expect(printHello()).toEqual('mocked hello')
        })
    })
    
    describe('part of a node module is mocked', () => {
        describe('headers', () => {
            it.skip('uses a vitest mock', async () => {   
                expect(vi.isMockFunction(headers.headers)).toBe(true)
            })
        })

        describe('cookies', () => {
            it.skip('uses a vitest mock', async () => {   
                expect(vi.isMockFunction(headers.cookies)).toBe(true)
            })

            it.skip("'get' returns a string", () => {
                // cookies() returns a ReadonlyRequestCookies
                // option 1: create an instance of 'ReadonlyRequestCookies'
                //   and assign it to 'cookies' on line 20
                // option 2: override 'get()' from wherever it is imported 
                //   from (probably ReadonlyRequestCookies)
                expect(headers.cookies().get('cookie')).toBe('mocked cookie')
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
