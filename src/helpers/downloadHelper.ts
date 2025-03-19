import { Response } from "express";
import ExcelJS from "exceljs";
export async function excelDownload(res:Response,data:object[]):Promise<void>{
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    const singleItem = Object.keys(data[1])
    
    worksheet.addRow(singleItem);

    // Add Data Rows (Example)

    data.forEach((row) => {
        worksheet.addRow(Object.values(row));
    });

    // Set Response Headers
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=data.xlsx"
    );

    // Write the Excel file to the response
    await workbook.xlsx.write(res);
    res.end();
}

export async function pdfDownload(res:Response,data:object[]): Promise<void>{
    
}