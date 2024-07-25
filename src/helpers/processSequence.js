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
import Api from "../tools/api";
const {test,compose,lt,gt, length, both, equals, allPass,__, andThen,assoc,pipe,prop,modulo,concat,tap,partial, otherwise, ifElse}=require('ramda')

const api = new Api();
const numUrl = "https://api.tech/numbers/base";
const animalUrl = "https://animals.tech/";

const isValidNum = test(/^(0|[1-9]\d*)(\.\d+)?$/);

const minLen = compose(lt(2,__), length);
const maxLen = compose(gt(10,__), length);
const isLenValid = both(minLen, maxLen);
const isPositive = compose(lt(0,__), Number);
const makeNumandRound = compose(Math.round, Number);
const makeStr = andThen(String)

const validate = allPass([isValidNum, isLenValid, isPositive]);

const numRequest = pipe(assoc("number", __, {from:10, to:2}), api.get(numUrl))
const getRes = compose(String, prop("result"))
const thenGetRes = andThen(getRes)

const getLen = andThen(length)
const sq = (num)=> num*num
const getSq = andThen(compose(Number,sq))
const getMod = andThen(modulo(__,3))

const makeAnimalRequest = andThen(concat(animalUrl, __));
const animalRequest = andThen(api.get(__,{}));


     

  //главная функция
const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
const callError = partial(handleError,["ValidationError"])
const callSuccess = andThen(handleSuccess)
const log = tap(writeLog)
const makeLog = andThen(log)

const runFunc = pipe(
 makeNumandRound,
 log,
 numRequest,
 thenGetRes,
 makeLog,
 getLen,
 makeLog,
 getSq,
 makeLog,
 getMod,
 makeLog,
 makeStr,
 makeAnimalRequest,
 animalRequest,
 thenGetRes,
 callSuccess,
 otherwise(callError)
)

const runWithErrorOrSuccess = ifElse(validate, runFunc, callError)
const run = compose(runWithErrorOrSuccess, log)

run(value)
  

};

export default processSequence;

