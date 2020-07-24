import firebase from 'firebase/app'

export default {
    state: {
        favorites: []
    },

    getters: {
        getFavoritePhotos(state) {
            return state.favorites
        }
    },

    mutations: {
        setFavorites(state, arr) {
            state.favorites = [...arr]
        },

        addToFavorites(state, el) {
            state.favorites.push(el)
        },

        deleteFromFavorites(state, dataBaseID) {
            const i = state.favorites.findIndex(el => el.dataBaseID === dataBaseID)
            state.favorites.splice(i, 1)
        }
    },

    actions: {
        async fetchFavorites({commit, dispatch}) {
            try {
                const uid = await dispatch('getUserID')
                const favorites = (await firebase.database().ref(`users/${uid}/favorites`).once('value')).val() || {}
                const arr =  Object.keys(favorites).map(key => {
                    return {
                        ...favorites[key],
                        dataBaseID: key
                    }
                })

                if(arr) {
                    commit('setFavorites', arr)
                }
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },

        async addToFavorites({commit, dispatch}, el) {
            try {
                const uid = await dispatch('getUserID')
                const response = await firebase.database().ref(`users/${uid}/favorites`).push(el)
                commit('addToFavorites', {
                    ...el,
                    dataBaseID: response.key
                })
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },

        async deleteFromFavorites({commit, dispatch}, dataBaseID) {
            try {
                const uid = await dispatch('getUserID')
                await firebase.database().ref(`/users/${uid}/favorites`).child(dataBaseID).remove()
                commit('deleteFromFavorites', dataBaseID)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    }
}