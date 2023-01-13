<script setup>
import useApi from '@/api/request.js';
import { AppStore24Filled, Apps20Filled } from '@vicons/fluent';
import { AppleRound } from '@vicons/material';
import { GlassesOutline, Glasses } from '@vicons/ionicons5';

import { useMessage } from 'naive-ui';
const message = useMessage();

const emit = defineEmits(['ifToken']);

import { useImageStore } from '@/stores/imageStore';
const store = useImageStore();

const menuOC = ref({ width: `calc(100vw - ${store.menuSize})` });

const loginStatus = ref('登入');

const showModal = ref(false);
const spinShow = ref(false);
const bodyStyle = { width: '350px' };

const secret = reactive({ account: { acc: '', pwd: '' } });
const modalType = ref('登入');
const openModal = async type => {
  if (loginStatus.value === '登出') {
    localStorage.removeItem('Authorization');
    loginStatus.value = '登入';
    message.success('已登出');
    emit('ifToken', { code: 201 });
  } else {
    if (type === 'login') {
      modalType.value = '登入';
      if (secret.account.acc === '' && secret.account.pwd === '') {
        secret.account.acc = 'Admin';
        secret.account.pwd = '123456';
      } else {
        secret.account.pwd = '';
      }
    } else {
      modalType.value = '註冊';
      secret.account.acc = '';
      secret.account.pwd = '';
    }
    showModal.value = true;
  }
};

const noSideSpace = value => !value.startsWith(' ') && !value.endsWith(' ');
const submitLogin = async () => {
  spinShow.value = true;
  if (modalType.value === '登入') {
    try {
      const {
        code,
        message: mes,
        token,
      } = await useApi.post('/login', secret.account);
      setTimeout(() => {
        spinShow.value = false;
        if (code === 200 && token) {
          localStorage.setItem('Authorization', 'Bearer ' + token);
          showModal.value = false;
          message.success(mes);
          loginStatus.value = '登出';
          emit('ifToken', { code, mes });
        } else if (code === 401) {
          message.error(mes);
          secret.account.acc = '';
          secret.account.pwd = '';
        }
      }, 1500);
    } catch (e) {
      if (e.message === 'Network Error') {
        setTimeout(() => {
          spinShow.value = false;

          showModal.value = false;
          message.success('測試用，暫時登入成功');
          loginStatus.value = '登出';
          emit('ifToken', { code: 200 });
        }, 1500);
      }
    }
  } else {
    try {
      const {
        code,
        message: mes,
        loginList,
      } = await useApi.post('/regis', secret.account);
      console.log(loginList);
      setTimeout(() => {
        spinShow.value = false;
        if (code === 200) {
          openModal('login');
          message.success(mes);
        } else {
          message.error(mes);
          secret.account.acc = '';
          secret.account.pwd = '';
        }
      }, 1500);
    } catch (e) {
      if (e.message === 'Network Error')
        setTimeout(() => {
          spinShow.value = false;
          openModal('login');
          message.success('測試用，暫時註冊成功');
        }, 1500);
    }
  }
};

const loading = ref(true);

onMounted(async () => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
  if (localStorage.getItem('Authorization')) {
    const { code, message } = await useApi.get('/verify');
    if (code === 200) {
      loginStatus.value = '登出';
      emit('ifToken', { code, message });
    } else {
      localStorage.removeItem('Authorization');
      loginStatus.value = '登入';
      emit('ifToken', { code, message });
    }
  } else {
    emit('ifToken', { code: 401, message: '尚未登入' });
  }
});
</script>

<template>
  <div class="all" :class="menuOC">
    <n-card
      title="首頁"
      :bordered="false"
      size="huge"
      header-style="font-size: 26px"
      style="padding-top: 4px; margin-bottom: 16px"
    >
      <template #header-extra>
        <n-button quaternary size="large" type="primary" round>
          Premium
        </n-button>
        <n-button quaternary size="large" type="primary" round> 支援 </n-button>
        <n-button quaternary size="large" type="primary" round> 下載 </n-button>
        <n-divider vertical />
        <n-button
          v-if="loginStatus !== '登出'"
          strong
          secondary
          size="large"
          round
          @click="openModal('regis')"
        >
          註冊
        </n-button>
        <n-button
          strong
          secondary
          size="large"
          round
          type="primary"
          @click="openModal('login')"
        >
          {{ loginStatus }}
        </n-button>
      </template>
      <div v-if="loading" class="box">
        <n-spin size="large" />
      </div>
      <slot v-else name="main"></slot>
    </n-card>

    <footer>
      <div class="list">
        <ul>
          <li class="li-title">公司簡介</li>
          <li><a href="#">關於我們</a></li>
          <li><a href="#">職位空缺</a></li>
        </ul>
        <ul>
          <li class="li-title">社群</li>
          <li><a href="#">藝人專屬</a></li>
          <li><a href="#">開發商</a></li>
          <li><a href="#">廣告宣傳</a></li>
          <li><a href="#">投資者</a></li>
        </ul>
        <ul>
          <li class="li-title">常用連結</li>
          <li><a href="#">資源</a></li>
          <li><a href="#">免費行動版 App</a></li>
        </ul>
      </div>
      <div class="apps">
        <n-icon
          :component="AppStore24Filled"
          size="30"
          color="rgba(23, 161, 88, 0.6)"
        /><n-icon
          :component="AppleRound"
          size="30"
          color="rgba(23, 161, 88, 0.6)"
        /><n-icon
          :component="Apps20Filled"
          size="30"
          color="rgba(23, 161, 88, 0.6)"
        />
      </div>
    </footer>
    <n-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      :title="modalType"
      size="huge"
      :bordered="false"
    >
      <n-space vertical>
        <n-input
          v-model:value="secret.account.acc"
          type="text"
          placeholder="帳號"
          :allow-input="noSideSpace"
          @keyup.enter="submitLogin"
        />
        <n-input
          v-model:value="secret.account.pwd"
          type="password"
          show-password-on="click"
          placeholder="密碼"
          :maxlength="8"
          :allow-input="noSideSpace"
          @keyup.enter="submitLogin"
        >
          <template #password-visible-icon>
            <n-icon :size="16" :component="GlassesOutline" />
          </template>
          <template #password-invisible-icon>
            <n-icon :size="16" :component="Glasses" />
          </template>
        </n-input>
        <n-space justify="end"
          ><a href="#" class="a-forgot">忘記密碼？</a></n-space
        >
      </n-space>
      <template #footer
        ><n-space justify="end">
          <n-button strong secondary round @click="showModal = false">
            取消
          </n-button>
          <n-space vertical>
            <n-spin :show="spinShow" size="small">
              <n-button
                strong
                secondary
                round
                type="primary"
                @click="submitLogin"
              >
                {{ modalType }}
              </n-button>
            </n-spin>
          </n-space>
        </n-space></template
      >
    </n-modal>
  </div>
</template>

<style lang="less">
.all {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .n-card {
    flex-grow: 1;
    flex-shrink: 2;
    max-height: calc(100vh - 200px);
    margin-bottom: 0;
    .n-card-header__extra {
      .n-button {
        margin-left: 7px;
      }
    }
    .n-card__content {
      overflow-y: scroll;
      max-height: 100%;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255);
    padding: 15px 0;
    .list {
      display: flex;
      margin-left: 40px;
      ul {
        padding: 0;
        list-style: none;
        .li-title {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: #3d3d3d;
        }
        li {
          margin-right: 75px;
        }
        a {
          color: darkgrey;
          text-decoration: none;
          transition: color 0.3s ease-in;
          &:hover {
            color: #cccccc;
          }
        }
      }
    }
    .apps {
      display: flex;
      justify-content: end;
      align-items: end;
      margin: 10px 40px 20px 0;
      .n-icon {
        margin-left: 15px;
      }
    }
  }
}

.a-forgot {
  color: rgba(23, 161, 88, 0.6);
  &:hover {
    color: rgba(23, 161, 88);
  }
}

.box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
