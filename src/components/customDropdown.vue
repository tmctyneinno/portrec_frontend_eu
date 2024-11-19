<template>
    <span class="d-none d-md-block">
        <v-select @option:selected="handleSelection" append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
            :teleport="true" :label="label" class="text-capitalize job-chooser " :clearable="false"
            :options="items"></v-select>
    </span>

    <span class="d-md-none">
        <select @change="handleNativeSelection" class="form-select">
            <option v-for="item in items" :value="JSON.stringify(item)" :key="item.id || item[label]">{{ item[label] }}
            </option>
        </select>
    </span>



</template>

<script setup lang="ts">
import useFxn from '@/stores/Helpers/useFunctions';


interface Item {
    id: number;
    name: string;
    [key: string]: any;
}

defineProps({
    modelValue: {
        type: Object as () => Item | null,
        default: null,
    },
    items: {
        type: Array as () => Item[],
        required: true,
        default: () => [],
    },
    label: {
        type: String,
        default: 'name',
    },
});


const emit = defineEmits(['update:modelValue', 'selected']);
const handleSelection = (selectedItem: any) => {
    emit('update:modelValue', selectedItem);
};

const handleNativeSelection = (event: Event) => {
    const selectedItem = JSON.parse((event.target as HTMLSelectElement).value);
    emit('update:modelValue', selectedItem);
    emit('selected', selectedItem);
};
</script>