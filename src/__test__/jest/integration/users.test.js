import supertest from "supertest"
import app from '../../../services/app'

describe('Testar a integração da API users', () => {
    test('testar criação de usuario', async () => {
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
});