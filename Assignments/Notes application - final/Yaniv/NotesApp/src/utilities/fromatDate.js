function formatDate(date, withYear) {
    const options = { dateStyle: "medium", timeStyle: "short" };
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    let nth = 'th';
    let monthDayForNth = date.getDate().toString();
    const isTeen = ((monthDayForNth.length > 1) && (monthDayForNth[0] === '1')) ? true : false;
    monthDayForNth = (monthDayForNth.length > 1) ? monthDayForNth[1] : monthDayForNth;
  
    if (!isTeen) {
      switch (monthDayForNth) {
        case '1':
          nth = 'st';
          break;
        case '2':
          nth = 'nd';
          break;
        case '3':
          nth = 'rd';
          break;
        default:
          nth = 'th';
      }
    }
  
    formattedDate = (withYear) ? formattedDate.replace(',', nth).replace(/[,]/gm, '\n') : formattedDate.replace(/[,](.){5}[,]/gm, nth);
    return formattedDate;
  }

  export default formatDate;