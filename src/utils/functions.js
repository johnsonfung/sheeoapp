export const checkProgress = (checks, data) => {
  if (checks && data) {
    let totalPts = 0;
    let pts = 0;

    checks.forEach((item) => {
      if (item.condition) {
        if (data) {
          if (data[item.parent]) {
            if (data[item.condition.parent]) {
              // no equal to
              if (item.condition.operator === "notEqualTo") {
                if (
                  data[item.condition.parent][item.condition.field] !==
                  item.condition.value
                ) {
                  totalPts++;
                  if (data[item.parent][item.field]) {
                    pts++;
                  }
                }
                // equal to
              } else if (item.condition.operator === "equalTo") {
                if (
                  data[item.condition.parent][item.condition.field] ===
                  item.condition.value
                ) {
                  totalPts++;
                  if (data[item.parent][item.field]) {
                    pts++;
                  }
                }
              } else if (item.condition.operator === "greaterThan") {
                if (
                  data[item.condition.parent][item.condition.field] >
                  item.condition.value
                ) {
                  totalPts++;
                  if (data[item.parent][item.field]) {
                    pts++;
                  }
                }
              } else if (item.condition.operator === "lessThan") {
                if (
                  data[item.condition.parent][item.condition.field] <
                  item.condition.value
                ) {
                  totalPts++;
                  if (data[item.parent][item.field]) {
                    pts++;
                  }
                }
              } else {
                alert("wrong operator in item condition");
              }
            }
          }
        }
      } else {
        totalPts++;
        if (data) {
          if (data[item.parent]) {
            if (data[item.parent][item.field]) {
              pts++;
            }
          }
        }
      }
    });
    return Math.round((100 * pts) / totalPts);
  } else {
    return 0;
  }
};

// FORMATTING NUMBERS //

export const roundRate = (value) => {
  if (value === null) {
    value = 0;
  }
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  return Number(Math.round(value + "e" + 5) + "e-" + 5);
};

export const roundMoney = (value) => {
  return Number(Math.round(value + "e" + 2) + "e-" + 2);
};

export const formatMoney = (x) => {
  if (x === null || typeof x === "undefined" || x === "") {
    x = 0;
  }
  x = x.toString().replace(/[.](?=.*?\.)/g, "");
  x = x.replace(/[^0-9.]/g, "");
  x = parseFloat(x).toFixed(0);
  if (x < 0) {
    x = x * -1;
    return "-$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (x > 0) {
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "$0";
  }
};

export const formatRate = (x, numOfDecimals) => {
  if (x === null || typeof x === "undefined") {
    x = 0;
  }
  x = x.toString().replace(/[.](?=.*?\.)/g, "");
  x = x.replace(/[^0-9.]/g, "");
  x = parseFloat(x).toFixed(numOfDecimals);
  return x;
};

export const formattedMoneyToNumber = (formattedMoney) => {
  if (formattedMoney === "None" || formattedMoney === "" || !formattedMoney) {
    return 0;
  } else {
    formattedMoney = formattedMoney.toString();
    var numberInput = formattedMoney.replace(/,/g, "");
    numberInput = numberInput.replace(/\$/g, "");
    numberInput = numberInput.replace(/\s/g, "");
    return roundMoney(numberInput);
  }
};

export const findWithAttr = (array, attr, value) => {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
};

export const surplusIncomeEligible = (surplusIncome, household) => {
  household = parseInt(household);

  switch (household) {
    case 1:
      if (surplusIncome > 2243) {
        return false;
      } else {
        return true;
      }
      break;
    case 2:
      if (surplusIncome > 2793) {
        return false;
      } else {
        return true;
      }
      break;
    case 3:
      if (surplusIncome > 3433) {
        return false;
      } else {
        return true;
      }
      break;
    case 4:
      if (surplusIncome > 4168) {
        return false;
      } else {
        return true;
      }
      break;
    case 5:
      if (surplusIncome > 4728) {
        return false;
      } else {
        return true;
      }
      break;
    case 6:
      if (surplusIncome > 5332) {
        return false;
      } else {
        return true;
      }
      break;
    case 7:
      if (surplusIncome > 5936) {
        return false;
      } else {
        return true;
      }
      break;
    case 8:
      if (surplusIncome > 5936) {
        return false;
      } else {
        return true;
      }
      break;
    case 9:
      if (surplusIncome > 5936) {
        return false;
      } else {
        return true;
      }
      break;
    case 10:
      if (surplusIncome > 5936) {
        return false;
      } else {
        return true;
      }
      break;
    default:
      return false;
  }
};

// FORMS
