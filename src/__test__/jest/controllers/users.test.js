import Users from "../../../controllers/users"
import Crud from "../../../crud";
import Da from '../../../services/da'

describe('Testes para a controller de Users', () => {
    test('mostrar erro se não for passado business', () => {
        expect(() => new Users()).toThrow('UserBusiness não foi injetado')
    });
    test('criação de controller com sucesso', () => {
        expect(() => new Users(new Crud(new Da()))).not.toThrowError()
    });
    test('adicionar usuario pela controller', () => {
        const controller = new Users(new Crud(new Da([])))
        const userData = {name: 'Pan', email: 'i@pan.com'}
        expect(() => controller.addUser(userData)).not.toThrowError()
    });
});