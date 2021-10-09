import { UserOutlined } from "@ant-design/icons";
import { c } from "../../util";

// [first_name,last_name,phone,address,email,gender,title,salary]

export const COLUMNS = [
  c("---", "", {
    render: () => <UserOutlined />,
  }),
  c("First", "first_name", {
    sorter: (a, b) => a.first_name < b.first_name,
    defaultSortOrder: "descend",
  }),
  c("Last", "last_name", {
    sorter: (a, b) => a.last_name < b.last_name,
    defaultSortOrder: "descend",
  }),
  c("Gender", "gender"),
  c("Email", "email"),
  c("Title", "title"),
  c("Salary", "salary", {
    sorter: (a, b) => a.salary < b.salary,
    defaultSortOrder: "descend",
  }),
];
