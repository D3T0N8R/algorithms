const mergeSort = (array) => {
    if (!Array.isArray(array)) {
        throw Error(`${array} must be an array.`);
    }

    if (array.length === 1) {
        return array;
    }

    const splitIndex = Math.floor(array.length / 2);
    const leftArray = mergeSort(array.slice(0, splitIndex));
    const rightArray = mergeSort(array.slice(splitIndex));
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

const unsortedArray = [9, 1, 8, 2, 7, 3, 6, 4, 5];
console.log(`before sorting: ${unsortedArray}`);

const sortedArray = mergeSort(unsortedArray);
console.log(`after sorting: ${sortedArray}`);