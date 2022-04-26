import UserBusiness from "../../../business/users";
import UsersController from "../../../controllers/users"
import User from "../../../models/user";
import DA from '../../../services/da'

describe('Testes para a controller de Users', () => {
    test('mostrar erro se não for passado business', () => {
        expect(() => new UsersController()).toThrow('UserBusiness não foi injetado')
    });
    test('criação de controller com sucesso', () => {
        expect(() => new UsersController(new UserBusiness(new DA()))).not.toThrowError()
    });
    test('adicionar usuario pela controller', () => {
        const controller = new UsersController(new UserBusiness(new DA([])))
        const userData = new User({name: 'Pan', email: 'i@pan.com'})
        expect(controller.add(userData)).toEqual(Object.assign({}, userData, {id: 1}))
    });
    test('buscar um usuario que existe', () => {
        const userValid = {id: 1, name: 'Pan', email: 'i@pan.com'}
        const controller = new UsersController(new UserBusiness(new DA([userValid])))
        expect(controller.findId(1)).toEqual(userValid)
    });
    test('buscar um usuario que nao existe', () => {
        const userValid = {id: 1, name: 'Pan', email: 'i@pan.com'}
        const controller = new UsersController(new UserBusiness(new DA([userValid])))
        expect(controller.findId(2)).toEqual(null)
    });
});