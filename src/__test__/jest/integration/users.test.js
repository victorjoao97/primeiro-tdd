import supertest from "supertest"
import appMake from '../../../services/app'

async function sutCreateUser(app, user = null) {
    const userDTO = user || {
        name: 'Pan',
        email: 'i@pan.com'
    }

    return supertest(app).post('/').send(userDTO)
}

describe('Testar a integração da API users', () => {
    test('criar criação de usuario valido', async () => {
        const user = {
            name: 'Pan',
            email: 'i@pan.com'
        }
        const res = await sutCreateUser(appMake(), user)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(Object.assign(user, {id: 1}))
    });
    test('criar usuário sem passar body', async () => {
        const res = await supertest(appMake())
        .post('/')
        expect(res.statusCode).toEqual(400)
    });
    test('criar usuário duplicado retornar 409', async () => {
        const app = appMake()
        await supertest(app)
        .post('/')
        .send({id: 1, name: 'Pan', email: 'i@pan.com'})
        const res = await supertest(app)
        .post('/')
        .send({id: 2, name: 'Pan', email: 'i@pan.com'})

        expect(res.statusCode).toEqual(409)
    });
    test('criar usuário der algum erro retornar 500', async () => {
        const mockBusiness = jest.fn(() => { throw Error() })
        const app = appMake(mockBusiness)
        const res = await supertest(app)
        .post('/')
        .send({id: 2, name: 'Pan', email: 'i@pan.com'})

        expect(res.statusCode).toEqual(500)
    });
    test('criar usuário com dados inválidos', async () => {
        const res1 = await supertest(appMake())
        .post('/')
        .send({
            name: 'Pan'
        })
        const res2 = await supertest(appMake())
        .post('/')
        .send({
            email: 'i@pan.com'
        })
        expect(res1.statusCode).toEqual(400)
        expect(res2.statusCode).toEqual(400)
    });
    test('buscar usuario nao existe retornar 404', async () => {
        const res = await supertest(appMake())
        .get('/' + 10)
        expect(res.statusCode).toEqual(404)
    });
    test('buscar usuario existe retornar 200', async () => {
        const app = appMake()
        await sutCreateUser(app)
        const res = await supertest(app)
        .get('/' + 1)
        expect(res.statusCode).toEqual(200)
        expect(res.body.id).toBe(1)
    });
    test('atualizar usuario que nao existe', async () => {
        const res = await supertest(appMake())
        .put('/')
        .send({id: 10, name: 'Pan'})

        expect(res.statusCode).toEqual(404)
    });
    test('atualizar usuario que existe', async () => {
        const app = appMake()
        await sutCreateUser(app)
        const res = await supertest(app)
        .put('/')
        .send({id: 1, email: 'iam@pan.com'})

        const find = await supertest(app)
        .get('/' + 1)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toBe(true)

        expect(find.statusCode).toBe(200)
        expect(find.body).toEqual({id: 1, name: 'Pan', email: 'iam@pan.com'})
    });
    test('atualizar usuario que existe sem passar body', async () => {
        const res = await supertest(appMake())
        .put('/')

        expect(res.statusCode).toEqual(400)
    });
    test('atualizar usuario que existe body vazio', async () => {
        const res = await supertest(appMake())
        .put('/')
        .send({})

        expect(res.statusCode).toEqual(400)
    });
    test('atualizar usuario que existe com dados invalidos', async () => {
        const app = await appMake()
        await sutCreateUser(app)
        const res = await supertest(app)
        .put('/')
        .send({id: 1, source: '/bin/sh'})

        expect(res.statusCode).toEqual(400)
    });
    test('atualizar usuario que existe com email duplicado', async () => {
        const app = await appMake()
        await sutCreateUser(app)
        await sutCreateUser(app, {id: 2, name: 'Jim', email: 'i@jim.com'})
        const res = await supertest(app)
        .put('/')
        .send({id: 1, email: 'i@jim.com'})

        expect(res.statusCode).toEqual(409)
    });
    test('atualizar usuario que existe com email duplicado', async () => {
        const mockBusiness = jest.fn(() => { throw Error() })
        const app = await appMake(mockBusiness)
        const res = await supertest(app)
        .put('/')
        .send({id: 1, email: 'i@jim.com'})

        expect(res.statusCode).toEqual(500)
    });
    test('buscar todos os usuarios retornar lista', async () => {
        const app = appMake()
        await sutCreateUser(app)
        await sutCreateUser(app, {id: 2, name: 'Jim', email: 'i@jim.com'})

        const res = await supertest(app)
        .get('/')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveLength(2)
    });
    test('deletar um usuario retornar 204', async () => {
        const app = appMake()
        await sutCreateUser(app)

        const res = await supertest(app)
        .delete('/' + 1)

        expect(res.statusCode).toEqual(204)
    });
    test('deletar um usuario que não existe retornar 404', async () => {
        const app = appMake()

        const res = await supertest(app)
        .delete('/' + 1)

        expect(res.statusCode).toEqual(404)
    });
    test('deletar um usuario e retornar erro 500', async () => {
        const mockBusiness = jest.fn(() => { throw Error() })
        const app = appMake(mockBusiness)

        const res = await supertest(app)
        .delete('/' + 1)

        expect(res.statusCode).toEqual(500)
    });
});