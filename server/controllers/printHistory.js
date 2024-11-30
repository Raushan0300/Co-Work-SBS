module.exports = function generateHtml(data) {
  return `
  <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Print History</title>
        <style>
            body{
                font-family: Arial, sans-serif;
            }
            table{
                width: 100%;
                border-collapse: collapse;
            }
            th, td{
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
            }
            th{
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <h1>Booking History</h1>
        <table>
            <thead>
                <tr>
                    <th>Room Name</th>
                    <th>Room Type</th>
                    <th>Room Price</th>
                    <th>Room Location</th>
                    <th>Check In Date</th>
                    <th>Check Out Date</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>${data.bookedRoom.roomName}</td>
                        <td>${data.bookedRoom.roomType}</td>
                        <td>${data.bookedRoom.roomPrice}</td>
                        <td>${data.bookedRoom.roomLocation}</td>
                        <td>${data.checkInDate}</td>
                        <td>${data.checkOutDate}</td>
                        <td>$ ${data.totalAmount}</td>
                    </tr>
            </tbody>
        </table>
    </body>
    </html>`
};
