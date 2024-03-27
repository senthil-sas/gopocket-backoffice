<template>
    <div v-if="show" class="mx-4">
        <div class="spinner-container">
            <div :data-width="width" class="spinner"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true
        };
    },
    props:{
        width: {String}
    }
};
</script>
<style>
.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.spinner {
    border: 1px solid #f3f3f3;
    border-top: 1px solid #4CADD6;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    animation: spin 0.4s linear infinite;
}
[data-width="12"] {
    border: 0.5px solid #f3f3f3;
    border-top: 0.5px solid #f3f3f3;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    animation: spin 0.4s linear infinite;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>