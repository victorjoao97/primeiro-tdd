import Crud from "../../crud";

describe('Test DA', () => {
    test('lançar erro se não passar serviço ctor', () => {
        expect(() => new Crud()).toThrow('ServiceDA não foi injetado')
    });
});