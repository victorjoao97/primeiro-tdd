import UserBusiness from "../../../business/users";

describe('Test DA', () => {
    test('lançar erro se não passar serviço ctor', () => {
        expect(() => new UserBusiness()).toThrow('ServiceDA não foi injetado')
    });
});