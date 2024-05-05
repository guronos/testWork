<template>
    <div class="table__wrapper">
        <div v-if="dataTableInject"
             class="table"
             ref="tableEl"
        >
            <div class="table__header">
                <div v-for="(title, idx) in titlesTable"
                     v-once
                     :key="idx"
                     class="table__cell table__title">
                    <template v-if="title === 'id'">
                        Номер п\п
                    </template>
                    <template v-else>
                        {{title}}
                    </template>
                </div>
            </div>
            <div v-for="(rowData, idx) in dataTable"
                 v-memo="[rowData]"
                 :key="idx"
                 class="table__row"
                 ref="rowsEl"
            >
                <div v-for="(property, key) in rowData"
                     v-memo="[property]"
                     :key="key"
                     class="cell__wrapper"
                >
                    <div class="table__cell">
                        {{property}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {onMounted, ref, inject, Ref, UnwrapRef, shallowRef, computed} from "vue";
import {RespObject} from "@/interfaces/helpers";
import {useRouter} from "vue-router";

const router = useRouter()
const rowsEl: Ref<HTMLDivElement[]> = ref(null)

const dataTableInject = inject('tableData')?.value
if (!dataTableInject) router.push('/')

const dataTableRaw: RespObject[] = JSON.parse(JSON.stringify(dataTableInject || []))
const dataTable: Ref<UnwrapRef<RespObject[]>> = shallowRef(dataTableRaw.splice(0, 20))
const titlesTable = computed(() => Object.keys(dataTable.value[0]))

const callbackObserver = (element: Element[IntersectionObserverEntry], observer: IntersectionObserver): void => {
    const el = element[0]
    if (el.isIntersecting) {
        dataTable.value = [...dataTable.value, ...dataTableRaw.splice(0, 20)]
        observer.unobserve(el.target)
        if (dataTableRaw.length) observer.observe(rowsEl.value.at(-1))
        else {
            observer.unobserve(el.target)
            observer.disconnect()
        }
    }
}
const optionsObserver = {
    rootMargin: '0px 0px 2% 0px',
    threshold: 0,
}
const observer = new IntersectionObserver(callbackObserver, optionsObserver)
onMounted(() => {
    if (dataTableRaw.length) observer.observe(rowsEl.value.at(-1))
})

</script>
<style scoped>
.table__wrapper {
    width: var(--max-width);
    height: var(--max-body-height);
    display: flex;
    overflow: scroll;
}
.table {
    width: auto;
    display: flex;
    flex-direction: column;
    margin: auto;
}
.table__header, .table__row {
    display: flex;
    border-right: 1px solid #000000;
    border-left: 1px solid #000000;
    border-radius: 4px;
}
.table__title {
    font-size: 1.1rem;
    font-weight: 500;
    color: #000000;
}
.table__cell {
    height: 6rem;
    width: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000000;
    border-radius: 4px;
    transition: transform 0.5s, border 0.5s ease-out;
}
.cell__wrapper:first-child .table__cell {
    font-weight: 900;
}
.cell__wrapper:not(:first-child):hover .table__cell {
    border: 1px solid #2e55a6;
    transform: scale(80%);
}
</style>
