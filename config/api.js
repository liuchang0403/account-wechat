const baseUrl = 'http://127.0.0.1:8088/api';
import httpUtils from '../utils/httpUtils';

export default class api extends httpUtils {
    // 用户相关

    // 登录
    static login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    let url = `${baseUrl}/user/login`;
                    this.request(url, {code: res.code}).then(res => {
                        resolve(res);
                    }); 
                },
                fail: function (err) {
                    reject(err);
                }
            })
        });
    }                                     

    // 更新用户最后活动时间
    static updateLastActivityDate() {
        return this.request(`${baseUrl}/user/updateLastActivityDate`, {}, 'POST', false);
    }

    // 更新用户信息
    static updateUserInfo(param) {
        return this.request(`${baseUrl}/user/updateInfo`, param, 'POST', false);
    }

    
    /**
     * 获取用户统计数据
     */
    static getUserStatistics() {
        return this.request(`${baseUrl}/user/statistics`,{}, 'GET', false);
    }

    /**
     * 账本详情
     * @param {*} id 账本id
     */
    static getAccountBookDetails(id) {
        return this.request(`${baseUrl}/accountbook/${id}`, {}, 'GET');
    }

    /**
     * 删除账本
     * @param {账本id} id 
     */
    static delBook(id) {
        return this.request(`${baseUrl}/accountbook/${id}`, {}, 'DELETE');
    }

    /**
     * 新增账本
     * @param {账本名称} bookName 
     */
    static addAccountBook(bookName) {
        let param = {
            'name': bookName
        }
        return this.request(`${baseUrl}/accountbook`, param, 'POST');
    }

    /**
     * 更新账本
     * @param {账本id} id 
     * @param {更新参数} param 
     */
    static updateAccountBook(id, param) {
        return this.request(`${baseUrl}/accountbook/${id}`, param, 'PUT');
    }

    static getAllAccountBook(isLoading) {
        return this.request(`${baseUrl}/accountbook/all`, {}, 'GET', isLoading);
    }

    /**
     * 获取记录列表
     * @param  bookId 账本id
     * @param  page 页码
     */
    static getRecordList(bookId, date) {
        let param = {
            "bookId": bookId,
            "date": date
        }
        return this.request(`${baseUrl}/record`, param);
    }

    /**
     * 成员的记账统计
     * @param {账本id} bookId 
     */
    static getMemberRecordStatistics(bookId) {
        return this.request(`${baseUrl}/record/member/${bookId}`, {});
    }

    /**
     * 获取支出分类列表
     */
    static getExpenditureList() {
        return this.request(`${baseUrl}/expenditure/list`);
    }

    /**
     * 获取收入分类列表
     */
    static getIncomeList() {
        return this.request(`${baseUrl}/income/list`);
    }

    /**
     * 获取收支方式
     */
    static getWays() {
        return this.request(`${baseUrl}/way/list`);
    }

    /**
     * 获取指定账本的所有参与者
     * @param {账本id} bookId 
     */
    static getBookParters(bookId) {
        return this.request(`${baseUrl}/accountbook/parter/${bookId}`);
    }

    static record(param) {
        return this.request(`${baseUrl}/record`, param, 'POST');
    }
};