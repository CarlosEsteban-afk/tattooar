<template>
    <div v-if="props.show" :class="['flex items-center p-2 mb-4 text-sm rounded-lg', bgColor, textColor]" role="alert">
        <span v-html="icon" class="shrink-0 inline w-4 h-4 me-3"></span>
        <div>
            <span class="font-medium">{{ props.title }}</span> <span>{{ props.message }}</span>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    show: Boolean,
    type: {
        type: String,
        default: 'error'
    },
    title: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    }
})

const bgColorMap = {
    error: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50',
    success: 'bg-green-50'
}

const textColorMap = {
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800',
    success: 'text-green-800'
}

const iconMap = {
    error: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.5 9.5 0 0 0 10 .5ZM9 5h2v6H9zm0 8h2v2H9z"/>
            </svg>`,
    warning:` <svg class="w-6 h-6 shrink-0 inline me-3" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                         d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                         clip-rule="evenodd" />
                    </svg>`,
    info: `    <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>`,
    success:`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4" viewBox="0 0 20 20">
            <path d="M16.707 5.293a1 1 0 0 0-1.414 0L9 11.586 6.707 9.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414z"/>
            </svg>`
}
const icon = iconMap[props.type] || iconMap.error
const bgColor = bgColorMap[props.type] || bgColorMap.error
const textColor = textColorMap[props.type] || textColorMap.error
</script>
