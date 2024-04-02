

export function useCommonHook() {

    
function getLast30DaysDates() {

    var today = new Date();
    var endDate = new Date(); // End date is today
    var startDate = new Date();
    startDate.setDate(today.getDate() - 29); // Start date is 30 days ago

    return {
        startDate: startDate,
        endDate: endDate
    };
    
}

return {getLast30DaysDates}


}