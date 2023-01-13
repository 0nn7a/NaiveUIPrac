import { defineStore } from 'pinia';

// 第一個參數是你的應用中 Store 的唯一ID
export const useImageStore = defineStore('image', {
  state: () => {
    return {
      menuSize: 260,
      data: [
        { image: 'img01', title: '我的桌上有垃圾' },
        { image: 'img02', title: '那是我做的餅乾' },
        { image: 'img03', title: '（晴天霹靂）' },
        { image: 'img04', title: '⋯⋯應該很好吃' },
      ],
      searchImages: [
        'search1',
        'search2',
        'search3',
        'search4',
        'search5',
        'search6',
        'search7',
        'search8',
        'search9',
        'search10',
        'search11',
        'search12',
        'search13',
        'search14',
      ],
    };
  },
  getters: {},
  actions: {},
});
