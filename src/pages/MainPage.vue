<template>
<div class="task-info">
    <h3 class="task-info__title">
        Задача
    </h3>
    <div class="task-info__body">
        <div>
            Тестовое задание состоит из разработки SPA с вертикальным списком (100+ строк), каждая строка имеет в себе 10+ ячеек.
        </div>
        <div>
            Ячейки с бордером и скругленными углами, содержание - случайное число, при ховере анимированое уменьшение на 20%.
        </div>
        <div class="task-info__actions">
            <h3 :class="{error: empty}">
                Укажите значения таблицы:
            </h3>
            <div class="task-info__inputs">
                <input v-model="rows"
                    placeholder="Введите кол-во строк"
                    type="number"
                >
                <input v-model="columns"
                       placeholder="Введите кол-во столбцов"
                       type="number"
                >
            </div>
            <div class="task-info__button_navigate">
                <div v-if="!spinner"
                    class="btn"
                    @click.stop="getData">
                    Перейти к заданию
                </div>
                <span v-else
                    class="loader"
                ></span>
            </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import {readonly, ref, shallowRef} from "vue";
import { getTableData } from "@/helpers/helpersForTable.ts";
import { useRouter } from "vue-router";
import app from "@/main.js";
import { RespObject } from "@/interfaces/helpers";
import type { Ref } from 'vue'

const tableData: Ref<null | RespObject[]> = shallowRef(null)
const rows: Ref<null | number> = ref(null)
const columns: Ref<null | number> = ref(null)
const spinner: Ref<boolean> = ref(false)
const empty: Ref<boolean> = ref(false)
const router = useRouter()

// Асинхронность для корректной работы спиннера, на случай указания больших значений
const getData = async ():Promise<void> => {
    if (rows.value && columns.value) {
        empty.value = false
        spinner.value = true
        // Math.trunc - валидация float
        await getTableData(Math.trunc(rows.value), Math.trunc(columns.value)).then((resp:RespObject[]): void => {
            spinner.value = false
            tableData.value = resp
            router.push('/table')
        })
    } else empty.value = true
}
// Инъекция, для сохранения состояния
app.provide('tableData', readonly(tableData))
</script>
<style scoped>
.task-info {
    padding: 3rem;
}
.task-info__title {
    text-align: center;
    font-size: 22px;
    font-weight: 600;
}
.task-info__body {
    margin-top: 1rem;
}
.task-info__actions h3 {
    margin-top: 1rem;
    margin-bottom: 0.6rem;
}
.task-info__button_navigate {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}
.task-info__inputs {
    display: flex;
    gap: 0.8rem;
}
.error {
    color: #ef0a0a;
}
input {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type=number] {
    -moz-appearance: textfield;
}
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #6ebeff;
    border-bottom-color: #337AB7;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
