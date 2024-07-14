<script setup>
    import { ref } from 'vue'
    const props = defineProps({
        options: {
            type: Object,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        current: {
            type: String,
            required: true,
        }
    })

    const selected = ref(props.current);

    const emit = defineEmits({
        onChange: ({ value }) => {
            if (value) return true
            else return false
        }
    })

    const changeValue = () => {
        emit('onChange', { value: selected.value })
    }


</script>

<template>
    <AppSelectInput v-model="selected" :options="options" optionLabel="name" optionValue="code" placeholder="Выберите тариф" class="w-full" @change="changeValue" />
</template>