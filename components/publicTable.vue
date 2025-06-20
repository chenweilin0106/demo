<template>
  <table v-once class="publicTable">
    <thead class="tableHead">
      <tr class="tableTr">
        <th v-for="(head,headIndex) in headData" :key="headIndex"  class="tableCell tableTh" :class="[`head-${headIndex}`,`${border}-border`]">
          <slot name="th" :th="{head,headIndex}">
            <div class="cell">{{head.text}}</div>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody class="tableBody">
      <tr v-for="(row,rowIndex) in showTableData" :key="rowIndex" class="tableTr" :class="[stripe&&rowIndex%2!=0&&'stripeBgc',`tableTr-${rowIndex}`]">
        <template v-for="(cell,columnIndex) in row.cells">
          <td v-if="cell.show" v-bind="cell" :key="columnIndex" class="tableCell tableTd" :class="[`tableTd-row-${rowIndex}`,`tableTd-column-${columnIndex}`,`${border}-border`,deepColIndex.includes(columnIndex)&&'tableTd-column-deep']">
            <slot name="td" :rowIndex="rowIndex" :columnIndex="columnIndex" :row="row.original" :column="cell.column">
              <div class="cell">{{cell.value}}</div>
            </slot>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
// <PublicTable class="table" :headData="tableHead" :tableData="tableData" stripe border="col" :deepColIndex="[1]" :cellMethod="cellMethod" />
// cellMethod({ rowIndex, columnIndex }) {
  // if (rowIndex == 0 && columnIndex == 0) {
  //   return { rowspan: 3, colspan: 1 } // 第一列 1，2，3行合并
  // } else if (rowIndex <= 2 && rowIndex >= 1 && columnIndex == 0) {
  //   return {} // 第一列 2，3不显示
  // } else {
  //   return { rowspan: 1, colspan: 1 } // 其他列
  // }
// }
// table1Head: Object.freeze([
//   { text: '倍数', prop: 'double' },
//   { text: '概率', prop: 'percent' },
//   { text: '可得\n绿晶石', prop: 'num' },
//   { text: '可得\n紫晶石', prop: 'num2' }
// ]),
// table1Data: Object.freeze([
//   { double: '1', percent: '11%', num: '40', num2: '100' },
//   { double: '2', percent: '15%', num: '100', num2: '200' },
//   { double: '3', percent: '20%', num: '200', num2: '400' },
//   { double: '4', percent: '25%', num: '300', num2: '600' },
//   { double: '5', percent: '30%', num: '400', num2: '800' },
//   { double: '6', percent: '35%', num: '700', num2: '1200' },
//   { double: '7', percent: '40%', num: '1500', num2: '2400' },
//   { double: '8', percent: '45%', num: '3000', num2: '4800' },
//   { double: '9', percent: '50%', num: '6000', num2: '9600' },
//   { double: '10', percent: '55%', num: '9000', num2: '14400' },
//   { double: '11', percent: '60%', num: '18000', num2: '28800' }
// ]),
// 样式版本
// <table class="publicTable">
//   <thead class="tableHead">
//     <tr class="tableTr">
//       <th class="tableCell tableTh">倍数</th>
//       <th class="tableCell tableTh">概率</th>
//       <th class="tableCell tableTh">可得绿晶石<br>可得绿晶石</th>
//     </tr>
//   </thead>
//   <tbody class="tableBody">
//     <tr class="tableTr">
//       <td class="tableCell tableTd">2</td>
//       <td class="tableCell tableTd borderRight borderLeft">39.9%</td>
//       <td class="tableCell tableTd deep">40</td>
//     </tr>
//     <tr class="tableTr stripe">
//       <td class="tableCell tableTd">3</td>
//       <td class="tableCell tableTd borderRight borderLeft">25%</td>
//       <td class="tableCell tableTd deep">60</td>
//     </tr>
//     <tr class="tableTr">
//       <td class="tableCell tableTd">4</td>
//       <td class="tableCell tableTd borderRight borderLeft">15%</td>
//       <td class="tableCell tableTd deep">80</td>
//     </tr>
//     <tr class="tableTr stripe">
//       <td class="tableCell tableTd">5</td>
//       <td class="tableCell tableTd borderRight borderLeft">10%</td>
//       <td class="tableCell tableTd deep">100</td>
//     </tr>
//   </tbody>
// </table>
// .publicTable {
//   width: 90%;
//   border-collapse: separate;
//   border-radius: 23px;
//   border: 3px solid transparent;
//   background-color: #faf9fc;
//   overflow: hidden;
//   margin: 0 auto;
//   white-space: wrap;
//   text-align: center;
//   line-height: 1;
//   .tableCell {
//     padding: 20px 0;
//   }
//   .borderTop{
//     border-top: 3px solid #e3dfff;
//   }
//   .borderRight{
//     border-right: 3px solid #e3dfff;
//   }
//   .borderBottom{
//     border-bottom: 3px solid #e3dfff;
//   }
//   .borderLeft{
//     border-left: 3px solid #e3dfff;
//   }
//   .tableTr{
//     background-color: #ffffff;
//     .deep{
//       color: #fff;
//       background-color: #8969e5 ;
//     }
//   }
//   .tableHead {
//     color: #fff;
//     font-size: 26px;
//     .tableTr {
//       background-color: #5f42a9;
//     }
//   }
//   .tableBody {
//     color: #764ede;
//     font-size: 26px;
//   }
//   .stripe {
//     background-color: #e7e3ff;
//     .deep{
//       background-color: #674ab5;
//     }
//   }
// }
export default {
  name: 'publicTable',
  props: {
    deepColIndex: { type: Array, default: () => [] }, // 深色列索引
    border: { type: String, default: 'all' }, // 边框类型 all: 所有边框 col: 列边框 row: 行边框 none: 无边框
    cellMethod: { type: Function, default: () => ({ rowspan: 1, colspan: 1 }) }, // 合并单元格
    headData: { type: Array, default: () => [] }, // 表头数据
    tableData: { type: Array, default: () => [] }, // 表格数据
    stripe: { type: Boolean, default: false } // 斑马纹
  },
  data() {
    return {
      showTableData: Object.freeze([])
    }
  },
  created() {
    const result = []
    this.tableData.forEach((row, rowIndex) => {
      const rowData = { original: row, cells: [] }
      this.headData.forEach((column, columnIndex) => {
        const cellProps = this.cellMethod({ row, rowIndex, column, columnIndex })
        rowData.cells.push({ ...cellProps, show: !!(cellProps?.rowspan && cellProps?.colspan), value: row[column.prop], column })
      })
      result.push(rowData)
    })
    this.showTableData = Object.freeze(result)
  }
}
</script>

<style lang="scss" scoped>
$borderWidth: 3px; // 内边框宽度
$borderColor: #DCDDE5; // 内边框颜色
$outBorderWidth: 2px; // 外边框宽度
$outBorderColor: #DCDDE5; // 外边框颜色
$radius: 18px; // 圆角
.publicTable {
  width: 90%;
  border-collapse: separate;
  border-radius: $radius + $outBorderWidth;
  border: $outBorderWidth solid transparent;
  background-color: $borderColor;
  overflow: hidden;
  margin: 0 auto;
  white-space: pre-wrap;
  text-align: center;
  line-height: 1;
  .tableCell {
    &.all-border{
      border-top: $borderWidth solid $borderColor;
      border-right: $borderWidth solid $borderColor;
    }
    &.col-border{
      border-right: $borderWidth solid $borderColor;
    }
    &.row-border{
      border-top: $borderWidth solid $borderColor;
    }
    .cell {
      padding: 20px 0;
    }
    &:last-child {
      border-right: none;
    }
    &.noneBorder{
      border: none;
    }
  }
  .tableTr{
    background-color: #fff;
    .tableTd-column-deep{
      color: #fff;
      background-color: #8F8AFF ;
    }
  }
  .tableHead {
    color: #FFFFFF;
    font-size: 28px;
    font-weight: 500;
    .tableTr {
      background-color: #6F6AE1;
      .tableCell{
        border-top: none;
      }
    }
  }
  .tableBody {
    color: #876AFF;
    font-size: 24px;
  }
  .stripeBgc {
    background-color: #E5E4FF;
    .tableTd-column-deep{
      background-color: #6F6AE1;
    }
  }
}
</style>
