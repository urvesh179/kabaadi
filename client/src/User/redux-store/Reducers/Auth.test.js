import reducer from './Auth'

describe('auth reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: localStorage.getItem("token"),
            error: "",
            message: "",
            userId: "",
            user: {}
        })
    })
})