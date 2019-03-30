const mergeSort = (array) => {
    if (!Array.isArray(array)) {
        throw Error(`${array} must be an array.`);
    }

    if (array.length === 1) {
        return array;
    }

    const splitIndex = Math.floor(array.length / 2);
    const leftHalf = array.slice(0, splitIndex);
    const rightHalf = array.slice(splitIndex);

    return merge(mergeSort(leftHalf), mergeSort(rightHalf));
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
        remainingValues = rightArray.slice(leftIndex);
    }

    return mergedArray.concat(remainingValues);
};


const unsortedArray = [9, 1, 8, 2, 7, 3, 6, 4, 5];
const sortedArray = mergeSort(unsortedArray);

console.log(unsortedArray);
console.log(sortedArray);