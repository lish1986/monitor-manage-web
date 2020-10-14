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
  getProgramDetail: (id) => {
    const params = {
      id,
    }
    return request({
      url: '/backend/program/detail',
      method: 'get',
      params: params
    })
  }
}
