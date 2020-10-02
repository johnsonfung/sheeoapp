export const personalInfo = {
  name: "Personal Info",
  slug: "personalInfo",
  key: "personalInfo",
  dataNeeded: [
    { parent: "personalInfo", field: "givenName" },
    { parent: "personalInfo", field: "familyName" },
    { parent: "personalInfo", field: "gender" },
    { parent: "personalInfo", field: "dateOfBirth" },
    { parent: "personalInfo", field: "streetAddress" },
    { parent: "personalInfo", field: "city" },
    { parent: "personalInfo", field: "province" },
    { parent: "personalInfo", field: "postalCode" },
    { parent: "personalInfo", field: "phone" },
  ],
  prescreen: true,
};

export const householdOccupation = {
  name: "Household & Occupation",
  slug: "household-occupation",
  key: "householdOccupation",
  dataNeeded: [
    { parent: "householdOccupation", field: "martialStatus" },
    {
      parent: "householdOccupation",
      field: "dateOfMartialEvent",
      condition: {
        parent: "householdOccupation",
        field: "martialStatus",
        operator: "notEqualTo",
        value: "single",
      },
    },
    { parent: "householdOccupation", field: "personsInHousehold" },
    {
      parent: "householdOccupation",
      field: "minorsInHousehold",
      condition: {
        parent: "householdOccupation",
        field: "personsInHousehold",
        operator: "greaterThan",
        value: 1,
      },
    },
    { parent: "householdOccupation", field: "employer" },
    { parent: "householdOccupation", field: "occupation" },
  ],
  prescreen: true,
};

export const consent = {
  name: "Consent",
  slug: "consent",
  key: "consent",
  dataNeeded: [
    { parent: "consent", field: "consent" },
    { parent: "consent", field: "over18" },
  ],
  prescreen: true,
};

export const monthlyIncome = {
  name: "Monthly Income",
  slug: "monthly-income",
  key: "monthlyIncome",
  dataNeeded: [{ parent: "monthlyIncome", field: "complete" }],
};

export const monthlyNonDExpenses = {
  name: "Monthly Non-Discretionary Expenses",
  slug: "monthly-non-discretionary-expenses",
  key: "monthlyNonDExpenses",
  dataNeeded: [{ parent: "monthlyNonDExpenses", field: "complete" }],
};

export const monthlyDExpensesHousing = {
  name: "Monthly Discretionary Expenses Housing",
  slug: "monthly-discretionary-expenses-housing",
  key: "monthlyDExpensesHousing",
  dataNeeded: [{ parent: "monthlyDExpensesHousing", field: "complete" }],
};

export const monthlyDExpensesPersonal = {
  name: "Monthly Discretionary Expenses Personal",
  slug: "monthly-discretionary-expenses-personal",
  key: "monthlyDExpensesPersonal",
  dataNeeded: [{ parent: "monthlyDExpensesPersonal", field: "complete" }],
};

export const monthlyDExpensesLiving = {
  name: "Monthly Discretionary Expenses Living",
  slug: "monthly-discretionary-expenses-living",
  key: "monthlyDExpensesLiving",
  dataNeeded: [{ parent: "monthlyDExpensesLiving", field: "complete" }],
};

export const monthlyDExpensesTransportation = {
  name: "Monthly Discretionary Expenses Transportation",
  slug: "monthly-discretionary-expenses-transportation",
  key: "monthlyDExpensesTransportation",
  dataNeeded: [{ parent: "monthlyDExpensesTransportation", field: "complete" }],
};

export const monthlyDExpensesInsurance = {
  name: "Monthly Discretionary Expenses Insurance",
  slug: "monthly-discretionary-expenses-insurance",
  key: "monthlyDExpensesInsurance",
  dataNeeded: [{ parent: "monthlyDExpensesInsurance", field: "complete" }],
};

export const monthlyDExpensesPayments = {
  name: "Monthly Discretionary Expenses Payments",
  slug: "monthly-discretionary-expenses-payments",
  key: "monthlyDExpensesPayments",
  dataNeeded: [{ parent: "monthlyDExpensesPayments", field: "complete" }],
};

export const monthlyDExpensesMedical = {
  name: "Monthly Discretionary Expenses Medical",
  slug: "monthly-discretionary-expenses-medical",
  key: "monthlyDExpensesMedical",
  dataNeeded: [{ parent: "monthlyDExpensesMedical", field: "complete" }],
};

export const balanceSheetAssets = {
  name: "Balance Sheet - Assets",
  slug: "balance-sheet-assets",
  key: "balanceSheetAssets",
  dataNeeded: [{ parent: "balanceSheetAssets", field: "complete" }],
};

export const balanceSheetLiabilities = {
  name: "Balance Sheet - Liabilities",
  slug: "balance-sheet-liabilities",
  key: "balanceSheetLiabilities",
  dataNeeded: [{ parent: "balanceSheetLiabilities", field: "complete" }],
};

export const businessOwnership = {
  name: "Business Ownership",
  slug: "business-ownership",
  key: "businessOwnership",
  dataNeeded: [{ parent: "businessOwnership", field: "complete" }],
};

export const otherTransactions = {
  name: "Other Transactions",
  slug: "other-transactions",
  key: "otherTransactions",
  dataNeeded: [{ parent: "otherTransactions", field: "complete" }],
};

export const screener = {
  name: "Eligibility",
  slug: "screener",
  key: "screener",
  dataNeeded: [],
  prescreen: true,
};

export const stepOrder = [personalInfo];
