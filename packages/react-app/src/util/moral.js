import Moralis from "moralis";
const Employee = Moralis.Object.extend("Employee");

export const saveEmployee = async emp => {
  const employee = new Employee();
  delete emp["id"];
  const keys = Object.keys(emp);

  keys.forEach(k => {
    employee.save(k, emp[k]);
  });
  console.log("save", employee);
  return await employee.save();
};

// https://docs.moralis.io/moralis-server/database/queries
export const getEmployee = async email => {
  const query = new Moralis.Query(Employee);
  query.equalTo("email", email);
  const results = await query.find();
  return results;
};
