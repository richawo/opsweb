import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable()
export class CsvService {
  exportAsCsvFile(data: any, fileName: string) {
    const replacer = (_key: any, value: any) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    FileSaver.saveAs(blob, fileName + '.csv');
  }
}
