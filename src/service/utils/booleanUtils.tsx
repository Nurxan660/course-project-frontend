const convertBooleanFieldType = (value: any) => {
  if (value === "1") return <span style={{ color: "green" }}>✔</span>;
  else return <span style={{ color: "red" }}>✖</span>;
};

const convertBooleanStatus = (value: any) => {
    if (value) return <span style={{ color: "green" }}>✔</span>;
    else return <span style={{ color: "red" }}>✖</span>;
  };

const convertBooleanAdminStatus = (role: string) => {
    if (role === "ROLE_ADMIN") return <span style={{ color: "green" }}>✔</span>;
    else return <span style={{ color: "red" }}>✖</span>;
};

export { convertBooleanFieldType, convertBooleanAdminStatus, convertBooleanStatus };
