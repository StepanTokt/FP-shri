/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
 import { multiply } from 'lodash';
import Api from '../tools/api';
 const { test, compose, toString, both, gt, lt, length, allPass, modulo, equals, flip } = require('ramda');
 const api = new Api();

 const processSequence = async ({value, writeLog, handleSuccess, handleError}) => {
    writeLog(value)

    // Проверка, что строка состоит только из цифр и точки
    const isValidCharacters = test(/^[0-9]*\.?[0-9]+$/);

    // Проверка длины строки
    const minLength = compose(lt(2), length)
    const maxLength = compose(gt(10), length)
    const isLengthValid = both(minLength, maxLength)

    //больше нуля
    const isPositive = flip(gt)(0);

    // Композиция всех проверок
    const validate = allPass([
        isValidCharacters,
        isLengthValid,
        isPositive
    ]);
    const validateValue = validate(value);  

    //Если ошибка, то выкидываем её
    const isError = equals(validateValue, false);
    if(isError) handleError('ValidationError')

    // Преобразовать строку в число и округлить до ближайшего целого
    const toNumberAndRound = compose(Math.round, Number);
    const roundedValue = toNumberAndRound(value);

    // Записать округленное значение в writeLog
    writeLog(roundedValue);

    const { result } = await api.get("https://api.tech/numbers/base", {
      from: 10,
      to: 2,
      number: roundedValue,
    })
    writeLog(result);

    const res_length = length(result)
    writeLog(res_length)
    
    const sqr_res_length = multiply(res_length, res_length)
    writeLog(sqr_res_length)

    const prosThree_sqr_res_length = modulo(sqr_res_length, 3)
    writeLog(prosThree_sqr_res_length)

 }

export default processSequence;
