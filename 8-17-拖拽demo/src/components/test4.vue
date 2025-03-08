<template>
    <!-- Excel导出案例 -->
    <div>
        <button @click="exportData">导出数据</button>
    </div>
</template>
  
<script>
import * as XLSX from 'xlsx'

export default {
    data() {
        return {
            tableData: [
                { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' },
                { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' },
                { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' }, { name: '张三', age: 18, gender: '男', income: 300, job: '实习' },
                { name: '李四', age: 20, gender: '女', income: 400, job: '职工' },
                { name: '王五', age: 22, gender: '男', income: 500, job: '主管' },
            ]
        }
    },
    methods: {
        exportData() {
            const headers = ['性别', '收入', '职位', '姓名', '年龄']
            const data = this.tableData.map(item => [item.gender, item.income, item.job, item.name, item.age])
            // console.log(data)
            // console.log(XLSX);
            const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data])
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
            XLSX.writeFile(workbook, 'data.xlsx')
        }
    }
}
</script>
  