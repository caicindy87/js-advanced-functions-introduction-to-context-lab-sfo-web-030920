function createEmployeeRecord(employeeInfoArray) {
  const employeeRecord = {
    firstName: employeeInfoArray[0],
    familyName: employeeInfoArray[1],
    title: employeeInfoArray[2],
    payPerHour: employeeInfoArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeRecord;
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(record, date) {
  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(date.slice(-4), 10),
    date: date.slice(0, 10),
  });
  return record;
}

function createTimeOutEvent(record, date) {
  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(date.slice(-4), 10),
    date: date.slice(0, 10),
  });
  return record;
}

function hoursWorkedOnDate(record, date) {
  const timeOutOnDate = record.timeOutEvents.find(
    (event) => event.date === date.slice(0, 10)
  );
  const timeInOnDate = record.timeInEvents.find(
    (event) => event.date === date.slice(0, 10)
  );

  return (timeOutOnDate.hour - timeInOnDate.hour) / 100;
}

function wagesEarnedOnDate(record, date) {
  const hoursWorkedOnThatDay = hoursWorkedOnDate(record, date);
  const payRate = record.payPerHour;

  return hoursWorkedOnThatDay * payRate;
}

function allWagesFor(record) {
  const datesWorked = record.timeInEvents.map((event) => event.date);
  const totalWages = datesWorked.reduce(function (accum, date) {
    return accum + wagesEarnedOnDate(record, date);
  }, 0);

  return totalWages;
}

function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.reduce(function (accum, record) {
    return accum + allWagesFor(record);
  }, 0);
}

function findEmployeeByFirstName(arrayOfEmployees, name) {
  return arrayOfEmployees.find((employee) => employee.firstName === name);
}
