/**
 * @description
 */
const createExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('sheet1');
};
/**
 * @description
 * @param {*} worksheet 
 * @returns 
 */
const addHeaderCells = ( worksheet ) => {
    const headerRow = worksheet.addRow([]);
    const headerCells = table.getElementsByTagName('th');
    
    for ( let i = 0; i < headerCells.length; i++ ) {
        headerRow.getCell( idx + 1 ).value = headerCells[i].innerText;
    }

    return worksheet;
};

/**
 * @description
 * @param {*} worksheet 
 * @returns
 */
const addCells = ( worksheet ) => {
    const rows = table.getElementsByTagName('td');
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowData = [];

        for (let j = 0; j < cells.length; j++) {
            rowData.push(cells[j].innerText);
        }

        worksheet.addRow(rowData);
    }
    return worksheet;
};

/**
 * @description
 * @param {*} worksheet 
 * @returns 
 */
const mergeCells = ( worksheet ) => {
    const filter = ['A', 'B', 'C', 'D'];
    const cells = [];

    worksheet.eachRow((row) => {
        row._cells.forEach((cell) => {
            if (cell.value.toString() !== '') cells.push(cell);
        });
    });

    let firstCell = [];
    let endCell = [];
    for (let i = 0; i < cells.length; i++) {
        const value = cells[i].value;
        const [letter] = splitTextString(cells[i].address, /(\d+)/);
        const elements = cells.filter(i => i.value.trim().toUpperCase() === value.trim().toUpperCase() && i.address.includes(letter));
        console.log( cells[i].address, value, elements );
        if (elements.length > 1
            && filter.some(element => elements[0].address.includes(element))
            && filter.some(element => elements[elements.length - 1].address.includes(element))) {
            firstCell.push(elements[0].address);
            endCell.push(elements[elements.length - 1].address);
        }
    }

    const mergeCompletedFirst = [];
    const mergeCompletedLast = [];

    firstCell.forEach((item, index) => {
        const notMergedFirst = validateExistence(mergeCompletedLast, firstCell[index]);
        const notMergedEnd = validateExistence(mergeCompletedLast, endCell[index]);

        if (!mergeCompletedFirst.some(i => firstCell[index] === i) && !mergeCompletedLast.some(i => endCell[index] === i) && notMergedFirst && notMergedEnd) {
            worksheet.mergeCells(`${firstCell[index]}:${endCell[index]}`);
            mergeCompletedFirst.push(firstCell[index]);
            mergeCompletedLast.push(endCell[index]);
        }
    });

    mergeCompletedFirst.forEach(i => worksheet.getCell(i).alignment = { vertical: 'top', horizontal: 'left' });
    return worksheet;
};

/**
 * @description
 * @param {*} worksheet 
 * @returns 
 */
const autoFilter = ( worksheet ) => {
    worksheet.autoFilter = 'A1:M1';
    return worksheet;
};

/**
 * @description
 * @param {*} worksheet 
 * @returns
 */
const autoWidth = ( worksheet ) => {
    let columnSize = [];
    worksheet.eachRow((row) => {
        row._cells.forEach((cell) => {
            if (columnSize.length > 0) {
                const item = columnSize.find(i => cell.address.includes(i.id));
                if (item) {
                    if (item.value < cell.value.length)
                        item.value = cell.value.length + 2;
                    cell._column.width = item.value;
                } else {
                    cell._column.width = cell.value.length;
                    columnSize.push({ id: cell.address[0], value: cell.value.length + 2 });
                }
            }
            else {
                cell._column.width = cell.value.length;
                columnSize.push({ id: cell.address[0], value: cell.value.length + 2 });
            }
        });
    });
    return worksheet;
}

/**
 * @description
 * @param {*} workbook 
 */
const createExcel = ( workbook ) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, `pedidos-embarcar-${date.toLocaleString()}.xlsx`);
    });
};