import Vuex from 'vuex';
import Vue from 'vue';
import db from '../firebase/firebase-init'


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        sentences: [],
        koreanTest: [],
        englishTest: [],
        repeatTest: [],
        curTest: [],
        isLoading: true
    },
    mutations: {
        passTestSentence(state, v) {
            const newTest = [...state.curTest];
            const type = v.type.toLowerCase();
            newTest.forEach((entry, curIndex) => {
                if (entry.index == v.index) {
                    newTest.splice(curIndex, 1);
                    state.curTest = newTest;
                    state[`${type}Test`] = newTest;
                }
            })
        },
        changeCurTest(state, v) {
            const type = v.type.toLowerCase();
            state.curTest = state[`${type}Test`];
        },
        repeatTestSentence(state, v) {
            const newTest = [...state.curTest];
            const type = v.type.toLowerCase();
            newTest.forEach((entry, curIndex) => {
                if (entry.index == v.index) {
                    newTest.splice(curIndex, 1);
                    state.repeatTest.push({ 'index': v.index });
                    state[`${type}Test`] = newTest;
                    state.curTest = newTest;
                    updateRepeatCnt(v.index);
                }
            })
        }
    }
});

async function updateRepeatCnt(index) {
    const sentence = store.state.sentences[index].sentence;
    const updateCnt = store.state.sentences[index].repeatCnt + 1;
    const curSentenceRef = await db.collection('english').doc(sentence);

    curSentenceRef.update({
        repeatCnt: updateCnt
    }).then(function () {
        console.log("Successfully updated repeat count!");
    }).catch(function (error) {
        console.error("Error updating document: ", error);
    });
}

async function loadSentences() {
    const datas = await db.collection('english').get();
    let index = 0;
    datas.forEach((data) => {
        store.state.sentences.push({
            'sentence': data.id,
            'meaning': data.data().meaning,
            'repeatCnt': data.data().repeatCnt,
        });
        store.state.koreanTest[index] = { 'index': index };
        store.state.englishTest[index] = { 'index': index };
        ++index;
    })
    store.state.isLoading = false;
    store.state.curTest = store.state.koreanTest;
}

loadSentences();
export default store;