const mergeSort = (array) => {
    if (!Array.isArray(array)) {
        throw Error(`${array} must be an array.`);
    }

    let endValues = [];

    if (array.length > 1) {
        const leftValue = array[0];
        const rightValue = array[array.length - 1];

        endValues.push(leftValue < rightValue ? leftValue : rightValue);
        endValues.push(rightValue > leftValue ? rightValue : leftValue);
    } else {
        return array;
    }

    return merge(endValues, mergeSort(array.slice(1, array.length - 1)));
};

const merge = (leftArray, rightArray) => {
    let mergedArray = [];
    let remainingValues = [];
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
        remainingValues = leftArray.slice(leftIndex);
    } else {
        remainingValues = rightArray.slice(rightIndex);
    }

    return mergedArray.concat(remainingValues);
};


const unsortedArray = [9, 1, 8, 2, 7, 3, 6, 4, 5];
const sortedArray = mergeSort(unsortedArray);

console.log(unsortedArray);
console.log(sortedArray);