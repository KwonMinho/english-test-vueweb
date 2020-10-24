<template>
<button class="list-group-item text-left btn-block">
    <b-button size="sm" v-if='type!="Korean"' @click="pronunciation" >
        <b-avatar icon="soundwave" size="2em"></b-avatar>
    </b-button>
    {{type == 'Korean'? meaning: sentence}}
    <b-button variant="success" class="mr-1" size="sm" @click='pass'>Pass</b-button>
    <b-button variant="warning" v-if='type!="Repeat"' class="mr-1" size="sm" @click='repeat'>Repeat</b-button>
</button>
</template>

<script>
export default {
    methods: {
        pronunciation(){
            console.log("voice");
        },
        pass(){
            const index = this.$props.index;
            const type = this.$props.type;
            this.$store.commit('passTestSentence',{index, type});
        },
        repeat(){
            const index = this.$props.index;
            const type = this.$props.type;
            this.$store.commit('repeatTestSentence',{index, type});
        },
    },
    name: "SentenceBox",
    props: {
        index: Number,
        sentence: String,
        meaning: String,
        repeatCnt: Number,
        type: String,
    }
}
</script>
