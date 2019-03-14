const lib = require('../lib');

describe('absolute',()=>{
    it('should return a positive number if input is positive',()=>{
        const result=lib.absolute(1);
        expect(result).toBe(1);
    });
    it('should return a positive number if input is negative',()=>{
        const result=lib.absolute(-1);
        expect(result).toBe(1);
    });
    it('should return a 0  if input is 0',()=>{
        const result=lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet',()=>{
    it('should return a greeting message',()=>{
        const result=lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');
    });
})

describe('getCurrencies',()=>{
    it('should return supported currencies',()=>{
        const result=lib.getCurrencies();
        //Too general  
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //Too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        //properway
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        //Idealway
        expect(result).toEqual(expect.arrayContaining(['EUR','USD','AUD']));


    })

})
describe('getProduct',()=>{
    it('should return the product with given id',()=>{
        const result=lib.getProduct(1);
        //expect(result).toEqual({id:1,price:10});

        expect(result).toMatchObject({id:1,price:10});

        expect(result).toHaveProperty('id',1);
    });
});

describe('registerUser',()=>{
    it('should throw if username is falsy',()=>{
        //null, undefined, NaN, '', 0, false
        const args=[null,undefined,NaN,'',0,false];
        args.forEach(a=>{
            expect(()=>{lib.registerUser(a)}).toThrow();
        })
        
    });
    it('should return a user object if valid username is passed',()=>{
        const result=lib.registerUser('mosh');
        expect(result).toMatchObject({username:'mosh'});
        expect(result.id).toBeGreaterThan(0);
    });
})