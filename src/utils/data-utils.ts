export const transformDate = (date: Date) => {
    return date ? date.toLocaleString().slice(0, 10) : null;
};

export const getPrevDay = (today: Date, numOfDays: number) => {
    const prevDay = new Date(today);
    prevDay.setDate(prevDay.getDate() - numOfDays);
    return prevDay;
};

export const getNextDay = (today: Date, numOfDays: number) => {
    const nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + numOfDays);
    return nextDay;
};

export const getDiffs = (data: any, param: string) => {
    const diffs = data
        // @ts-ignore
        .reduce((result, value, index, collection) => {
            if (index === 0) return result;
            result[index] = value[param] - collection[index - 1][param];
            return result;
        }, [])
        .slice(1);
    return diffs;
};
