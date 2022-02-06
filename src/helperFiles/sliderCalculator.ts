import { AppData } from '../index';

interface State {
  [key: string]: number
};

let obj:State = {
}

/**
 * Slider Calculators
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

export function calculateTotal(value: number, id: string) {
  obj[id] = value;
  return Object.keys(obj).reduce((acc, key) => {
    return obj[key] + acc;
  }, 0);
}

export function calculateData(data:AppData[], row: AppData, newVal: number) {
  return data.map((e: AppData) => {
    return e.id === row.id ? { 
      id: row.id, 
      value: newVal, 
      name: row.name 
    } : e;
  });
}

export function resetTotal() {
  obj = {};
}
