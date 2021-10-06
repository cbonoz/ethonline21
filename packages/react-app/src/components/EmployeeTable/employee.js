import { UserOutlined } from "@ant-design/icons";

// [first_name,last_name,phone,address,email,gender,title,salary]
const c = (title, key, props, dataIndex) => ({ title, key, dataIndex: dataIndex || key, ...props });

export const COLUMNS = [
  c("---", undefined, {
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
