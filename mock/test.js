const mockJS = require('mockjs');

//使用 mock 參數以配置模板的方式 去建立大量數據庫
const echartData = mockJS.mock({
  //在這個名為data的數組中，生成100個物件(根據你定義的模板長怎樣)
  'options|10': [
    {
      name: '@cname', //@是佔位符 會根據後者而自動生成中文名
      time: '@time',
      date: '@date',
      'id|+1': 1, //在重複創建資料時每一筆資料的id屬性會向上+1，從1開始
    },
  ],
});

const jwt = require('jsonwebtoken');
const SECRET = 'thisismysecrectkey';

function verifyToken(headers) {
  if (headers.authorization) {
    let token = headers.authorization.replace('Bearer ', '');
    return jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return { code: 10001, message: 'Token 已過期，請重新登入' };
        } else if (err.name === 'JsonWebTokenError') {
          return { code: 10002, message: '無效 Token，請重新登入' };
        }
      } else {
        console.log(payload);
        return { code: 200, message: '已登入' };
      }
    });
  } else {
    return { code: 10003, message: '尚未登入' };
  }
}

const loginList = [
  {
    id: 0,
    account: 'Admin',
    password: '123456',
  },
  { id: 1, account: 'test', password: 'test' },
];

//匯出 mock 創造的假 api 接口
export default [
  {
    url: '/mock',
    method: 'get',
    response: () => {
      return echartData;
    },
  },
  {
    url: '/login',
    method: 'post',
    response: ({ body }) => {
      const { acc, pwd } = body;
      let token;
      let verify = false;
      loginList.forEach(user => {
        if (user.account === acc && user.password === pwd) {
          verify = true;
          //5分鐘 token
          token = jwt.sign({ account: user.account }, SECRET, {
            expiresIn: 3 * 60 * 60,
          });
        }
      });
      if (verify && token) return { code: 200, message: '登入成功', token };
      return { code: 401, message: '帳號或密碼錯誤，請重新輸入' };
    },
  },
  {
    url: '/regis',
    method: 'post',
    response: ({ body }) => {
      const { acc, pwd } = body;
      let verify = true;
      loginList.forEach(user => {
        if (user.account === acc) {
          verify = false;
        }
      });
      if (verify) {
        let ID = loginList.length;
        loginList.push({ id: ID, account: acc, password: pwd });
        return { code: 200, message: '註冊成功，跳轉登入', loginList };
      } else {
        return { code: 401, message: '註冊失敗，用戶名已存在', loginList };
      }
    },
  },
  {
    url: '/verify',
    method: 'get',
    response: ({ headers }) => {
      let { code, message } = verifyToken(headers);
      return { code, message };
    },
  },
];
