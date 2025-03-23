<template>
    <page-header></page-header>
    <filter-nav></filter-nav>

    
</template>

<script>
    import FilterNav from './FilterNav.vue'
    import PageHeader from './PageHeader.vue'
    export default{
        name: 'HomePage',
        components: {
            FilterNav,
            PageHeader,
        }
    }
</script>