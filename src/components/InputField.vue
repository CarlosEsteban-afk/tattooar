<template>
    <div>
        <label :for="id" class="block text-gray-700 mb-1 font-medium">{{ label }}</label>
        <input
            :id="id"
            :value="modelValue"
            @input="onInput"
            :type="type"
            :placeholder="placeholder"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
            :required="required"
            :minlength="minlength"
        />
    </div>
</template>

<script setup>

const props = defineProps({
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: [String, Number],
    type: { type: String, default: 'text' },
    placeholder: String,
    required: Boolean,
    minlength: [String, Number],
})

const emit = defineEmits(['update:modelValue'])

function onInput(event) {
    emit('update:modelValue', event.target.value)
}
</script>
