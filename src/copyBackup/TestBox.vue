<template>
<b-card no-body>
    <b-card-header header-tag="nav">
        <b-nav card-header tabs>
            <b-nav-item :active='this.curTestTap=="Korean"' @click='selectTap("Korean")'>Korean Test</b-nav-item>
            <b-nav-item :active='this.curTestTap=="English"' @click='selectTap("English")'>English Test</b-nav-item>
            <b-nav-item :active='this.curTestTap=="Repeat"' @click='selectTap("Repeat")'>Repeat Test</b-nav-item>
        </b-nav>
    </b-card-header>
    <b-card-body class="text-center">
        <div :key="index" v-for="(st, index) in activeSentences">
            <SentenceBox :index='index' :sentence='st.sentence' :meaning="st.meaning" :repeatCnt="st.repeatCnt" :type='curTestTap'></SentenceBox>
        </div>
    </b-card-body>
</b-card>
</template>

<script>
import SentenceBox from './sub/SentenceBox.vue'
import {mapState} from 'vuex';

export default {
    name: 'TestBox',
    components: {
        SentenceBox
    },
    computed: {
        activeSentences() {
            console.log("active");
            return this.sentences.filter(st => st[`is${this.curTestTap}Test`]);
        },
        ...mapState({
            sentences: 'sentences'
        })
    },
    methods: {
        sentenceType(st) {
            return this.curTestTap === "Korean" ? st.meaning : st.sentence;
        },
        selectTap(select) {
            this.curTestTap = select;
        },
        isCurrTestTap(tab) {
            return (tab == this.curTestTap);
        },
    },
    data() {
        return {
            curTestTap: "Korean",
        }
    },
}
</script>
