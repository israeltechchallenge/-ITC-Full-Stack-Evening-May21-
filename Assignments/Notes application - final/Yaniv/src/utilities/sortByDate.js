function sortByDate(arrayToSort) {
    arrayToSort.sort((a,b) => {
        const dateA = (a.updatedAt) ? a.updatedAt : a.createdAt;
        const dateB = (b.updatedAt) ? b.updatedAt : b.createdAt;
        return dateB - dateA;  
    });
    return arrayToSort;
}

export default sortByDate;