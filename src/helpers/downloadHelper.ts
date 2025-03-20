import { Response } from "express";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit"
import moment from "moment";
async function excelDownload(res:Response,data:object[]):Promise<void>{
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

async function pdfDownload(res: Response, data: object[], title: string): Promise<void> {
    if (!data || data.length === 0) {
        res.status(400).json({ error: "No data available to generate PDF" });
        return;
    }

    const doc = new PDFDocument({ margin: 50, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${title.replace(/\s+/g, "_")}.pdf`);

    doc.pipe(res); // Stream the PDF to response

    // Title
    doc.fontSize(20).font("Helvetica-Bold").text(title, { align: "center" });
    doc.moveDown();

    // Date
    doc.fontSize(12).text(`Date: ${moment().format("YYYY-MM-DD HH:mm")}`, { align: "right" });
    doc.moveDown(2);

    // Table Title
    doc.fontSize(14).font("Helvetica-Bold").text(title, { underline: true });
    doc.moveDown(0.5);

    // Extract headers dynamically
    const headers = Object.keys(data[0]);
    const columnCount = headers.length;
    const pageWidth = 500; // Total usable width
    const minColumnWidth = 80; // Minimum width per column
    const columnWidth = Math.max(pageWidth / columnCount, minColumnWidth); // Adjusted width

    const startX = 50;
    let startY = doc.y;

    // Draw table headers with spacing
    doc.fontSize(12).font("Helvetica-Bold");
    headers.forEach((header, i) => {
        doc.text(header, startX + i * columnWidth, startY, { width: columnWidth, align: "left" });
    });

    // Draw separator line
    doc.moveDown(0.5);
    doc.moveTo(startX, doc.y).lineTo(startX + columnCount * columnWidth, doc.y).stroke();
    doc.moveDown(0.5);

    // Data Rows
    doc.fontSize(12).font("Helvetica");
    data.forEach((row:any) => {
        let rowY = doc.y;
        headers.forEach((header, i) => {
            doc.text(String(row[header] || ""), startX + i * columnWidth, rowY, { width: columnWidth, align: "left" });
        });

        doc.moveDown(1); // Ensure spacing between rows
    });

    // Signature Section
    doc.moveDown(2);
    doc.fontSize(14).font("Helvetica-Bold").text("Signature:", { align: "left" });
    doc.moveDown(0.5);
    doc.text("______________________", { align: "left" });

    doc.end();
}



export const downloadHelper ={
    excelDownload,
    pdfDownload
}