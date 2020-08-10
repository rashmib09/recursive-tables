import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor() {}

  response = {
    OWNERS: 'Recursive Table',
    DETAILS: {
      CO_OWNERS: [],
      COMPANY: 'company',
      Arr1: [
        {
          EMPLOYEE: 'emp1',
          ID: '1',
        },
        {
          EMPLOYEE: 'emp2',
          ID: '2',
        },
      ],
      Arr2: [
        {
          EMPLOYEE: 'emp1',
          ID: '1',
        },
        {
          EMPLOYEE: 'emp2',
          ID: '2',
        },
      ],
    },
  };

  data: any;

  /**
   * on init
   */
  ngOnInit() {
    this.data = this.getTableData(this.response);
  }

  /**
   * Gets recursive table data
   * @param data
   * @returns  generated html
   */
  getTableData(data: any) {
    if (data) {
      let rows: Array<any> = [];
      let cellValue: any;
      let head: any;
      let header = [];
      if (typeof data == 'object' && Array.isArray(data) == true) {
        if (data.length > 0) {
          header.push(
            '<tr><th colspan="2" class ="Array">Array(' +
              data.length +
              ')</th></tr><tr><th>index</th><th>value</th></tr>'
          );
        } else {
          header.push(
            '<tr><th class ="Array">Array(0)</th></tr><tr><td>[empty]</td></tr>'
          );
        }
      } else if (Array.isArray(data) != true) {
        if (_.isEmpty(data) == false) {
          header.push(
            '<tr><th colspan="2" class ="Object">Object</th></tr><tr><th>key</th><th>value</th></tr>'
          );
        } else {
          header.push(
            '<tr><th class ="Object">Object</th></tr><tr><td>{}</td></tr>'
          );
        }
      }
      if (typeof data == 'object') {
        rows = [];
        for (let [index, value] of Object.entries(data)) {
          head = this.checkDataType(value);
          if (typeof value == 'object' || Array.isArray(value) == true) {
            cellValue = this.getTableData(value);
          } else {
            cellValue = '"' + value + '"';
          }
          rows.push(
            "<tr class='Column' ><td class='Column'>" +
              index +
              '</td> <td>' +
              cellValue +
              '</td>  </tr>'
          );
        }
      }
      let rows_data = rows.join(' ');
      return '<table  class="Column" >' + header + rows_data + '</table>';
    }
  }

  /**
   * Checks data type
   * @param data
   * @returns
   */
  checkDataType(data) {
    let parse_data = data;
    let type;
    if (typeof parse_data == 'object') {
      if (Array.isArray(parse_data)) {
        type = 'array';
      } else {
        type = 'object';
      }
    } else {
      type = typeof parse_data;
    }
    return type;
  }
}
