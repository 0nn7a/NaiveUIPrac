<script setup>
import { RouterLink } from 'vue-router';
import { NIcon } from 'naive-ui';
import {
  AnimalCat16Filled,
  Home12Filled,
  Search28Filled,
  MusicNote224Filled,
  TaskListSquareAdd24Filled,
  HeartCircle24Filled,
} from '@vicons/fluent';

import { useImageStore } from '@/stores/imageStore';
const store = useImageStore();

const cola = ref(false);
watch(
  () => cola.value,
  val => {
    val ? (store.menuSize = 260) : (store.menuSize = 100);
    console.log(store.menuSize);
  }
);

const route = useRoute();
const routerName = ref(route.name);

function renderLabel(name, title) {
  return () => h(RouterLink, { to: { name: name } }, { default: () => title });
}
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: 'Woobi_Dooggy',
    icon: renderIcon(AnimalCat16Filled),
    ket: 'icon',
    disabled: true,
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
        marginTop: '20px',
      },
    },
  },
  {
    label: renderLabel('home', '首頁'),
    key: 'home',
    icon: renderIcon(Home12Filled),
  },
  {
    label: renderLabel('search', '搜尋'),
    key: 'search',
    icon: renderIcon(Search28Filled),
  },
  {
    label: renderLabel('yours', '你的音樂庫'),
    key: 'yours',
    icon: renderIcon(MusicNote224Filled),
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: renderLabel('home', '建立播放清單'),
    key: 'createLog',
    icon: renderIcon(TaskListSquareAdd24Filled),
  },
  {
    label: renderLabel('home', '已按讚的歌曲'),
    key: 'loveSong',
    icon: renderIcon(HeartCircle24Filled),
  },
];
</script>

<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="100"
        :width="260"
        :collapsed="cola"
        show-trigger
        @collapse="cola = true"
        @expand="cola = false"
      >
        <n-menu
          :collapsed="cola"
          :collapsed-width="100"
          icon-size="22"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :default-value="routerName"
        />

        <p>
          <a href="#"> Cookie</a> <br />
          <a href="#"> 隱私權</a>
        </p>
      </n-layout-sider>
      <div style="height: 100vh; width: 100%">
        <n-message-provider>
          <router-view></router-view>
        </n-message-provider>
      </div>
    </n-layout>
  </n-space>
</template>

<style lang="less">
body,
h1,
h2,
h3,
h4,
h5,
p {
  margin: 0;
}
.n-layout-sider {
  height: 100vh;
  .n-menu {
    padding: 25px 0 0 0;
    &:first-child n-menu-item div {
      .n-icon {
        color: #17a158;
      }
    }
  }
  p {
    position: fixed;
    left: 30px;
    bottom: 30px;
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
</style>
