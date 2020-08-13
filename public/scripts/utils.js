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
   let customDtInfo = getCustomDayeInfoObject(timeStmp);
  if (customDtInfo.hours < 24) {
    return getDisplayDateFromTimeStamp(timeStmp);
  }
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
};
const getCustomDayeInfoObject = (timeStmp) => {
  //The number of milliseconds in one hour
  const ONE_HOUR = 1000 * 60 * 60;  
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;  
  const d1 = new Date();
  const d2 = new Date(timeStmp); 
  
  const milis_Time_Diff = d1.getTime() - d2.getTime(); 
  const hours = Math.ceil(milis_Time_Diff / ONE_HOUR);
  const days = Math.ceil(milis_Time_Diff / ONE_DAY);  
  const weeks = Math.ceil(days / 7);
  const months = Math.ceil(weeks / 4);
  const years = Math.ceil(months / 12);
  
  return {
    hours,
    days,
    weeks,
    months,
    years
  }
};