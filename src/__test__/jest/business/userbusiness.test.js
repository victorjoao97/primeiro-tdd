import UserBusiness from '../../../business/users'
import ServiceDA from '../../../services/da'


describe('User business test', () => {
    test('inserir registro e retornar somente ele', () => {
        const userBs = new UserBusiness(new ServiceDA([]))
        const user = { name: 'Jim', email: 'i@jim.com' }
        const userAdded = userBs.insert(user)
        const userAdicionado = userBs.find(userAdded.id)
        expect(userAdded).toBe(userAdicionado)
    })
    test('inserir registro duplicado retornar erro', () => {
        const userBs = new UserBusiness(new ServiceDA([]))
        const user = { name: 'Jim', email: 'i@jim.com' }
        expect(() => {
            userBs.insert(user)
            userBs.insert(user)
        }).toThrow('Não inserir registro duplicado')
    })
    test('inserir registro email duplicado retornar erro', () => {
        const userBs = new UserBusiness(new ServiceDA([
            { id: 1, name: 'Pan', email: 'i@jim.com' }
        ]))
        const user = { name: 'Jim', email: 'i@jim.com' }
        expect(() => {
            userBs.insert(user)
        }).toThrow('Não inserir registro duplicado')
    })
    test('buscar registro pelo id e retornar registro', () => {
        const user = { id: 4, name: 'Pan', email: 'i@jim.com' }
        const userBs = new UserBusiness(new ServiceDA([user]))
        expect(userBs.find(4)).toBe(user)
    })
    test('buscar por id retornar nulo senão existir', () => {
        const user = { name: 'Pan', email: 'i@jim.com' }
        const userBs = new UserBusiness(new ServiceDA([user]))
        expect(userBs.find(1)).toBe(null)
    })
    test('buscar registro pelo email e retornar registro', () => {
        const user = { name: 'Pan', email: 'i@jim.com' }
        const userBs = new UserBusiness(new ServiceDA([user]))
        expect(userBs.findByEmail('i@jim.com')).toBe(user)
    })
    test('buscar por email retornar nulo senão existir', () => {
        const user = { name: 'Pan', email: 'i@pan.com' }
        const userBs = new UserBusiness(new ServiceDA([user]))
        expect(userBs.findByEmail('i@jim.com')).toBe(null)
    })
    test('atualizar registro que existe', () => {
        const user = { name: 'Pan', email: 'i@pan.com' }
        const userBs = new UserBusiness(new ServiceDA([user]))
        userBs.update({name: 'Pan update'})
        const userUpdated = userBs.find(user.id)
        expect(userUpdated).toEqual({ name: 'Pan update', email: 'i@pan.com' })
    })
    test('nao atualizar registro que não existe', () => {
        const user = { id: 4, name: 'Jim', email: 'i@jim.com' }
        const userBs = new UserBusiness(new ServiceDA([user]))
        expect(userBs.update({id: 1, name: 'Pan update'})).toBe(false)
    })
    test('remover registro existente', () => {
        const user = { name: 'Jim', email: 'i@jim.com' }
        const userBs = new UserBusiness(new ServiceDA([user]))
        userBs.delete(user.id)
        const userNaoEncontrado = userBs.find(user.id)
        expect(userNaoEncontrado).toBe(null)
    })
    test('remover registro inexistente', () => {
        const user = { name: 'Jim', email: 'i@jim.com' }
        const userBs = new UserBusiness(new ServiceDA([user]))
        expect(userBs.delete(2)).toBe(false)
    })
})