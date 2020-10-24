import Vuex from 'vuex';
import Vue from 'vue';
import db from '../firebase/firebase-init'


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        sentences: []        //여기에 추가 
        // import {mapState} from 'vuex'; =>  ...mapState({})  ...(spread 연산자): json 값을 분해
        //
    },
    mutations: {
        passTestSentence(state, v) {
            const newSentences = [...state.sentences];
            newSentences[v.index][`is${v.type}Test`] = false;
            newSentences[v.index].key = 'dddddddddddddddddddddd';
            state.sentences = newSentences;
        },
        repeatTestSentence(state, v) {
            const newSentences = [...state.sentences];
            newSentences.splice(v.index, 1, {
                'sentence': state.sentences[v.index].sentence,
                'meaning': state.sentences[v.index].meaning,
                'repeatCnt': state.sentences[v.index].repeatCnt,
                'isKoreanTest': v.type == 'Korean' ? false : true,
                'isEnglishTest': v.type == 'English' ? false : true,
                'isRepeatTest': true,
            })
            // state.sentences[v.index].isRepeatTest = true;
            // state.sentences[v.index][`is${v.type}Test`] = false;
            state.sentences = newSentences;
        }
    }
});

async function loadSentences() {
    const datas = await db.collection('english').get();
    datas.forEach((data) => {
        store.state.sentences.push({
            'sentence': data.id,
            'meaning': data.data().meaning,
            'repeatCnt': data.data().repeatCnt,
            'isKoreanTest': true,
            'isEnglishTest': true,
            'isRepeatTest': false,
        })
    })
}

loadSentences();
export default store;