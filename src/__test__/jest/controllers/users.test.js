import UserBusiness from "../../../business/users";
import Users from "../../../controllers/users"
import User from "../../../models/user";
import DA from '../../../services/da'

describe('Testes para a controller de Users', () => {
    test('mostrar erro se não for passado business', () => {
        expect(() => new Users()).toThrow('UserBusiness não foi injetado')
    });
    test('criação de controller com sucesso', () => {
        expect(() => new Users(new UserBusiness(new DA()))).not.toThrowError()
    });
    test('adicionar usuario pela controller', () => {
        const controller = new Users(new UserBusiness(new DA([])))
        const userData = new User({name: 'Pan', email: 'i@pan.com'})
        expect(controller.addUser(userData)).toEqual(Object.assign({}, userData, {id: 1}))
    });
});