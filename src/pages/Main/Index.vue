<template>
  <q-page class="flex flex-center">
    <div class="full-width">
    <TopBarTemp class="q-mb-lg"/>
    <q-separetor class="full-width"/>
    </div>
  </q-page>
</template>

<script>
import TopBarTemp from 'src/components/TopBarTemp/Index.vue';

export default {
  name: 'MainPage',
  components: {
    TopBarTemp
  },
};
</script>