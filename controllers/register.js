const mapSection = {
    "ACC": 1,
    "CRC": 2,
    "HRD": 3,
    "BOL": 4,
    "PUS": 5,
    "DCC": 6,
    "CTS": 7,
    "PLN": 8,
    "STA": 9,
    "QAT": 10,
    "REC": 11,
    "NMD": 12,
    "PRD": 13,
    "PMF": 14,
    "MMT": 15,
    "TEC": 16,
    "WHC": 17,
    "ASY": 18,
    "admin": 19,
    "Vice President": 20,
  };
  
  function mapInputSection(input) {
    return mapSection[input] || null; // ถ้าไม่พบ mapping ให้คืนค่า null
  }
  
  const mapRole = {
    "Admin(0)": 0,
    "Employee(1)": 1,
    "Manager3(2)": 2,
    "Manager2(3)": 3,
    "Manager1(4)": 4,
    "Vice President(5)": 5,
  };
  
  function mapInputRole(input) {
    return mapRole[input] || null; // ถ้าไม่พบ mapping ให้คืนค่า null
  }
  
  module.exports = async (req, res) => {
    try {
      const { title, name, surname, en, role, section, branch, tel, user, password, email } = req.body;
      const section_id = mapInputSection(section);
      const role_id = mapInputRole(role);
  
      console.log(title);
      console.log(name);
      console.log(surname);
      console.log(en);
      console.log(role);
      console.log(section);
      console.log(branch);
      console.log(tel);
      console.log(password);
      console.log(email);
  
      // Check if section_id and role_id are valid
      if (section_id != null && role_id != null) {
        await conn.query(
          "INSERT INTO employee(en, title_name, name, last_name, user, password, e_mail, department_id, tel, role, branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [en, title, name, surname, user, password, email, section_id, tel, role_id, branch]
        );
        res.status(200).json({ message: "Employee registered successfully" });
        console.log("Employee registered successfully")
      } else {
        res.status(400).json({ message: "Invalid section or role" });
        console.log("Invalid section or role" )
      }
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        error
      });
      console.log(error);
    }
  };
  