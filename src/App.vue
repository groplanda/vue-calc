<script setup>
  import { computed, onMounted, ref } from 'vue'
  import AppSelect from './components/AppSelect.vue';
  import AppResult from './components/AppResult.vue';
  import CurrencyAPI from '@everapi/currencyapi-js';

  const API_KEY = import.meta.env.VITE_API_KEY;
  const currencyApi = new CurrencyAPI(API_KEY);

  const MIN_DURATION = 1;
  const MAX_DURATION = 12;
  const INIT_SUM = {
    cost: 0,
    sale: 0,
    total: 0
  }
   
  const loading = ref(true);

  const currencyData = ref({})

  const sum = ref({...INIT_SUM})

  const selectedTariff = ref('');

  const tariff = ref([
    { name: 'Стандартный', code: 'standard', prices: [{ value: 100, duration: MIN_DURATION },{ value: 1000, duration: MAX_DURATION }] },
    { name: 'Продвинутый', code: 'advanced', prices: [{ value: 150, duration: MIN_DURATION },{ value: 1400, duration: MAX_DURATION }] },
  ])

  const selectedCurrency = ref('');

  const currency = ref([
    { name: 'Тенге', code: 'KZT' },
    { name: 'Юань', code: 'CNY' },
  ])

  const selectedTime = ref('');

  const time = ref([
    { name: '1 месяц', code: '1' },
    { name: '1 год', code: '12' },
  ])

  onMounted(() => {
    fetchCurrency()
  })

  const fetchCurrency = async () => {
    try {
      const request = await currencyApi.latest({
        base_currency: 'RUB',
        currencies: 'CNY,KZT'
      })

      currencyData.value = request.data;
      loading.value = false

    } catch(error) {
      throw new Error(error.message)
    }
  }

  const handleTariff = (data) => {
    selectedTariff.value = data.value;
    if (isFllInputs.value) calcSum();
  }

  const handleCurrency = (data) => {
    selectedCurrency.value = data.value
    if (isFllInputs.value) calcSum();
  }

  const handleTime = (data) => {
    selectedTime.value = data.value
    if (isFllInputs.value) calcSum();
  }

  const isFllInputs = computed(() => {
    return selectedTariff.value !== '' && selectedCurrency.value  !== '' && selectedTime.value  !== '';
  })

  const calcSum  = () => {
    sum.value = {...INIT_SUM};

    const selected = tariff.value.find(item => item.code === selectedTariff.value);
    const price = selected.prices.find(item => item.duration === +selectedTime.value);
    const currency =  currencyData.value[selectedCurrency.value].value;
    const cost = currency * price.value;

    if (+selectedTime.value === MAX_DURATION) {
      const oldPrice = selected.prices.find(item => item.duration === MIN_DURATION).value * MAX_DURATION * currency;
      sum.value.cost = Math.ceil(oldPrice)
      sum.value.sale = 100 - ((cost / oldPrice) * 100).toFixed(2)
    }
    sum.value.total = Math.ceil(cost)
  }

</script>

<template>
  <form class="w-full flex h-screen">
    <div class="container mx-auto my-auto">
      <div v-if="loading" class="flex">
        <AppLoading class="mx-auto"  />
      </div>
      <div v-else class="w-full">
        <h1 class="text-center mb-4">Tariff App</h1>
        <div class="md:flex md:flex-wrap mb-4 md:-ml-2 md:-mr-2">
          <div class="flex-1 md:ml-2 md:mr-2 mb-2 md:mb-0">
            <AppSelect :current="selectedTariff" :options="tariff" placeholder="Выберите тариф" @change="handleTariff" />
          </div>
          <div class="flex-1 md:ml-2 md:mr-2 mb-2 md:mb-0">
            <AppSelect :current="selectedCurrency" :options="currency" placeholder="Выберите валюту" @change="handleCurrency" />
          </div>
          <div class="flex-1 md:ml-2 md:mr-2 mb-2 md:mb-0">
            <AppSelect :current="selectedTime" :options="time" placeholder="Выберите период оплаты" @change="handleTime" />
          </div>
        </div>
        <AppResult :sum="sum" :currency="selectedCurrency" />
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>
