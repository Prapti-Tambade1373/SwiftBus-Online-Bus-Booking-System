package com.Bus.controller;

import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import com.Bus.Model.BusBooking;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

public class PDFGeneratorBus {

    public static void generateInvoice(HttpServletResponse response, BusBooking booking) throws IOException {
        Document document = new Document();
        try {
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();

            Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Bus Booking Invoice", font);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph("Booking ID: " + booking.getId()));
            document.add(new Paragraph("Customer Name: " + booking.getCustomer().getName())); 
            document.add(new Paragraph("Bus Number: " + booking.getBus().getBusNumber())); 
            document.add(new Paragraph("Travel Date: " + booking.getTravelDate()));
            document.add(new Paragraph("Status: " + booking.getStatus()));
            document.add(new Paragraph("Total Amount: ₹" + booking.getTotalAmount()));

        } catch (DocumentException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }
    }
}
