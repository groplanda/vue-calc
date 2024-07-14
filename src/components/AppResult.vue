<script setup>
    const props = defineProps({
        sum: {
            type: Object,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        }
    })
</script>

<template>
    <div class="w-full flex justify-content-center text-center md:text-lg result" v-if="sum.total">
        <span>Итого:</span>
        <span v-if="!sum.sale" class="result__total">
            {{sum.total}} {{currency}}
        </span>
        <span v-else class="flex align-items-start">
            <span class="result__total result__total--new">{{sum.total}} {{currency}}</span>
            <span class="result__total result__total--old">{{sum.cost}} {{currency}}</span>
            <span class="result__sale text-sm">-{{sum.sale}}%</span>
        </span>
    </div>
</template>

<style scoped>
    .result__total {
        color: #333;
        font-weight: 700;
        margin-left: 5px;
    }

    .result__total--new {
        color: #db2727;
    }

    .result__total--old {
        color: #777;
        margin-right: 5px;
    }

    .result__sale {
        background: #db2727;
        border-radius: 2px;
        padding: 2px 6px;
        color: #FFF;
        line-height: 1;
    }
</style>