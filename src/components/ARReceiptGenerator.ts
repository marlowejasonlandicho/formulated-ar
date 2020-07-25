import jsPDF from 'jspdf';

export default class ARReceiptGenerator {

    generatePDF(pdfData) {
        Date.prototype.toShortFormat = function () {
            let monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            let day = this.getDate();
            let monthIndex = this.getMonth();
            let monthName = monthNames[monthIndex];
            let year = this.getFullYear();
            return `${monthName} ${day}, ${year}`;
        };

        const doc = new jsPDF("p", "mm", "a4");
        console.log(JSON.stringify(doc.getFontList()));

        let padding = 0;

        // for(const pdfInput of pdfData){
        for (let i = 0; i < pdfData.length; i++) {
            let pdfInput = pdfData[i];

            doc.addImage("data:image/png;base64,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", 
            "PNG", 16, 16 + padding);
            doc.setFontSize(12);
            doc.setFontStyle("bold");
            doc.text("IBA BOTANICALS INC.", 60, 24 + padding);
            
            doc.setFontSize(10);
            doc.setFontStyle("bold");
            doc.setTextColor(128, 0, 128);
            doc.text("ACKNOWLEDGMENT RECEIPT", 129, 26.5 + padding);

            doc.setTextColor("black");

            doc.setFont("times");
            doc.setFontSize(11);
            doc.setFontStyle("bold");
            doc.text("Payee Name:", 17, 40 + padding);
            const today = new Date();
            doc.text("Date: ", 118, 40 + padding);
            doc.setFont("helvetica");
            doc.setFontStyle("normal");
            doc.text(pdfInput.name.toString(), 45, 40 + padding);
            doc.text(today.toShortFormat(), 160, 40 + padding);

            doc.setFont("courier");
            doc.setFontSize(10);
            doc.setFontStyle("bold");
            doc.text("P A R T I C U L A R S (Pls provide breakdown)", 17, 48 + padding);
            doc.text("C. Ctr.", 120, 48 + padding);
            doc.text("A M O U N T S", 163, 48 + padding);

            doc.setFont("helvetica");
            doc.setFontSize(11);
            doc.setFontStyle("normal");
            doc.text(pdfInput.totalNoOfDays.toString() +  " day/s", 50, 60 + padding);
            doc.text(pdfInput.rate.toString(), 80, 60 + padding);
            // doc.setFont("calibri");
            doc.setFontSize(11);
            doc.text((pdfInput.totalNoOfDays * pdfInput.rate).toString(), 173, 60 + padding);

            // doc.setFont("Arial");
            doc.setFontSize(10);
            doc.text(pdfInput.activity, 17, 65 + padding);

            if(pdfInput.remarks.length > 16){
                doc.text(pdfInput.remarks.slice(0, 16), 80, 65 + padding);
                doc.text(pdfInput.remarks.slice(15), 80, 70 + padding);
            }else{
                doc.text(pdfInput.remarks, 80, 65 + padding);
            }

            doc.text(pdfInput.area, 17, 70 + padding);

            doc.setFont("times");
            doc.setFontSize(9);
            doc.setFontStyle("normal");
            doc.text("Amount in Words:", 17, 76 + padding);
            doc.text("Signature", 120, 76 + padding);

            doc.setFont("helvetica");
            doc.setFontSize(11);
            doc.text("PHP", 160, 76 + padding);

            doc.setFontStyle("bold");
            doc.text((pdfInput.totalNoOfDays * pdfInput.rate).toString(), 173, 76 + padding);

            // doc.setFont("Arial");
            doc.setFontSize(10);
            doc.setFontStyle("normal");
            doc.text("Three Hundred Seventy Thousand Pesos only", 17, 81 + padding);

            // doc.setFont("Calibri");
            doc.setFontSize(9);
            doc.setFontStyle("bold");
            doc.text(pdfInput.cano, 173, 90 + padding);

            doc.setLineWidth(0.5);
            //Big rect
            doc.rect(15, 15 + padding, 180, 70);
            //AR Text Rect
            doc.rect(118, 20 + padding, 77, 10);

            //Name horizontal line
            doc.line(45, 41 + padding, 100, 41 + padding);
            //Date horizontal line
            doc.line(158, 41 + padding, 195, 41 + padding);

            //1st horiontal line within rect
            doc.line(15, 44 + padding, 195, 44 + padding);
            //2nd horiontal line within rect
            doc.line(15, 49.5 + padding, 195, 49.5 + padding);
            //3rd horiontal line within rect
            doc.line(15, 72 + padding, 195, 72 + padding);

            //1st Vertical line within rect
            doc.line(118, 44 + padding, 118, 85 + padding);
            //2nd Vertical line within rect
            doc.line(158, 44 + padding, 158, 85 + padding);
            //3rd Vertical line within rect
            doc.line(170, 49 + padding, 170, 85 + padding);

            if((i + 1) % 3 === 0){
                if((i + 1) != pdfData.length){
                    doc.addPage("a4", "p");
                }
                padding = 0;
            }
            else{
                //Dashed line
                doc.setLineWidth(0.1);
                doc.setLineDash([2.5]);
                doc.line(1, 99.5 + padding, 209, 99.5 + padding);
                doc.setLineWidth(0.5);
                doc.setLineDash([]);
                //Add padding
                padding += 99;
            }

        }


        


        // //2nd Big rect
        // doc.rect(15, 114, 180, 70);
        // //3rd Big rect
        // doc.rect(15, 213, 180, 70);




        //2nd dash
        // doc.line(5, 198.5, 205, 198.5);


        //End
        doc.save('AR-' + Date.now() + '.pdf')
    }
}