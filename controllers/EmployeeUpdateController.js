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
  
  
  module.exports = async (req, res) => {
    try {
      const {old_en, en, title, name, surname, branch, tel, user, email, section, mode } = req.body;
      const section_id = mapInputSection(section);
      
  
      console.log(old_en);
      console.log(en);
      console.log(title);
      console.log(name)
      console.log(surname);
      console.log(branch);
      console.log(tel);
      console.log(user);
      console.log(email);
      console.log(section);
      console.log(mode);
  
      // Check if section_id and role_id are valid
      if (mode == 0) {
        await conn.query(
          "UPDATE employee SET en = ?, title_name = ?, name = ?, last_name = ?, user = ?, e_mail = ?, department_id = ?, tel = ?, branch = ? WHERE en = ?",
          [en, title, name, surname, user, email, section_id, tel, branch, old_en]
        );        
        res.status(200).json({ message: "Employee data update successfully" });
        console.log("Employee data updated successfully")
      } else if(mode == 1) {
        await conn.query(
          "DELETE FROM employee WHERE en = ?",
          [old_en]
        );        
        console.log("Employee deleted successfully")
      }

    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        error
      });
      console.log(error);
    }
  };
  