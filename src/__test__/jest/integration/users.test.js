import supertest from "supertest"
import app from '../../../services/app'

describe('Testar a integração da API users', () => {
    test('criar criação de usuario valido', async () => {
        const user = {
            name: 'Pan',
            email: 'i@pan.com'
        }

        const res = await supertest(app).post('/').send(user)

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(Object.assign(user, {id: 1}))
    });
    test('criar usuário sem passar body', async () => {
        const res = await supertest(app)
        .post('/')
        expect(res.statusCode).toEqual(400)
    });
    test('criar usuário com dados inválidos', async () => {
        const res1 = await supertest(app)
        .post('/')
        .send({
            name: 'Pan'
        })
        const res2 = await supertest(app)
        .post('/')
        .send({
            email: 'i@pan.com'
        })
        expect(res1.statusCode).toEqual(400)
        expect(res2.statusCode).toEqual(400)
    });
    test('buscar usuario nao existe retornar 404', async () => {
        const res = await supertest(app)
        .get('/' + 10)
        expect(res.statusCode).toEqual(404)
    });
    test('buscar usuario existe retornar 200', async () => {
        const res = await supertest(app)
        .get('/' + 1)
        expect(res.statusCode).toEqual(200)
        expect(res.body.id).toBe(1)
    });
    test('atualizar usuario que nao existe', async () => {
        const res = await supertest(app)
        .put('/' + 10)
        .send({name: 'Pan'})

        expect(res.statusCode).toEqual(404)
        expect(res.body).toBe(null)
    });
    test('atualizar usuario que existe', async () => {
        const res = await supertest(app)
        .put('/' + 1)
        .send({email: 'iam@pan.com'})

        const find = await supertest(app)
        .get('/' + 1)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toBe(true)

        expect(find.statusCode).toBe(200)
        expect(find.body).toEqual({id: 1, name: 'Pan', email: 'iam@pan.com'})
    });
    test('atualizar usuario que existe sem passar body', async () => {
        const res = await supertest(app)
        .put('/' + 1)

        expect(res.statusCode).toEqual(400)
    });
    test('atualizar usuario que existe body vazio', async () => {
        const res = await supertest(app)
        .put('/' + 1)
        .send({})

        expect(res.statusCode).toEqual(400)
    });
    test('atualizar usuario que existe com dados invalidos', async () => {
        const res = await supertest(app)
        .put('/' + 1)
        .send({source: '/bin/sh'})

        expect(res.statusCode).toEqual(400)
    });
});