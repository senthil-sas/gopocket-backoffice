export const useCommonHook = () => {

  function getLast30DaysDates() {
    var today = new Date();
    var endDate = new Date(); // End date is today
    var startDate = new Date();
    startDate.setDate(today.getDate() - 29); // Start date is 30 days ago

    return {
      startDate: startDate,
      endDate: endDate,
    };
  }

  const getFinancialYearDates = (date) => {
    const fiscalYearStartMonth = 3;
    const year = date.getFullYear();
    const startYear = date.getMonth() < fiscalYearStartMonth ? year - 1 : year;
    const startDate = new Date(startYear, fiscalYearStartMonth, 1);
    let endDate = new Date(startYear + 1, fiscalYearStartMonth - 1, 31);
    const currentDate = new Date();
    if (new Date(endDate) > currentDate) {
      endDate = new Date();
    }
    return {
      startDate: startDate,
      endDate: endDate,
    };
  };

  const getPreviousFinancialYearDates = async (date) => {
    const fiscalYearStartMonth = 3;
    const year = date.getFullYear() - 1;
    const startYear = date.getMonth() < fiscalYearStartMonth ? year - 1 : year;
    const startDate = new Date(startYear, fiscalYearStartMonth, 1);
    let endDate = new Date(startYear + 1, fiscalYearStartMonth - 1, 31);
    return {
      startDate: startDate,
      endDate: endDate,
    };
  };

  const getNextFinancialYearDates = async (fromDate, toDate) => {
    const fiscalYearStartMonth = 3;
    let year = toDate.getFullYear();

    if (fromDate.getFullYear() < new Date().getFullYear()) {
      year = year + 1;
    }
    const startYear =
      toDate.getMonth() < fiscalYearStartMonth ? year - 1 : year;
    const startDate = new Date(startYear, fiscalYearStartMonth, 1);
    let endDate = new Date(startYear + 1, fiscalYearStartMonth - 1, 31);
    const currentDate = new Date();
    if (new Date(endDate) > currentDate) {
      endDate = new Date();
    }
    return {
      startDate: startDate,
      endDate: endDate,
    };
  };

  return {
    getLast30DaysDates,
    getNextFinancialYearDates,
    getPreviousFinancialYearDates,
    getFinancialYearDates,
  };
}
