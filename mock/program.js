const Mock = require('mockjs')

const programs = Mock.mock([{
    id: '001',
    programName: '上海杨浦区棚户区改造15号地',
    finishTime: '2023年10月01日',
    process: '20%',
    coordinates: [116.403748, 39.915055]
  },
  {
    id: '002',
    programName: '上海浦东新区碧波路棚户区改造20号地',
    finishTime: '2024年10月01日',
    process: '10%',
    coordinates: [116.403748, 39.915055]
  },
  {
    id: '003',
    programName: '上海徐汇滨区绿地广场改造38号地',
    finishTime: '2022年12月31日',
    process: '18%',
    coordinates: [116.403748, 39.915055]
  },
  {
    id: '004',
    programName: '上海静安府二期幕墙工程',
    finishTime: '2022年12月31日',
    process: '23%',
    coordinates: [116.403748, 39.915055]
  },
  {
    id: '005',
    programName: '上海青浦电信局管道铺设工程',
    finishTime: '2022年12月31日',
    process: '64%',
    coordinates: [116.403748, 39.915055]
  },
  {
    id: '006',
    programName: '上海长宁区淮海路景观工程',
    finishTime: '2022年12月31日',
    process: '27%',
    coordinates: [116.403748, 39.915055]
  },
  {
    id: '007',
    programName: '宝山钢铁股份有限公司产品结构优化工程',
    finishTime: '2022年12月31日',
    process: '99%',
    coordinates: [116.403748, 39.915055]
  },
  {
    id: '008',
    programName: '上海云峰汽车销售服务公司扩建项目',
    finishTime: '2022年12月31日',
    process: '42%',
    coordinates: [116.403748, 39.915055]
  },
  {
    id: '009',
    programName: '上海舜超市政工程有限公司扩建项目',
    finishTime: '2022年12月31日',
    process: '53%',
    coordinates: [116.403748, 39.915055]
  },
  {
    id: '010',
    programName: '上海达申汽车服务有限公司',
    finishTime: '2022年12月31日',
    process: '60%',
    coordinates: [116.403748, 39.915055]
  }
])

const programDetailInfo = Mock.mock({
  id: '001',
  programName: '上海达申汽车服务有限公司',
  totalCars: 100,
  otherCars: 50,
  tasks: 10,
  otherTasks: 4,
  members: 50,
  otherMembers: 20,
  devices: 20,
  lines: 3
})

const carInfoDatas = Mock.mock([{
  id: '100',
  carName: '1号车辆',
  line: '1号路线',
  status: '运行中',
  operation: '自动'
},{
  id: '200',
  carName: '2号车辆',
  line: '2号路线',
  status: '已停止',
  operation: '人工'
},{
  id: '300',
  carName: '3号车辆',
  line: '3号路线',
  status: '已损坏',
  operation: '人工'
},{
  id: '400',
  carName: '4号车辆',
  line: '1号路线',
  status: '运行中',
  operation: '自动'
}])

const carDetailInfo = Mock.mock({
  id: "100",
  carName: "1号车辆",
  distance: "500公里",
  gas: "20升",
  programs: "5",
  time: "4800小时",
  output: "100%"
})

module.exports = [{
  url: '/backend/program/list',
  type: 'get',
  response: config => {
    return {
      code: 20000,
      data: {
        total: programs.length,
        items: programs
      }
    }
  }
}, {
  url: '/backend/program/detail',
  type: 'get',
  response: config => {
    return {
      code: 20000,
      data: {
        items: programDetailInfo
      }
    }
  }
},{
  url: '/backend/car/list',
  type: 'get',
  response: config => {
    return {
      code: 20000,
      data: {
        items: carInfoDatas
      }
    }
  }
},{
  url: '/backend/car/detail',
  type: 'get',
  response: config => {
    return {
      code: 20000,
      data: {
        items: carDetailInfo
      }
    }
  }
}
]
