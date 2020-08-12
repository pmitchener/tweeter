//format date from time stamp. format: MMM dd, YYYY
const getDisplayDateFromTimeStamp = (timeStmp) => {
  const dtFormatter = new Intl.DateTimeFormat('en', {year: "numeric", weekday: "short", month: "short", day: "2-digit"});
  const formatterResults = dtFormatter.formatToParts(timeStmp);
  const dtValues = {};
  formatterResults.forEach(({type, value}) => {
    switch (type) {
      case 'weekday':
        dtValues['weekday'] = value;
        break;
      case 'month':
        dtValues['month'] = value;
        break;
      case 'day':
        dtValues['day'] = value;
        break;
      case 'year':
        dtValues['year'] = value;
        break;
      default:
        break;
    }
  });
  
  return `${dtValues.month} ${dtValues.day}, ${dtValues.year}`;  
}

const getDisplayDate = (timeStmp) => {
  //if same day, display MMM dd, YYYY. i.e Aug 12, 2020
  //if between 6 day, display in days. i.e 2 days ago
  //if between 7 and 
  let customDtInfo = _getCustomDayeInfoObject(timeStmp);
  if (customDtInfo.days <= 6) {
    return `${customDtInfo.days} days ago`;
  }
  if (customDtInfo.weeks < 4) {
    return `${customDtInfo.weeks} weeks ago`;
  }
  if (customDtInfo.months < 12) {
    return `${customDtInfo.months} months ago`;
  } 
  return `${customDtInfo.years} years ago`
  /*if (result = (_getDateInDays(timeStmp)) <= 6) {
    return `${result} days ago`;
  }
  if (result = (_getDateInWeeks(timeStmp)) < 4) {
    return `${result} weeks ago`;
  }
  if (result = (_getDateInMonths(timeStmp)) < 12) {
    return `${result} months ago`;
  } 
  return `${_getDateInYears(timeStmp)} years ago` ;*/
};
const _getCustomDayeInfoObject = (timeStmp) => {
  //get time in days
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;  
  const d1 = new Date();
  const d2 = new Date(timeStmp); 
  
  const milis_Time_Diff = d1.getTime() - d2.getTime(); 
  let days = Math.ceil(milis_Time_Diff / ONE_DAY);  
  let weeks = Math.ceil(days / 7);
  let months = Math.ceil(weeks / 4);
  let years = Math.ceil(months / 12);
  
  return {
    days,
    weeks,
    months,
    years
  }
}
/* const _getDateInDays = (timeStmp) => {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;  
  const d1 = Date.now;
  const d2 = new Date(timeStmp); 
  
  const milis_Time_Diff = d1.getTime() - d2.getTime(); 
  return Math.ceil(milis_Time_Diff / ONE_DAY);  
};

const _getDateInWeeks = (timeStmp) => {
  const days = _getDateInDays(timeStmp);
  return Math.ceil(days / 7);
}

const _getDateInMonths = (timeStmp) => {
  const weeks = _getDateInWeeks(timeStmp);
  return Math.ceil(days / 4);
}

const _getDateInYears = (timeStmp) => {
  const months = _getDateInMonths(timeStmp);
  return Math.ceil(months / 12);
} */