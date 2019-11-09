import { Pipe, PipeTransform } from '@angular/core';
import { UfastTableNs } from '@shared/ufast-table/ufast-table.component';


@Pipe({
  name: 'context'
})
export class ContextPipe implements PipeTransform {

  transform(value: any, index: number, tableConfig: UfastTableNs.TableConfig): any {
    value._index = index;
    value._seqNum = (tableConfig.pageNum - 1) * tableConfig.pageSize + index + 1;
    return value;
  }

}
