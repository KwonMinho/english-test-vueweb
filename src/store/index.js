import Vuex from 'vuex';
import Vue from 'vue';
import db from '../firebase/firebase-init'

const GET_SIZE = 10;

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loadCnt: 0,
        fullSize: 0,
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
        },
        loadMoreSentences(state, v) {
            loadMore(v.type.toLowerCase());
        },
        addSentence(state, v) {
            add(v.sentence, v.meaning)
        }
    }
});


async function add(sentence, meaning) {
    await db.collection('english')
        .doc(sentence)
        .set({
            'index': store.state.fullSize,
            'meaning': meaning,
            'repeatCnt': 0
        });
    ++store.state.fullSize;

    const metaRef = await db.collection('english-meta').doc('meta');
    metaRef.update({
        size: store.state.fullSize
    }).then(function () {
        console.log("Successfully updated meta full size!");
    }).catch(function (error) {
        console.error("Error updating document: ", error);
    });
}

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

async function loadMore(type) {
    const datas = await db.collection('english')
        .limit(GET_SIZE)
        .where("index", ">", store.state.loadCnt)
        .orderBy("index", "asc")
        .get();
    let index = store.state.koreanTest.length;
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
    store.state.curTest = store.state[`${type}Test`];
}

async function initLoad() {
    const datas = await db.collection('english').limit(GET_SIZE).get();
    let index = store.state.koreanTest.length;
    datas.forEach((data) => {
        store.state.sentences.push({
            'sentence': data.id,
            'meaning': data.data().meaning,
            'repeatCnt': data.data().repeatCnt,
        });
        store.state.koreanTest[index] = { 'index': index };
        store.state.englishTest[index] = { 'index': index };
        ++store.state.loadCnt;
        ++index;
    })
    store.state.isLoading = false;
    store.state.curTest = store.state.koreanTest;

    const meta = await db.collection('english-meta').get();
    meta.forEach((m) => {
        store.state.fullSize = m.data().size;
    })
}

initLoad();
export default store;