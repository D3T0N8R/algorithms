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
    
        // concatenate the higher values with the lower values
        return mergedArray.concat(leftIndex < leftArray.length ? leftArray.slice(leftIndex) : rightArray.slice(rightIndex))
    };

    const _quickSort = (startIndex, endIndex, array, comparator) => {
        if (endIndex - startIndex < 1) {
            return;
        }

        const pivotValue = array[endIndex];
        let position = startIndex;

        for (let index = startIndex; index < endIndex; index++) {
            if (comparator(array[index], pivotValue) === -1) {
                // swap the lower value with the value at the current position
                const positionValue = array[position];
                array[position] = array[index];
                array[index] = positionValue;
                position++;
            }
        }

        // swap the value of the current position with the pivot value
        array[endIndex] = array[position];
        array[position] = pivotValue;

        // sort the items less than the pivot value
        _quickSort(startIndex, position - 1, array, comparator);
        
        // sort the items greater than, or equal to, the pivot value
        _quickSort(position + 1, endIndex, array, comparator);

        return array;
    };

    this.quickSort = (array, mutate = false, comparator = _comparator) => {
        return _quickSort(0, array.length - 1, mutate ? array : [...array], comparator);
    };

    this.bubbleSort = (array, mutate = false, comparator = _comparator) => {
        const sortedArray = mutate ? array : [...array];
        let valueSwapped = false;

        do {
            valueSwapped = false;

            for (let index = 0; index < sortedArray.length - 1; index++) {
                let leftValue = sortedArray[index];
                let rightValue = sortedArray[index + 1];

                if (comparator(leftValue, rightValue) === 1) {
                    sortedArray[index] = rightValue;
                    sortedArray[index + 1] = leftValue;
                    valueSwapped = true;
                }
            }
        } while(valueSwapped);

        return sortedArray;
    };
};

const sortTest = (sortFunction, functionName, mutate = false) => {
    const unsortedArray = [9, 1, 8, 2, 7, 3, 6, 4, 5];
    const postFix = mutate ? ' with array mutation' : '';
    const arguments = [unsortedArray];

    if (mutate) {
        arguments.push(true);
    }

    console.log(`before ${functionName}${postFix}: ${unsortedArray}`);
    const sortedArray = sortFunction(...arguments);
    console.log(`after ${functionName}${postFix}: ${sortedArray}`);
    console.log(`original array after ${functionName}${postFix}: ${unsortedArray}`);
    console.log('');
};

const sorting = new Sorting();
sortTest(sorting.mergeSort, 'merge sort');
sortTest(sorting.quickSort, 'quick sort');
sortTest(sorting.quickSort, 'quick sort', true);
sortTest(sorting.bubbleSort, 'bubble sort');
sortTest(sorting.bubbleSort, 'bubble sort', true);

Array.prototype.mergeSort = function() {
    return new Sorting().mergeSort(this);
};

console.log([9, 1, 8, 2, 7, 3, 6, 4, 5].mergeSort());