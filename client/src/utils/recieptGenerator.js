import jsPDF from 'jspdf';
import { formatCurrency } from './currencyFormatter';

export const generateReceiptPDF = (sale) => {
  const doc = new jsPDF();
  
  // Add company header
  doc.setFontSize(20);
  doc.text('STORE INVENTORY', 105, 15, { align: 'center' });
  
  // Store info
  doc.setFontSize(10);
  doc.text('123 Store Street', 105, 25, { align: 'center' });
  doc.text('City, State 12345', 105, 30, { align: 'center' });
  doc.text('Phone: (123) 456-7890', 105, 35, { align: 'center' });
  
  // Sale details
  doc.setFontSize(12);
  doc.text(`Receipt: ${sale.saleId}`, 20, 50);
  doc.text(`Date: ${new Date(sale.createdAt).toLocaleString()}`, 20, 58);
  doc.text(`Cashier: ${sale.salesAgent?.name || 'N/A'}`, 20, 66);
  
  // Line separator
  doc.line(20, 75, 190, 75);
  
  // Items header
  doc.setFontSize(10);
  doc.text('ITEM', 20, 85);
  doc.text('QTY', 120, 85);
  doc.text('PRICE', 150, 85);
  doc.text('TOTAL', 180, 85, { align: 'right' });
  
  doc.line(20, 88, 190, 88);
  
  // Items
  let yPosition = 98;
  sale.items.forEach((item) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Item name (truncate if too long)
    const itemName = item.product.name.length > 30 
      ? item.product.name.substring(0, 30) + '...' 
      : item.product.name;
    
    doc.text(itemName, 20, yPosition);
    doc.text(item.quantity.toString(), 120, yPosition);
    doc.text(formatCurrency(item.price), 150, yPosition);
    doc.text(formatCurrency(item.price * item.quantity), 180, yPosition, { align: 'right' });
    
    yPosition += 8;
  });
  
  // Line separator before total
  yPosition += 5;
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 10;
  
  // Total
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL:', 20, yPosition);
  doc.text(formatCurrency(sale.totalAmount), 180, yPosition, { align: 'right' });
  
  // Payment method
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Payment Method: ${sale.paymentMethod?.toUpperCase() || 'CASH'}`, 20, yPosition);
  
  // Footer
  yPosition += 20;
  doc.setFontSize(8);
  doc.text('Thank you for your purchase!', 105, yPosition, { align: 'center' });
  doc.text('Please keep this receipt for your records', 105, yPosition + 5, { align: 'center' });
  
  // Save the PDF
  doc.save(`receipt-${sale.saleId}.pdf`);
};

// Simple HTML receipt for quick printing
export const generateHTMLReceipt = (sale) => {
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt - ${sale.saleId}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 20px; 
          max-width: 400px;
        }
        .header { 
          text-align: center; 
          margin-bottom: 20px; 
          border-bottom: 2px solid #000;
          padding-bottom: 10px;
        }
        .store-name { 
          font-size: 24px; 
          font-weight: bold; 
          margin-bottom: 5px;
        }
        .details { 
          margin: 15px 0; 
        }
        .items { 
          margin: 20px 0; 
        }
        .item { 
          display: flex; 
          justify-content: space-between; 
          margin: 5px 0; 
        }
        .total { 
          font-weight: bold; 
          font-size: 18px; 
          border-top: 2px solid #000;
          padding-top: 10px;
          margin-top: 20px;
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          font-size: 12px;
          color: #666;
        }
        @media print {
          body { margin: 0; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="store-name">STORE INVENTORY</div>
        <div>123 Store Street</div>
        <div>City, State 12345</div>
        <div>(123) 456-7890</div>
      </div>
      
      <div class="details">
        <div><strong>Receipt:</strong> ${sale.saleId}</div>
        <div><strong>Date:</strong> ${new Date(sale.createdAt).toLocaleString()}</div>
        <div><strong>Cashier:</strong> ${sale.salesAgent?.name || 'N/A'}</div>
      </div>
      
      <div class="items">
        ${sale.items.map(item => `
          <div class="item">
            <span>${item.product.name} x ${item.quantity}</span>
            <span>${formatCurrency(item.price * item.quantity)}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="item total">
        <span>TOTAL:</span>
        <span>${formatCurrency(sale.totalAmount)}</span>
      </div>
      
      <div class="details">
        <div><strong>Payment Method:</strong> ${sale.paymentMethod?.toUpperCase() || 'CASH'}</div>
      </div>
      
      <div class="footer">
        <div>Thank you for your purchase!</div>
        <div>Please keep this receipt for your records</div>
      </div>
      
      <div style="margin-top: 20px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #4F46E5; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Print Receipt
        </button>
      </div>
    </body>
    </html>
  `;
  
  const receiptWindow = window.open('', '_blank');
  receiptWindow.document.write(receiptHTML);
  receiptWindow.document.close();
};