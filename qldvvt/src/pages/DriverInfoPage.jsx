import React from 'react';
import DataTable from '../components/DataTable'; // Import component DataTable
//import styles from './DriverInfoPage.module.css';
import { tableData } from '../Data/Appdata';
function DriverInfoPage() {
    const tableName = "DriverConfirmations";
    return (
      <div>
        <DataTable tableName={tableName} tableDataArray={tableData[tableName]} />
      </div>
    );
  }

export default DriverInfoPage;
