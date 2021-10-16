function dateToIsoStringWithTZ(date) {
    const dateMsc = date.getTime();
    const TimeZoneMsc = (new Date()).getTimezoneOffset() * 60000;

    const shortISOLocalString = new Date(dateMsc - TimeZoneMsc).toISOString().slice(0, 16).replace(' ','T');

    return shortISOLocalString;
}

export default dateToIsoStringWithTZ;