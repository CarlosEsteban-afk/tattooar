<template>
    <button @click="$emit('toggle')" class=" pr-3 rounded btn transition">
        ☰
    </button>
</template>
<script setup>

</script>
<style scoped>
.btn {
    background-color: var(--color-primary-light);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
}
.rounded {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-top-left-radius: 0rem;
    border-bottom-left-radius: 0rem;
}

</style>