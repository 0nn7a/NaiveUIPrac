log｜

Development:
  原始檔案上傳於 branch main，備份紀錄用

Production:
  打包後 dist 檔上傳於 branch gh-pages，測試用
  
  [fix]
   Q: github 不接受 _ 下劃線開頭文件，因此無法解析 _plugin-vue_export-helper… 類型的檔案
   A: vite.config.js: 
      { build:
          rollupOptions:
            output: sanitizeFileName(name){
              ...僅紀錄原理，詳細代碼需在 branch main 看檔案
            };
       ...,
      }
   
   Q: 使用了 Vue Router 導致原本應該為 0nn7a.github.io/NaiveUIPrac 的路徑，repo 名稱部分會消失而變成 0nn7a.github.io/
   A: 改用 history: createWebHashHistory() 暫時取代 createWebHistory() 的方法，雖會導致路徑多出 /#/ 部分，但至少不會跳轉 404
   
   Q: 一些絕對路徑、相對路徑的原檔路徑追蹤問題
   A: vite.config.js -> base: process.env.NODE_ENV === 'production' ? '/NaiveUIPrac/' : './'
      與上方的 history 需要根據情況同步測試，比如現在使用 createWebHashHistory() + /NaiveUIPrac/ 絕對路徑的方式在 github page 沒問題
      但是若想使用 npm run preview 測試生產環境，就會導致根目錄多一個 /NaiveUIPrac/ 而找不到檔案
      
   Q: 於開發環境時用的是 mockjs 作為假的測試 API 接口，生產環境不可用，所以此頁面的註冊與登入功能都會出現 Axios Network Error
   A: try{ 
        ...開發時的正常請求
      } catch(e) { 
        if( e.message === 'Network Error' ){ 
          若屬於這種類型的錯誤暫時開啟通過，僅供 github page 測試功能正常，跳轉頁面即失效 
        } 
      }
