import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- Interfaces ---
export interface Invoice {
  id: string;
  type?: "VPS" | "Server" | "Dedicated" | "Hosting";
  ram: number;
  disk: number;
  cpuModel: string;
  cpuCores: string;
  pricing: number;
  currency?: string;
  paymentDate: string;
  repaymentDate?: string;
  paymentProof?: string;
  createdAt: string;
  serverId?: string;
  backups: string;
  allocation: string;
  networkType?: string;
  os?: string;
  location?: string;
  dedicatedIp?: string;
  ddos?: string;
  support?: string;
  status: string; // Made flexible to handle app's lowercase statuses
  customerDetails?: string;
  customerName?: string;
  customerEmail?: string;
  taxRate?: number;
  paymentDetails?: string; // Flexible multi-line details for each invoice
}

// --- Design System ---
const COLORS = {
  bg: [11, 15, 25] as [number, number, number], // Deep Navy/Black
  cardBg: [17, 24, 39] as [number, number, number], // Slate 900
  cardBorder: [30, 41, 59] as [number, number, number], // Slate 800
  primary: [6, 182, 212] as [number, number, number], // Cyan 500
  accent: [99, 102, 241] as [number, number, number], // Indigo 500
  text: {
    heading: [248, 250, 252] as [number, number, number], // White/Slate 50
    body: [148, 163, 184] as [number, number, number], // Slate 400
    muted: [71, 85, 105] as [number, number, number], // Slate 600
  },
  status: {
    paid: [34, 197, 94] as [number, number, number], // Green
    pending: [234, 179, 8] as [number, number, number], // Yellow
    cancelled: [239, 68, 68] as [number, number, number], // Red
  },
};

// --- Helpers ---

/** Loads an image and returns base64, handling errors gracefully */
async function loadImageDataURL(path: string): Promise<string | null> {
  try {
    const res = await fetch(path, { cache: "force-cache" });
    if (!res.ok) throw new Error(`Failed to load: ${path}`);
    const blob = await res.blob();
    return await new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null); // Don't crash, just return null
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn(`[InvoiceGen] Image load failed: ${path}`);
    return null;
  }
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr || dateStr === "RECURRING") return "RECURRING";
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).toUpperCase();
  } catch {
    return dateStr || "";
  }
}

function formatCurrency(amount: number, currency = "INR"): string {
  // Use plain text to avoid encoding issues with symbols
  return `${currency} ${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// --- Main Generator ---

export async function generateInvoicePDF(invoice: Invoice) {
  // 1. Setup Document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  // Set Metadata
  doc.setProperties({
    title: `Invoice #${invoice.id}`,
    subject: `Service Invoice for ${invoice.customerName || "Customer"}`,
    author: "LumenNodes Technologies",
    creator: "LumenNodes Billing System",
  });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 10;

  // 2. Background (Premium Dark Mode)
  doc.setFillColor(...COLORS.bg);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Subtle Tech Grid Pattern (Optional decoration)
  doc.setDrawColor(...COLORS.cardBorder);
  doc.setLineWidth(0.1);
  for (let i = 0; i < pageHeight; i += 20) {
    doc.line(0, i, pageWidth, i);
  }
  for (let i = 0; i < pageWidth; i += 20) {
    doc.line(i, 0, i, pageHeight);
  }

  // 3. Header Section
  let yPos = 20;

  // Logo
  const logoUrl = await loadImageDataURL("/logo.jpeg"); // Updated to use local logo
  if (logoUrl) {
    // doc.addImage(logoUrl, "JPEG", margin, yPos - 6, 12, 12);
    // doc.setFontSize(22);
    // doc.setFont("helvetica", "bold");
    // doc.setTextColor(...COLORS.text.heading);
    // doc.text("LUMENNODES", margin + 16, yPos + 3);
      // Adjusted logo placement and size
      doc.addImage(logoUrl, "JPEG", margin, yPos - 8, 15, 15);
       doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.text.heading);
    doc.text("LUMENNODES", margin + 20, yPos + 3);
  } else {
    // Text fallback if logo fails
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.primary);
    doc.text("LUMEN", margin, yPos + 3);
    doc.setTextColor(...COLORS.text.heading);
    doc.text("NODES", margin + 29, yPos + 3);
  }

  // Invoice Label & ID (Right Aligned)
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLORS.cardBorder[0], COLORS.cardBorder[1], COLORS.cardBorder[2]); // Subtle watermark style text
  doc.text("INVOICE", pageWidth - margin, yPos + 5, { align: "right" });
  
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.primary);
  doc.text(`#${invoice.id.toUpperCase().slice(-6)}`, pageWidth - margin, yPos + 12, { align: "right" });

  yPos += 30;

  // 4. Info Columns (Company vs Customer)
  const colWidth = (pageWidth - margin * 3) / 2;

  // Left: Company Info
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.text.muted);
  doc.text("FROM", margin, yPos);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.text.heading);
  doc.text("LumenNode Technologies", margin, yPos + 5);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.text.body);
  doc.text("noreply@lumennode.in", margin, yPos + 10);
  doc.text("https://lumennode.in", margin, yPos + 15);

  // Right: Customer Info
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.text.muted);
  doc.text("BILL TO", pageWidth - margin - colWidth, yPos);

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.text.heading);
  doc.text(invoice.customerName || "Valued Customer", pageWidth - margin - colWidth, yPos + 5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.text.body);
  doc.text(invoice.customerEmail || "No Email Provided", pageWidth - margin - colWidth, yPos + 10);
  if (invoice.customerDetails) {
    doc.text(invoice.customerDetails, pageWidth - margin - colWidth, yPos + 15);
  }

  // Header: Dates Block (Pushed lower to avoid overlap with long names/emails)
  const dateX = pageWidth - margin;
  const dateY = yPos + 18; // Increased from yPos
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.text.muted);
  doc.text("Issue Date", dateX - 35, dateY);
  doc.text("Due Date", dateX - 35, dateY + 6);
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.text.heading);
  doc.text(formatDate(invoice.createdAt), dateX, dateY, { align: "right" });
  doc.text(formatDate(invoice.repaymentDate || invoice.paymentDate), dateX, dateY + 6, { align: "right" });

  yPos += 35;

  // 5. Dynamic Table (Using autoTable)
  // We map the flat invoice object into rows for a cleaner look
  const tableData = [
    ["Instance Type", invoice.type || "VPS"],
    ["CPU Configuration", `${invoice.cpuModel || "Standard"} (${invoice.cpuCores || "N/A"} vCores)`],
    ["Memory (RAM)", `${invoice.ram} GB DDR4 ECC`],
    ["Storage", `${invoice.disk} GB NVMe SSD`],
  ];

  // Add Dynamic Specs (Filter by type if needed)
  if (invoice.type === "Server") {
    // tableData.push(["Port Allocation", `${parseInt(invoice.allocation) || 0} Ports`]);
    tableData.push(["Port Allocation", "Standard"]);
  } else {
    tableData.push(["Network Connectivity", invoice.networkType || "1 Gbps"]);
  }

  tableData.push(["Deployment Location", invoice.location || "Global Zone"]);
  tableData.push(["Backup Strategy", invoice.backups === "Unlimited" ? "Unlimited Snapshots" : `${invoice.backups || "Daily"} Snapshots`]);

  // Add OS - Usually for VPS/Hosting
  if (invoice.os && invoice.type !== "Server") {
    tableData.push(["Operating System", invoice.os]);
  }
  
  // Add Support if exists
  if (invoice.support) tableData.push(["Service Support", invoice.support]);

  autoTable(doc, {
    startY: yPos,
    head: [["SERVICE ITEM", "SPECIFICATION"]],
    body: tableData,
    theme: "grid",
    styles: {
      fillColor: COLORS.cardBg,
      textColor: COLORS.text.body,
      lineColor: COLORS.cardBorder,
      lineWidth: 0.1,
      font: "helvetica",
      fontSize: 9,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: COLORS.cardBg,
      textColor: COLORS.primary,
      fontStyle: "bold",
      lineWidth: 0, // No border on header
    },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: "bold", textColor: COLORS.text.heading },
      1: { cellWidth: "auto", halign: "left" },
    },
    margin: { left: margin, right: margin },
    tableWidth: "auto",
  });

  // Calculate position after table
  // @ts-ignore - autoTable adds lastAutoTable to doc
  let finalY = doc.lastAutoTable.finalY + 10;

  // 6. Totals Section
  const totalsWidth = 70; 
  const totalsX = pageWidth - margin - totalsWidth;

  // Check if we need a new page for totals to avoid breaking layout
  if (finalY + 45 > pageHeight - 30) {
    doc.addPage();
    doc.setFillColor(...COLORS.bg);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    finalY = 20;
  }

  // Background for totals
  doc.setFillColor(...COLORS.cardBg);
  doc.roundedRect(totalsX, finalY, totalsWidth, 35, 2, 2, "F");
  doc.setDrawColor(...COLORS.cardBorder);
  doc.roundedRect(totalsX, finalY, totalsWidth, 35, 2, 2, "S");

  const totalAmount = invoice.pricing;

  // Subtotal (Acting as Final Total)
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.text.muted);
  doc.text("Total Amount", totalsX + 5, finalY + 8);
  doc.setTextColor(...COLORS.text.heading);
  doc.text(formatCurrency(invoice.pricing, invoice.currency), pageWidth - margin - 5, finalY + 8, { align: "right" });

  // Divider (Subtle)
  doc.setDrawColor(...COLORS.cardBorder);
  doc.line(totalsX + 5, finalY + 15, pageWidth - margin - 5, finalY + 15);

  // Grand Total (Prominent Cyan)
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.primary);
  doc.text("TOTAL DUE", totalsX + 5, finalY + 25);
  doc.text(formatCurrency(totalAmount, invoice.currency), pageWidth - margin - 5, finalY + 25, { align: "right" });

  // 7. Payment Info (Left side of Totals)
  const paymentY = finalY;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.text.heading);
  doc.text("Payment Instructions", margin, paymentY + 5);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.text.body);
  
  const paymentLines = invoice.paymentDetails 
    ? invoice.paymentDetails.replace("[AUTO-ID]", invoice.id.slice(-6).toUpperCase()).split('\n')
    : ["Bank Transfer / UPI / Card", "LumenNode Technologies PVT LTD", "Ref ID: " + invoice.id.slice(-6).toUpperCase()];
    
  paymentLines.forEach((line, idx) => {
    doc.text(line, margin, paymentY + 12 + (idx * 4));
  });
  
  // 8. Status Watermark (Stamps)
  const stampText = (invoice.status || "PENDING").toUpperCase();
  let stampColor = COLORS.status.pending;
  if (stampText === "PAID" || stampText === "APPROVED" || stampText === "COMPLETED") stampColor = COLORS.status.paid;
  if (stampText === "CANCELLED" || stampText === "REFUNDED" || stampText === "DENIED") stampColor = COLORS.status.cancelled;

  // Only show stamp if not pending? Or always?
  // Let's show it.
  
  doc.saveGraphicsState();
  // @ts-ignore
  doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
  doc.setTextColor(...stampColor);
  doc.setFontSize(50);
  doc.setFont("helvetica", "bold");
  
  // Rotate context for stamp
  const cx = pageWidth / 2;
  const cy = pageHeight / 2 - 20;
  doc.text(stampText, cx, cy, { align: 'center', angle: -25 }); // Changed angle to be less aggressive
  doc.restoreGraphicsState();

  // 9. Footer
  const footerY = pageHeight - 25;
  doc.setDrawColor(...COLORS.cardBorder);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFontSize(8);
  doc.setTextColor(...COLORS.text.muted);
  doc.text("Thank you for choosing LumenNodes.", margin, footerY + 6);
  doc.text("Terms & Conditions apply. Generated by LumenNodes Systems.", margin, footerY + 11);
  
  doc.text(`Page 1 of 1`, pageWidth - margin, footerY + 6, { align: "right" });

  // Tech Signature (Clickable) - Properly positioned in footer
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255); 
  doc.setFont("helvetica", "bold");
  const techText = "Engineered by Utkarsh";
  const textWidth = doc.getTextWidth(techText);
  const textX = (pageWidth - textWidth) / 2;
  const textY = pageHeight - 8;
  
  doc.text(techText, textX, textY);
  // doc.link(textX, textY - 4, textWidth, 6, { url: "https://www.instagram.com/utkarsh_gupta_011?igsh=dG41MWNtaXVybjhr" });

  // 10. Payment Proof Page (If exists)
  if (invoice.paymentProof) {
    doc.addPage();
    doc.setFillColor(...COLORS.bg);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    doc.setFontSize(16);
    doc.setTextColor(...COLORS.text.heading);
    doc.text("Payment Attachment", margin, 30);
    
    try {
        // This is tricky if paymentProof is a URL, need to load it first? 
        // Logic assumes it is already a base64 or accessible URL handled by addImage.
        // For external URLs in browser, addImage might raise CORS if not loaded. 
        // We will wrap in try-catch.
        doc.addImage(invoice.paymentProof, "JPEG", margin, 40, 180, 120);
    } catch(e) {
        doc.text("Could not render attached proof image.", margin, 50);
    }
  }

  // Save
  doc.save(`LumenNodes_${invoice.id}_${new Date().toISOString().split('T')[0]}.pdf`);
}
