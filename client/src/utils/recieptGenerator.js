// import jsPDF from 'jspdf';
// import { formatCurrency } from './currencyFormatter';

import { formatCurrency } from "./currencyFormatter";

// export const generateReceiptPDF = (sale) => { 
//   const doc = new jsPDF();
  
//   // Set margins and initial positions
//   const margin = 20;
//   let yPosition = margin;
  
//   // Add company header
//   doc.setFontSize(20);
//   doc.setFont(undefined, 'bold');
//   doc.text('STORE INVENTORY', 105, yPosition, { align: 'center' });
//   yPosition += 10;
  
//   // Store info
//   doc.setFontSize(10);
//   doc.setFont(undefined, 'normal');
//   doc.text('123 Store Street', 105, yPosition, { align: 'center' });
//   yPosition += 5;
//   doc.text('City, State 12345', 105, yPosition, { align: 'center' });
//   yPosition += 5;
//   doc.text('Phone: (123) 456-7890', 105, yPosition, { align: 'center' });
//   yPosition += 15;
  
//   // Sale details
//   doc.setFontSize(12);
//   doc.text(`Receipt: ${sale.saleId || 'N/A'}`, margin, yPosition);
//   yPosition += 8;
//   doc.text(`Date: ${new Date(sale.createdAt).toLocaleString()}`, margin, yPosition);
//   yPosition += 8;
  
//   // Safely get sales agent name
//   const salesAgentName = sale.salesAgent?.name || sale.salesAgent?.username || 'System';
//   doc.text(`Cashier: ${salesAgentName}`, margin, yPosition);
//   yPosition += 15;
  
//   // Line separator
//   doc.line(margin, yPosition, 190, yPosition);
//   yPosition += 10;
  
//   // Items header
//   doc.setFontSize(10);
//   doc.setFont(undefined, 'bold');
//   doc.text('ITEM', margin, yPosition);
//   doc.text('QTY', 100, yPosition);
//   doc.text('PRICE', 130, yPosition);
//   doc.text('TOTAL', 180, yPosition, { align: 'right' });
//   yPosition += 5;
  
//   // Header underline
//   doc.line(margin, yPosition, 190, yPosition);
//   yPosition += 10;
  
//   // Items
//   doc.setFont(undefined, 'normal');
//   sale.items.forEach((item) => {
//     // Check if we need a new page
//     if (yPosition > 250) {
//       doc.addPage();
//       yPosition = margin;
//     }
    
//     // Item name (truncate if too long)
//     const itemName = item.name || item.product?.name || 'Unknown Product';
//     const displayName = itemName.length > 35 
//       ? itemName.substring(0, 35) + '...' 
//       : itemName;
    
//     doc.text(displayName, margin, yPosition);
//     doc.text(item.quantity.toString(), 100, yPosition);
//     doc.text(formatCurrency(item.price), 130, yPosition);
//     doc.text(formatCurrency(item.price * item.quantity), 180, yPosition, { align: 'right' });
    
//     yPosition += 8;
//   });
  
//   // Line separator before total
//   yPosition += 5;
//   doc.line(margin, yPosition, 190, yPosition);
//   yPosition += 10;
  
//   // Total
//   doc.setFontSize(14);
//   doc.setFont(undefined, 'bold');
//   doc.text('TOTAL:', margin, yPosition);
//   doc.text(formatCurrency(sale.totalAmount), 180, yPosition, { align: 'right' });
  
//   // Payment method
//   yPosition += 10;
//   doc.setFontSize(10);
//   doc.setFont(undefined, 'normal');
//   doc.text(`Payment Method: ${(sale.paymentMethod || 'cash').toUpperCase()}`, margin, yPosition);
  
//   // Footer
//   yPosition += 20;
//   doc.setFontSize(8);
//   doc.text('Thank you for your purchase!', 105, yPosition, { align: 'center' });
//   doc.text('Please keep this receipt for your records', 105, yPosition + 5, { align: 'center' });
  
//   // Save the PDF
//   const fileName = `receipt-${sale.saleId || Date.now()}.pdf`;
//   doc.save(fileName);
// };

// // Improved HTML receipt for quick printing
// export const generateHTMLReceipt = (sale) => {
//   // Safely get sales agent name
//   const salesAgentName = sale.salesAgent?.name || sale.salesAgent?.username || 'System';
  
//   const receiptHTML = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Receipt - ${sale.saleId || 'N/A'}</title>
//       <style>
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }
//         body { 
//           font-family: 'Courier New', monospace; 
//           margin: 0;
//           padding: 20px;
//           max-width: 400px;
//           background: white;
//         }
//         .receipt-container {
//           border: 1px solid #ddd;
//           padding: 20px;
//           margin: 0 auto;
//         }
//         .header { 
//           text-align: center; 
//           margin-bottom: 20px; 
//           padding-bottom: 10px;
//           border-bottom: 1px dashed #333;
//         }
//         .store-name { 
//           font-size: 24px; 
//           font-weight: bold; 
//           margin-bottom: 5px;
//           text-transform: uppercase;
//         }
//         .store-address {
//           font-size: 12px;
//           line-height: 1.4;
//         }
//         .details { 
//           margin: 15px 0; 
//           font-size: 14px;
//           line-height: 1.6;
//         }
//         .detail-row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 4px;
//         }
//         .items { 
//           margin: 20px 0; 
//           border-top: 1px dashed #333;
//           border-bottom: 1px dashed #333;
//           padding: 10px 0;
//         }
//         .item-header, .item-row {
//           display: flex;
//           justify-content: space-between;
//           margin: 8px 0;
//           font-size: 14px;
//         }
//         .item-header {
//           font-weight: bold;
//           border-bottom: 1px solid #333;
//           padding-bottom: 5px;
//         }
//         .item-name {
//           flex: 2;
//           text-align: left;
//         }
//         .item-qty {
//           flex: 1;
//           text-align: center;
//         }
//         .item-price {
//           flex: 1;
//           text-align: right;
//         }
//         .item-total {
//           flex: 1;
//           text-align: right;
//         }
//         .total-section { 
//           font-weight: bold; 
//           font-size: 16px; 
//           border-top: 2px solid #333;
//           padding-top: 10px;
//           margin-top: 20px;
//         }
//         .total-row {
//           display: flex;
//           justify-content: space-between;
//         }
//         .footer { 
//           text-align: center; 
//           margin-top: 30px; 
//           font-size: 12px;
//           color: #666;
//           line-height: 1.6;
//         }
//         .separator {
//           border-top: 1px dashed #333;
//           margin: 10px 0;
//         }
//         @media print {
//           body { 
//             margin: 0;
//             padding: 10px;
//           }
//           .receipt-container {
//             border: none;
//             padding: 0;
//           }
//           .no-print { 
//             display: none !important; 
//           }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="receipt-container">
//         <div class="header">
//           <div class="store-name">STORE INVENTORY</div>
//           <div class="store-address">
//             123 Store Street<br>
//             City, State 12345<br>
//             (123) 456-7890
//           </div>
//         </div>
        
//         <div class="details">
//           <div class="detail-row">
//             <span><strong>Receipt:</strong></span>
//             <span>${sale.saleId || 'N/A'}</span>
//           </div>
//           <div class="detail-row">
//             <span><strong>Date:</strong></span>
//             <span>${new Date(sale.createdAt).toLocaleString()}</span>
//           </div>
//           <div class="detail-row">
//             <span><strong>Cashier:</strong></span>
//             <span>${salesAgentName}</span>
//           </div>
//         </div>
        
//         <div class="separator"></div>
        
//         <div class="items">
//           <div class="item-header">
//             <div class="item-name">ITEM</div>
//             <div class="item-qty">QTY</div>
//             <div class="item-price">PRICE</div>
//             <div class="item-total">TOTAL</div>
//           </div>
          
//           ${sale.items.map(item => {
//             const itemName = item.name || item.product?.name || 'Unknown Product';
//             return `
//               <div class="item-row">
//                 <div class="item-name">${itemName}</div>
//                 <div class="item-qty">${item.quantity}</div>
//                 <div class="item-price">${formatCurrency(item.price)}</div>
//                 <div class="item-total">${formatCurrency(item.price * item.quantity)}</div>
//               </div>
//             `;
//           }).join('')}
//         </div>
        
//         <div class="separator"></div>
        
//         <div class="total-section">
//           <div class="total-row">
//             <span>TOTAL:</span>
//             <span>${formatCurrency(sale.totalAmount)}</span>
//           </div>
//         </div>
        
//         <div class="details">
//           <div class="detail-row">
//             <span><strong>Payment Method:</strong></span>
//             <span>${(sale.paymentMethod || 'cash').toUpperCase()}</span>
//           </div>
//         </div>
        
//         <div class="footer">
//           <div>Thank you for your purchase!</div>
//           <div>Please keep this receipt for your records</div>
//         </div>
//       </div>
      
//       <div class="no-print" style="margin-top: 20px; text-align: center;">
//         <button onclick="window.print()" style="padding: 10px 20px; background: #4F46E5; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
//           Print Receipt
//         </button>
//         <button onclick="window.close()" style="padding: 10px 20px; background: #6B7280; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-left: 10px;">
//           Close
//         </button>
//       </div>
//     </body>
//     </html>
//   `;
  
//   const receiptWindow = window.open('', '_blank', 'width=500,height=700');
//   receiptWindow.document.write(receiptHTML);
//   receiptWindow.document.close();
// };


// Improved HTML receipt for thermal printers
export const generateHTMLReceipt = (sale) => {
  // Safely get sales agent name
  const salesAgentName = sale.salesAgent?.name || sale.salesAgent?.username || 'System';
  
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt - ${sale.saleId || 'N/A'}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body { 
          font-family: 'Courier New', monospace; 
          margin: 0;
          padding: 5px;
          width: 80mm; /* Standard receipt printer width */
          max-width: 80mm;
          background: white;
          font-size: 12px;
          line-height: 1.2;
        }
        .receipt-container {
          width: 100%;
          padding: 5px;
        }
        .header { 
          text-align: center; 
          margin-bottom: 10px; 
          padding-bottom: 5px;
          border-bottom: 1px dashed #000;
        }
        .store-name { 
          font-size: 16px; 
          font-weight: bold; 
          margin-bottom: 3px;
          text-transform: uppercase;
        }
        .store-address {
          font-size: 10px;
          line-height: 1.2;
        }
        .details { 
          margin: 8px 0; 
          font-size: 11px;
          line-height: 1.3;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        .items { 
          margin: 10px 0; 
          border-top: 1px dashed #000;
          border-bottom: 1px dashed #000;
          padding: 5px 0;
        }
        .item-header, .item-row {
          display: flex;
          justify-content: space-between;
          margin: 4px 0;
          font-size: 11px;
        }
        .item-header {
          font-weight: bold;
          border-bottom: 1px solid #000;
          padding-bottom: 3px;
        }
        .item-name {
          flex: 2;
          text-align: left;
        }
        .item-qty {
          flex: 1;
          text-align: center;
        }
        .item-price {
          flex: 1;
          text-align: right;
        }
        .item-total {
          flex: 1;
          text-align: right;
        }
        .total-section { 
          font-weight: bold; 
          font-size: 13px; 
          border-top: 2px solid #000;
          padding-top: 8px;
          margin-top: 10px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
        }
        .footer { 
          text-align: center; 
          margin-top: 15px; 
          font-size: 10px;
          color: #666;
          line-height: 1.3;
        }
        .separator {
          border-top: 1px dashed #000;
          margin: 5px 0;
        }
        @media print {
          body { 
            margin: 0;
            padding: 0;
            width: 80mm !important;
          }
          .receipt-container {
            border: none;
            padding: 0;
          }
          .no-print { 
            display: none !important; 
          }
          /* Thermal printer optimization */
          * {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <div class="header">
          <div class="store-name">STORE INVENTORY</div>
          <div class="store-address">
            123 Store Street<br>
            City, State 12345<br>
            (123) 456-7890
          </div>
        </div>
        
        <div class="details">
          <div class="detail-row">
            <span><strong>Receipt:</strong></span>
            <span>${sale.saleId || 'N/A'}</span>
          </div>
          <div class="detail-row">
            <span><strong>Date:</strong></span>
            <span>${new Date(sale.createdAt).toLocaleString()}</span>
          </div>
          <div class="detail-row">
            <span><strong>Cashier:</strong></span>
            <span>${salesAgentName}</span>
          </div>
        </div>
        
        <div class="separator"></div>
        
        <div class="items">
          <div class="item-header">
            <div class="item-name">ITEM</div>
            <div class="item-qty">QTY</div>
            <div class="item-price">PRICE</div>
            <div class="item-total">TOTAL</div>
          </div>
          
          ${sale.items.map(item => {
            const itemName = item.name || item.product?.name || 'Unknown Product';
            // Truncate long product names for receipt
            const displayName = itemName.length > 20 ? itemName.substring(0, 20) + '...' : itemName;
            return `
              <div class="item-row">
                <div class="item-name">${displayName}</div>
                <div class="item-qty">${item.quantity}</div>
                <div class="item-price">${formatCurrency(item.price)}</div>
                <div class="item-total">${formatCurrency(item.price * item.quantity)}</div>
              </div>
            `;
          }).join('')}
        </div>
        
        <div class="separator"></div>
        
        <div class="total-section">
          <div class="total-row">
            <span>TOTAL:</span>
            <span>${formatCurrency(sale.totalAmount)}</span>
          </div>
        </div>
        
        <div class="details">
          <div class="detail-row">
            <span><strong>Payment Method:</strong></span>
            <span>${(sale.paymentMethod || 'cash').toUpperCase()}</span>
          </div>
        </div>
        
        <div class="footer">
          <div>Thank you for your purchase!</div>
          <div>Please keep this receipt for your records</div>
        </div>
      </div>
      
      <div class="no-print" style="margin-top: 10px; text-align: center;">
        <button onclick="window.print()" style="padding: 8px 16px; background: #4F46E5; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;">
          Print Receipt
        </button>
        <button onclick="window.close()" style="padding: 8px 16px; background: #6B7280; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; margin-left: 8px;">
          Close
        </button>
      </div>
    </body>
    </html>
  `;
  
  const receiptWindow = window.open('', '_blank', 'width=320,height=480'); // Smaller window for receipt preview
  receiptWindow.document.write(receiptHTML);
  receiptWindow.document.close();
};