/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */


import {nth, all, lt, allPass, equals, propEq, filter, compose, length, map,  not, prop, anyPass } from 'ramda';

const filterByColor = compose(filter,equals());
const countColor = color => compose(length, filterByColor(color));
const getShapes = ({ star, triangle, circle, square }) => [star, triangle, circle, square];

const countRed = countColor('red')
const countOrange = countColor('orange')
const countBlue = countColor('blue')
const countGreen = countColor('green')
const isThreeOrMore = count => count >= 3;
const createColorCheck = colorCountFunction => compose(isThreeOrMore, colorCountFunction);

const isRedStar = propEq('star', 'red');
const isGreenSquare = propEq('square', 'green');
const isWhiteTriangle = propEq('triangle', 'white');
const isWhiteCircle = propEq('circle', 'white');
const isBlueStar = propEq('star', 'blue');
const isOrangeStar = propEq('star', 'orange');
const isGreenStar = propEq('star', 'green');
const isBlueCircle = propEq('circle', 'blue');
const isOrangeSquare = propEq('square', 'orange');

const isRedEqualBlue = shapes => equals(countRed(shapes), countBlue(shapes))
const FourColors = [countRed, countBlue, countGreen, countOrange]
const checkFourColors = map(createColorCheck, FourColors) 

const isGreenTriangle = propEq('triangle', 'green');
const hasTwoGreens = compose(equals(2), countGreen);
const hasOneRed = compose(equals(1), countRed);
const isOneRed = compose(hasOneRed, getShapes)
const isTwoGreen = compose(hasTwoGreens, getShapes)

const getTriange = prop('triangle')
const getSquare = prop('square')

const isEqualTriangleToSquare = shape => equals(getTriange(shape), getSquare(shape));
const isTriangeNotEqualWhite = shape => not(equals(getTriange(shape), 'white'));


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle])
// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(lt(1), countGreen, getShapes);
//3. Количество синих == красных
export const validateFieldN3 = compose(isRedEqualBlue,getShapes)
// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isRedStar, isBlueCircle, isOrangeSquare])
// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(anyPass(checkFourColors), getShapes);
// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isGreenTriangle, isTwoGreen, isOneRed]);
// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(equals(4), countOrange, getShapes);
// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = anyPass([isBlueStar, isOrangeStar, isGreenStar]);
// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(equals(4), countGreen, getShapes);
// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([isEqualTriangleToSquare, isTriangeNotEqualWhite]);
