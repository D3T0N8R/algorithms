const mergeSort = (array) => {
    if (!Array.isArray(array)) {
        throw Error(`${array} must be an array.`);
    }

    if (array.length < 2) {
        return array;
    }

    const start = array[0];
    const end = array[1];
    const leftArray = [start < end ? start : end, start < end ? end : start];
    const rightArray = mergeSort(array.slice(2));
    let mergedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        const leftValue = leftArray[leftIndex];
        const rightValue = rightArray[rightIndex];

        if (leftValue < rightValue) {
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

let unsortedArray = [9, 1, 8, 2, 7, 3, 6, 4, 5];
console.log(`before sorting: ${unsortedArray}`);

const sortedArray = mergeSort(unsortedArray);
console.log(`after sorting: ${sortedArray}`);