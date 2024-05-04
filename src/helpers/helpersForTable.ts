import {Properties, RespObject} from "../interfaces/helpers";

export const getTableData = (limit: number, countProperties: number):Promise<RespObject[]> => new Promise((resolve, reject) => {
    setTimeout(()=>{
        // Старт индекс
        let startNumberEntity: number = 1
        // Аналог питоновского list comprehension, генерируем указанное кол-во сущностей, их индексы и объединяем со сгенерированным кол-вом свойств
        const resp = new Array(limit).fill(1).map((i, idx) => {
            return Object.assign({
                id: startNumberEntity++
            }, getProperties(countProperties))
        })
        resolve(resp)
    }, 0)

    // return resp
})

const getProperties = (countProp: number):Properties => {
    const properties:{} | Properties = {}
    for (let i = 1; i <= countProp; i++) properties[`Number ${i}`] = (Math.random() * 100).toFixed(0)
    return properties
}

