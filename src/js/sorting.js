function Sorting() {
    Sorting.prototype = Object.create(Object.prototype);

    const _comparator = (a, b) => {
        if (a < b) {
            return -1;
        }
        
        if (a > b) {
            return 1;
        }

        return 0;
    };

    this.mergeSort = (array, comparator = _comparator) => {
        if (!Array.isArray(array)) {
            throw Error(`${array} must be an array.`);
        }
    
        if (array.length === 1) {
            return array;
        }
    
        const splitIndex = Math.floor(array.length / 2);
        const leftArray = this.mergeSort(array.slice(0, splitIndex));
        const rightArray = this.mergeSort(array.slice(splitIndex));
        let mergedArray = [];
        let leftIndex = 0;
        let rightIndex = 0;
    
        while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            const leftValue = leftArray[leftIndex];
            const rightValue = rightArray[rightIndex];
    
            if (comparator(leftValue, rightValue) === -1) {
                mergedArray.push(leftValue);
                leftIndex++;
            } else {
                mergedArray.push(rightValue);
                rightIndex++;
            }
        }
    
        if (leftIndex < leftArray.length) {
            return mergedArray.concat(leftArray.slice(leftIndex));
        } else {
            return mergedArray.concat(rightArray.slice(rightIndex));
        }
    };

    const _quickSort = (startIndex, endIndex, array, comparator) => {
        if (endIndex - startIndex < 1) {
            return;
        }

        const pivotValue = array[endIndex];
        let position = startIndex;

        for (let index = startIndex; index < endIndex; index++) {
            if (comparator(array[index], pivotValue) === -1) {
                if (index !== position) {
                    const positionValue = array[position];
                    array[position] = array[index];
                    array[index] = positionValue;
                }

                position++;
            }
        }

        array[endIndex] = array[position];
        array[position] = pivotValue;

        _quickSort(startIndex, position - 1, array, comparator);
        _quickSort(position + 1, endIndex, array, comparator);

        return array;
    };

    this.quickSort = (array, mutate = false, comparator = _comparator) => {
        return _quickSort(0, array.length - 1, mutate ? array : [...array], comparator);
    };
};

const sorting = new Sorting();
const unsortedArray = [9, 1, 8, 2, 7, 3, 6, 4, 5];

console.log(`before merge sorting: ${unsortedArray}`);
const mergeSortedArray = sorting.mergeSort(unsortedArray);
console.log(`after merge sorting: ${mergeSortedArray}`);

console.log('');

console.log(`before quick sorting: ${unsortedArray}`);
const quickSortedArray = sorting.quickSort(unsortedArray);
console.log(`after quick sorting: ${quickSortedArray}`);

console.log('');

console.log(`before quick sorting with array mutation: ${unsortedArray}`);
const quickSortedMutatedArray = sorting.quickSort(unsortedArray, true);
console.log(`after quick sorting with array mutation: ${quickSortedMutatedArray}`);
console.log(`original array after quick sorting with array mutation: ${unsortedArray}`);