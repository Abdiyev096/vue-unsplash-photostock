import firebase from 'firebase/app'

export default {
    state: {

    },

    getters: {

    },

    mutations: {

    },

    actions: {
        getUserID() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },

        async login({commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },

        async register({commit, dispatch}, {email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUserID')

                if(uid) {
                    await firebase.database().ref(`/users/${uid}/info`).set({
                        email,
                        password,
                        name
                    })
                }
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },

        async logout() {
            await firebase.auth().signOut()
            // commit('clearUserInfo')
        }
    }
}