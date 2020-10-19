import request from '@/utils/request'

export default {
  /**
   * 查询在施工作业列表
   */
  getProgramList: (id) => {
    const params = {
      id,
    }
    return request({
      url: '/backend/program/list',
      method: 'get',
      params: params
    })
  },
  /**
   * 查询单个在施工作业详情
   */
  getProgramDetails: (id) => {
    const params = {
      id,
    }
    return request({
      url: '/backend/program/detail',
      method: 'get',
      params: params
    })
  },
  /**
   * 查询车辆列表信息
   */
  getCarInfoList: () => {
    const params = {
    }
    return request({
      url: '/backend/car/list',
      method: 'get',
      params: params
    })
  },
  getCarDetails: (id) => {
    const params = {
      id,
    }
    return request({
      url: '/backend/car/detail',
      method: 'get',
      params: params
    })
  }
}
