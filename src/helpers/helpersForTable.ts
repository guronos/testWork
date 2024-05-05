import {Properties, RespObject} from "../interfaces/helpers";

export const getTableData = (limit: number, countProperties: number):Promise<RespObject[]> => new Promise((resolve, reject) => {
    // Таймаут - наиболее простой способ кинуть задачу в макротаски, т.е. сначала рендеринг спиннера, а только потом генерация данных
    setTimeout(()=>{
        // Старт индекс
        let startNumberEntity: number = 1
        // Аналог питоновского list comprehension, генерируем указанное кол-во сущностей, их индексы и объединяем со сгенерированным кол-вом свойств
        try {
            const resp = new Array(limit).fill(1).map((i, idx) => {
                return Object.assign({
                    id: startNumberEntity++
                }, getProperties(countProperties))
            })
            resolve(resp)
        } catch (e) {
            reject('Возникла логическая ошибка')
        }
    }, 0)
})

const getProperties = (countProp: number):Properties => {
    const properties:{} | Properties = {}
    for (let i = 1; i <= countProp; i++) properties[`Number ${i}`] = (Math.random() * 100).toFixed(0)
    return properties
}

