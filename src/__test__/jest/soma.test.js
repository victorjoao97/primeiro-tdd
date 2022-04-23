import somar from '../../somar'

describe('Função somar', () => {
    test('somar 1 + 2 igual 3', () => {
        expect(somar(1, 2)).toBe(3)
    })
    test('somar null + 2 igual 2', () => {
        expect(somar(null, 2)).toBe(2)
    })
    test('somar 1 + null igual 1', () => {
        expect(somar(1, null)).toBe(1)
    })
    test('somar null + null igual 0', () => {
        expect(somar(null, null)).toBe(0)
    })
    test('somar sem nenhum parametro igual 0', () => {
        expect(somar()).toBe(0)
    })
    test('somar 1 + nada igual 1', () => {
        expect(somar(1)).toBe(1)
    })
})