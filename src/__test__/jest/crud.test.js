import Crud from '../../crud'
import ServiceDA from '../../serviceDA'


describe('Crud test', () => {
    test('inserir registro e retornar somente ele', () => {
        const crud = new Crud(new ServiceDA([]))
        const user = { id: 3, name: 'Jim', email: 'i@jim.com' }
        crud.insert(user)
        const userAdicionado = crud.find(user.id)
        expect(userAdicionado).toBe(user)
    })
    test('inserir registro duplicado retornar erro', () => {
        const crud = new Crud(new ServiceDA([]))
        const user = { id: 3, name: 'Jim', email: 'i@jim.com' }
        expect(() => {
            crud.insert(user)
            crud.insert(user)
        }).toThrow('Não inserir registro duplicado')
    })
    test('inserir registro email duplicado retornar erro', () => {
        const crud = new Crud(new ServiceDA([
            { id: 4, name: 'Pan', email: 'i@jim.com' }
        ]))
        const user = { id: 3, name: 'Jim', email: 'i@jim.com' }
        expect(() => {
            crud.insert(user)
        }).toThrow('Não inserir registro duplicado')
    })
    test('buscar registro pelo id e retornar registro', () => {
        const user = { id: 4, name: 'Pan', email: 'i@jim.com' }
        const crud = new Crud(new ServiceDA([user]))
        expect(crud.find(4)).toBe(user)
    })
    test('buscar por id retornar nulo senão existir', () => {
        const user = { id: 4, name: 'Pan', email: 'i@jim.com' }
        const crud = new Crud(new ServiceDA([user]))
        expect(crud.find(1)).toBe(null)
    })
    test('buscar registro pelo email e retornar registro', () => {
        const user = { id: 4, name: 'Pan', email: 'i@jim.com' }
        const crud = new Crud(new ServiceDA([user]))
        expect(crud.findByEmail('i@jim.com')).toBe(user)
    })
    test('buscar por email retornar nulo senão existir', () => {
        const user = { id: 4, name: 'Pan', email: 'i@pan.com' }
        const crud = new Crud(new ServiceDA([user]))
        expect(crud.findByEmail('i@jim.com')).toBe(null)
    })
    test('atualizar registro que existe', () => {
        const user = { id: 4, name: 'Pan', email: 'i@pan.com' }
        const crud = new Crud(new ServiceDA([user]))
        crud.update({id: 4, name: 'Pan update'})
        const userUpdated = crud.find(user.id)
        expect(userUpdated).toEqual({ id: 4, name: 'Pan update', email: 'i@pan.com' })
    })
    test('nao atualizar registro que não existe', () => {
        const user = { id: 3, name: 'Jim', email: 'i@jim.com' }
        const crud = new Crud(new ServiceDA([user]))
        expect(crud.update({id: 4, name: 'Pan update'})).toBe(false)
    })
    test('remover registro existente', () => {
        const user = { id: 3, name: 'Jim', email: 'i@jim.com' }
        const crud = new Crud(new ServiceDA([user]))
        crud.delete(user.id)
        const userNaoEncontrado = crud.find(user.id)
        expect(userNaoEncontrado).toBe(null)
    })
    test('remover registro inexistente', () => {
        const user = { id: 3, name: 'Jim', email: 'i@jim.com' }
        const crud = new Crud(new ServiceDA([user]))
        expect(crud.delete(2)).toBe(false)
    })
})