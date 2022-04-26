module.exports = {
    transform: {
        '\\.[jt]sx?$': 'babel-jest'
    },
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        "<rootDir>/dist"
    ]
}