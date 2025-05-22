<template>
    <div class="relative h-48 flex items-center justify-center bg-cover">

        <button @click="$router.back()" class="absolute left-4 top-4 text-white text-2xl z-10">
            ←
        </button>

        <!-- Logo -->
        <img src="/assets/Banner.png" alt="Logo" class="h-15 z-10" />
    </div>
</template>


<style scoped>
.bg-cover {
    background-image: url('/assets/Background.png');
    background-size: cover;
    background-position: center;

}

.bg-cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(123, 110, 173, 0.4);
    /* morado translúcido */
    z-index: 0;
}
</style>